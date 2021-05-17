const sequelize = require('../bd')
const {DataTypes, Sequelize} = require('sequelize')


const UserInfo = sequelize.define('user_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameuser: {type:DataTypes.STRING, notNull: true},
    secondname: {type:DataTypes.STRING, notNull: true},
    phonenumber: {type:DataTypes.STRING, unique: true, notNull: true},
    userlogin: {type:DataTypes.STRING, unique: true, notNull: true},
    userpassword: {type:DataTypes.STRING, unique: true, notNull: true},
}, {tableName: 'user_info'})

const ListOfContacts = sequelize.define('list_of_contacts', {
    userowner: {type:DataTypes.INTEGER, references: {
        model: UserInfo,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }},
    usercontact: {type:DataTypes.STRING, references: {
        model: UserInfo,
        key: 'phonenumber',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }},
}, {tableName: 'list_of_contacts'})
 
const ImageStorage = sequelize.define('image_storage', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    pathtoimg: {type:DataTypes.STRING, notNull: true},
}, {tableName: 'image_storage'})

const UserProfile = sequelize.define('user_profile', {
    userid: {type:DataTypes.INTEGER},
    imageid: {type:DataTypes.STRING}
}, {tableName: 'user_profile'})

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


UserInfo.hasOne(UserProfile)
UserProfile.belongsTo(UserInfo, {foreignKey: 'userid', targetKey: 'id'})
UserInfo.hasOne(ImageStorage)
ImageStorage.belongsTo(UserInfo, {foreignKey: 'imageid', targetKey: 'id'})

Dialog.hasOne(MessageStorage)
MessageStorage.belongsTo(Dialog, {foreignKey: 'conversid', targetKey: 'id'})
UserInfo.hasOne(MessageStorage)
MessageStorage.belongsTo(UserInfo, {foreignKey: 'userid', targetKey: 'id'})


module.exports = {
    UserInfo,
    ListOfContacts,
    ImageStorage,
    UserProfile,
    Dialog,
    MessageStorage,
}