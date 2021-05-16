--user_info--
INSERT INTO user_info  
    VALUES (DEFAULT, 'Yehor', 'Velykozhon', '380983412592', 'rofl_png', '123');
INSERT INTO user_info     
    VALUES (DEFAULT, 'Sasha', 'Pyatovolenko', '380981341123', 'hello_world', '142');

--list_if_contacts--
INSERT INTO list_of_contacts 
    VALUES ('1', '2');
INSERT INTO list_of_contacts    
    VALUES ('2', '1');

--image_strorage--
INSERT INTO image_storage       
    VALUES (DEFAULT, '/home/img/common.png');

--user_profile--
INSERT INTO user_profile        
    VALUES ('1', '1');
INSERT INTO user_profile        
    VALUES ('2', '1');

--dialog--
INSERT INTO dialog
    VALUES (DEFAULT, '1', '2');

--message_storage--
INSERT INTO message_storage     
    VALUES ('1', '1', 'Hello world!', 'Wed Dec 17 07:37:16 1997 PST', TRUE);
INSERT INTO message_storage     
    VALUES ('1', '2', 'Hello you, Yehor!', 'Wed Dec 17 07:37:16 1997 PST', TRUE);
INSERT INTO message_storage     
    VALUES ('1', '2', 'How are you, Yehor?', 'Wed Dec 17 07:37:16 1997 PST', TRUE);
INSERT INTO message_storage     
    VALUES ('1', '1', 'Nice. Now I need to leave. Bye!', 'Wed Dec 17 07:37:16 1997 PST', TRUE);
INSERT INTO message_storage     
    VALUES ('1', '2', 'Bye!', 'Wed Dec 17 07:37:16 1997 PST', FALSE);
