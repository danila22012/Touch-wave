--trigger: add to file.csv new added message in table message_storage--
CREATE TRIGGER auto_saving_new_message AFTER INSERT ON message_storage
        FOR EACH ROW  
        WHEN (pg_trigger_depth() < 1)
        EXECUTE PROCEDURE upload_data_in_csv();
