CREATE TABLE user_info (
    Id              SERIAL          CONSTRAINT pk_user_info                     PRIMARY KEY,
    NameUser        VARCHAR(50)     CONSTRAINT nn_NameUser_user_info            NOT NULL,
    SecondName      VARCHAR(50)     CONSTRAINT nn_SecondName_user_info          NOT NULL,
    PhoneNumber     VARCHAR(15)     CONSTRAINT un_nn_PhoneNumber_user_info      UNIQUE NOT NULL,
    UserLogin       VARCHAR(50)     CONSTRAINT nn_UserLogin_user_info           NOT NULL,
    UserPassword    VARCHAR(100)    CONSTRAINT nn_UserPassword_user_info        NOT NULL
    PathToImg       VARCHAR(100)    CONSTRAINT nn_PathToImg_image_storage       NOT NULL
);

CREATE TABLE list_of_contacts (
    UserOwner       SERIAL          CONSTRAINT fk_user_info                     REFERENCES user_info,
    UserContact     SERIAL          CONSTRAINT fk_user_info_as_contact          REFERENCES user_info      
);

--For first version will be used more easy version: all messages will be in same place
CREATE TABLE dialog ( 
    Id              SERIAL          CONSTRAINT pk_dialog                        PRIMARY KEY,
    UserFirst       SERIAL          CONSTRAINT fk_user_info_first               REFERENCES user_info,
    UserSecond      SERIAL          CONSTRAINT fk_user_info_second              REFERENCES user_info
); 

CREATE TABLE message_storage (
    Id              SERIAL          CONSTRAINT pk_message_storage               PRIMARY KEY,
    ConversId       SERIAL          CONSTRAINT fk_dialog                        REFERENCES dialog,
    UserId          SERIAL          CONSTRAINT fk_user_info                     REFERENCES user_info,
    UserMessage     VARCHAR(1000)   CONSTRAINT nn_UserMessage_message_storage   NOT NULL,
    DataOfSend      DATE            CONSTRAINT nn_DataOfSend_message_storage    NOT NULL,
    IsSeen          BOOLEAN         CONSTRAINT nn_IsSeen_message_storage        NOT NULL
);