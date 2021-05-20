const sequelize = require('../bd')
const {DataTypes, Sequelize} = require('sequelize')


const UserInfo = sequelize.define('user_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameuser: {type:DataTypes.STRING, notNull: true},
    secondname: {type:DataTypes.STRING, notNull: true},
    phonenumber: {type:DataTypes.STRING, unique: true, notNull: true},
    userlogin: {type:DataTypes.STRING, unique: true, notNull: true},
    userpassword: {type:DataTypes.STRING, unique: true, notNull: true},
    image: {type: DataTypes.STRING, allowNull: true},
}, {tableName: 'user_info'})

const ListOfContacts = sequelize.define('list_of_contacts', {
    userowner: {type:DataTypes.INTEGER},
    usercontact: {type:DataTypes.INTEGER},
}, {tableName: 'list_of_contacts'})
 
// const ImageStorage = sequelize.define('image_storage', {
//     id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     image: {type:DataTypes.STRING, notNull: true},
//     userid: {type:DataTypes.INTEGER},
// }, {tableName: 'image_storage'})

// const UserProfile = sequelize.define('user_profile', {
//     userid: {type:DataTypes.INTEGER},
//     imageid: {type:DataTypes.INTEGER}
// }, {tableName: 'user_profile'})

const Dialog = sequelize.define('dialog', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userfirst: {type:DataTypes.INTEGER, references: {
        model: UserInfo,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }},
    usersecond: {type:DataTypes.INTEGER, references: {
        model: UserInfo,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }},
}, {tableName: 'dialog'})

const MessageStorage = sequelize.define('message_storage', {
    conversid: {type:DataTypes.INTEGER},
    userid: {type:DataTypes.INTEGER},
    usermessage: {type:DataTypes.STRING, notNull: true},
    dataofsend: {type:DataTypes.DATE, notNull: true},
    isseen: {type:DataTypes.BOOLEAN, notNull: true}
}, {tableName: 'message_storage'})


// UserInfo.hasOne(UserProfile)
// UserProfile.belongsTo(UserInfo, {foreignKey: 'userid', targetKey: 'id'})
// UserInfo.hasOne(ImageStorage)
// ImageStorage.belongsTo(UserInfo, {foreignKey: 'imageid', targetKey: 'id'})

Dialog.hasOne(MessageStorage)
MessageStorage.belongsTo(Dialog, {foreignKey: 'conversid', targetKey: 'id'})
UserInfo.hasOne(MessageStorage)
MessageStorage.belongsTo(UserInfo, {foreignKey: 'userid', targetKey: 'id'})

UserInfo.hasOne(ListOfContacts)
ListOfContacts.belongsTo(UserInfo, {foreignKey: 'userowner', targetKey: 'id'})
UserInfo.hasOne(ListOfContacts)
ListOfContacts.belongsTo(UserInfo, {foreignKey: 'usercontact', targetKey: 'id'})

Dialog.hasOne(MessageStorage)
MessageStorage.belongsTo(Dialog, {foreignKey: 'conversid', targetKey: 'id'})

UserInfo.hasOne(MessageStorage)
MessageStorage.belongsTo(UserInfo, {foreignKey: 'userid', targetKey: 'id'})

// sequelize.query(`CREATE OR REPLACE FUNCTION upload_data_in_csv() RETURNS TRIGGER 
// LANGUAGE PLPGSQL
// AS
// $$
//     BEGIN
//         CREATE TABLE tmp (
//             ConversId       INT,
//             UserId          INT,
//             UserMessage     VARCHAR(1000), 
//             DataOfSend      DATE,            
//             IsSeen          BOOLEAN
//         );
//         INSERT INTO tmp VALUES (NEW.ConversId, NEW.UserId, NEW.UserMessage, NEW.DataOfSend, NEW.IsSeen);
//             COPY tmp TO PROGRAM 'cat >> /home/test_storage.csv' DELIMITER ',';
//         DROP TABLE tmp;
//         RETURN NEW;
//     END;
// $$;`)

// sequelize.query(`CREATE TRIGGER auto_saving_new_message BEFORE INSERT ON message_storage
// FOR EACH ROW EXECUTE PROCEDURE upload_data_in_csv();`)
sequelize.query(`DROP TRIGGER auto_saving_new_message ON message_storage;`)


module.exports = {
    UserInfo,
    ListOfContacts,
    Dialog,
    MessageStorage,
}