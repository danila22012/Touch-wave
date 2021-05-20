--Creating global variable--
ALTER DATABASE postgres SET glb.path_to_file = '/home/user_storage';
ALTER DATABASE postgres SET glb.storage_extenstion = '.csv';

--Function for correct receiving value from global variables--
CREATE OR REPLACE FUNCTION glb(code VARCHAR)
RETURNS VARCHAR 
LANGUAGE SQL 
AS $$
    SELECT current_setting('glb.' || code)::VARCHAR;
$$;

--Function to save message_storage in csv file--
CREATE OR REPLACE FUNCTION upload_data_in_csv() RETURNS TRIGGER 
LANGUAGE PLPGSQL
AS
$$
    DECLARE
        max_amount    INT:=100;
        save_amount   INT:=max_amount / 2;
        save_file     VARCHAR:=CONCAT('''', 
                                     'cat >> ', 
                                     (SELECT glb('path_to_file')), 
                                     (SELECT glb('storage_extenstion')), 
                                     ''''); 
    BEGIN
        CREATE TABLE tmp (
            Id              INT,
            ConversId       INT,
            UserId          INT,
            UserMessage     VARCHAR(1000), 
            DataOfSend      DATE,            
            IsSeen          BOOLEAN
        );

        IF (SELECT COUNT(*) FROM message_storage) > max_amount
        THEN
            INSERT INTO tmp 
                SELECT * FROM message_storage 
                    ORDER BY Id ASC 
                    LIMIT save_amount;
            EXECUTE 'COPY tmp TO PROGRAM ' || save_file;
            --Delete messages that was saved--
            DELETE FROM message_storage 
                WHERE Id IN (SELECT Id FROM message_storage
                                ORDER BY Id ASC
                                LIMIT save_amount);
        END IF;

        DROP TABLE tmp;
        RETURN OLD;
    END;
$$;

--Function to upload previous history if need--
--TRUE: need conversation upload at least 1 message--
--FALSE: need conversation upload nothing from file-- 
CREATE OR REPLACE FUNCTION upload_msg_history(conv_id INT) 
    RETURNS BOOLEAN
LANGUAGE PLPGSQL
AS
$$
    DECLARE
        previous_amount    BIGINT:=0;
        save_file          VARCHAR:=CONCAT('''', 
                                          (SELECT glb('path_to_file')), 
                                          (SELECT glb('storage_extenstion')), 
                                          ''''); 

    BEGIN
        ALTER TABLE message_storage 
            DISABLE TRIGGER auto_saving_new_message;

        previous_amount := (SELECT COUNT(*) FROM message_storage 
                                WHERE ConversId = conv_id);
        EXECUTE 'COPY message_storage FROM ' || save_file;
        --Make file blank--
        EXECUTE 'COPY message_storage TO PROGRAM '' > ' 
            || CONCAT((SELECT glb('path_to_file')), 
                      (SELECT glb('storage_extenstion')), '''');

        ALTER TABLE message_storage 
            ENABLE TRIGGER auto_saving_new_message;
        --Additional check if in need conv uploaded at least 1 line--
        IF previous_amount != (SELECT COUNT(*) FROM message_storage 
                                    WHERE ConversId = conv_id)
        THEN RETURN TRUE;
        ELSE RETURN FALSE;
        END IF;
    END;
$$;