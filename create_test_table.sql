CREATE TABLE user_info (
    Id          VARCHAR(9)      CONSTRAINT pk_user_info                 PRIMARY KEY,
    NameUser    VARCHAR(50)     CONSTRAINT nn_NameUser_user_info        NOT NULL,
    SecondName  VARCHAR(50)     CONSTRAINT nn_SecondName_user_info      NOT NULL,
    PhoneNumber VARCHAR(11)     CONSTRAINT nn_PhoneNumber_user_info     NOT NULL,
    Email       VARCHAR(50)     CONSTRAINT nn_Email_user_info           NOT NULL
);

CREATE TABLE list_of_contacts (
    UserOwner   VARCHAR(9)      CONSTRAINT fk_user_info                 REFERENCES user_info,
    UserContact VARCHAR(9)      CONSTRAINT fk_user_info_as_contact      REFERENCES user_info      
);

CREATE TABLE image_storage (
    Id          VARCHAR(9)      CONSTRAINT pk_image_storage             PRIMARY KEY,
    PathToImg   VARCHAR(100)    CONSTRAINT nn_PathToImg_image_storage   NOT NULL
);

CREATE TABLE user_profile (
    UserId      VARCHAR(9)      CONSTRAINT fk_user_info                 REFERENCES user_info,
    ImageId     VARCHAR(9)      CONSTRAINT fk_image_storage             REFERENCES image_storage
);

--For first version will be used more easy version: all messages will be in same place
CREATE TABLE convesation ( 
    Id          VARCHAR(9)      CONSTRAINT pk_conversation              PRIMARY KEY,
    UserId      VARCHAR(9)      CONSTRAINT fk_user_info                 REFERENCES user_info
); 

CREATE TABLE message_storage (
    ConversId   VARCHAR(9)      CONSTRAINT fk_conversation              REFERENCES convesation,
    UserId      VARCHAR(9)      CONSTRAINT fk_user_info                 REFERENCES user_info
);