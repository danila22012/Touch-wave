const {UserInfo, ListOfContacts, Dialog, MessageStorage} = require('../models/models')
const { Op } = require("sequelize");
const uuid = require('uuid')
const path = require('path')

class userController {
    async getAllUsers(req, res) {
        try {
            // const users = await UserInfo.findAll()
            const {id} = req.user
            
            const list = await ListOfContacts.findAll({where: {userowner: id}})
            const userIds = list.map(({usercontact}) => usercontact)
            if (list.length === 0) {
                return res.json([])
            }
            let users = await UserInfo.findAll({where: {
                id: userIds
            }})
            users = users.map(({nameuser, secondname, phonenumber}) => ({nameuser, secondname, phonenumber}));

            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getUser(req, res) {
        try {
            const {id: usercontact} = req.query
            const {id: userowner} = req.user
            const list = await ListOfContacts.findOne({where: {userowner, usercontact}})
            if (!list) {
                return res.status(400).json({message: "Хуй тебе, у тебя нет в контактах этого пидора"})
            }

            const user = await UserInfo.findOne({where: {id: usercontact}})
            const {nameuser, secondname, phonenumber, image} = user
            return res.json({nameuser, secondname, phonenumber, image: implementImage(image)});
        } catch (e) {
            console.log(e)
        }
    }

    // это для теста чтобы доавлять произвольно contact_list 
    async createContactList(req, res) {
        try {
            const {userowner, usercontact} = req.body
            const candidate = await ListOfContacts.findOne({where: {userowner, usercontact}})
            if (candidate) {
                return res.status(400).json({message: "Такой контакт уже существует"})
            }
            const contact = await ListOfContacts.create({userowner, usercontact})
            return res.json({message: "Контакт создан"})
        } catch(e) {
            console.log(e)
        }
    }

    async getContact(req, res) {
        try {
            const {id: usercontact} = req.query
            const {id: userowner} = req.user
            const list = await ListOfContacts.findOne({where: {userowner, usercontact}})
            if (!list) {
                return res.status(400).json({message: "Хуй тебе, у тебя нет в контактах этого пидора"})
            }

            const user = await UserInfo.findOne({where: {id: usercontact}})
            const {nameuser, secondname, image} = user
            return res.json({nameuser, secondname, image: implementImage(image)})
        } catch (e) {
            console.log(e)
        }
    }


    async addContact(req, res) {
        try {
            const {id} = req.user
            const {username, secondname, phonenumber} = req.body
            const candidate = await UserInfo.findOne({where: {phonenumber}})
            if (!candidate) {
                return res.status(400).json({message: "Такого пользователя нет"})
            }
            
            const candidateList = await ListOfContacts.findOne({where: {userowner: id, usercontact: candidate.id}})
            if (candidateList) {
                return res.status(400).json({message: `${phonenumber} уже есть в контактах`})
            }
            const contact = await ListOfContacts.create({userowner: id, usercontact: candidate.id})
            const dialog = await createDialog(id, candidate.id)
            return res.json({message: `${phonenumber} добавлен в контакты`, dialogId: dialog.id, image: implementImage(candidate.image), username: candidate.nameuser, secondname: candidate.secondname})
        } catch(e) {
            console.log(e)
        }
    }

    async getAllContacts(req, res) {
        try {
            const {id} = req.user
            
            const list = await ListOfContacts.findAll({where: {userowner: id}})
            const userIds = list.map(({usercontact}) => usercontact)
            if (list.length === 0) {
                return res.json([])
            }
            let users = await UserInfo.findAll({where: {
                id: userIds
            }})
            const newUsers = [];
            users.forEach(async (user, index) => {
                newUsers.push({})
                let condition = [
                { [Op.and]: [
                    { userfirst: id },
                    { usersecond: user.id }
                  ] },
                { [Op.and]: [
                    { userfirst: userIds },
                    { usersecond: user.id }
                  ] }
              ];
              const dialogCandidate = await Dialog.findOne({where: {[Op.or]: condition}})
              newUsers[index].dialogId = dialogCandidate.id
              newUsers[index].nameuser = user.nameuser
                newUsers[index].secondname = user.secondname
                newUsers[index].id = user.id
                newUsers[index].image = implementImage(user.image)
                if (index === users.length - 1)
                res.json(newUsers)

            })
        } catch(e) {
            console.log(e)
        }
    }

    async deleteContact(req, res) {
        try {
            const {id} = req.user
            const {id : contactId} = req.body
            let condition = [
                { [Op.and]: [
                    { userowner: id },
                    { usercontact: contactId }
                  ] },
                { [Op.and]: [
                    { userowner: contactId },
                    { usercontact: id }
                  ] }
              ];

            await ListOfContacts.destroy({where: {[Op.or]: condition}})
            condition = [
                { [Op.and]: [
                    { userfirst: id },
                    { usersecond: contactId }
                  ] },
                { [Op.and]: [
                    { userfirst: contactId },
                    { usersecond: id }
                  ] }
              ];
            const dialogCandidate = await Dialog.findOne({where: {[Op.or]: condition}})
            const dialogId = dialogCandidate.id
            await MessageStorage.destroy({where: {conversid: dialogId}})
            await Dialog.destroy({where: {[Op.or]: condition}})
            
             
            return res.json({message: 'Контакт удален'})
              
            // if (!candidate) {
            //     return res.status(400).json({message: `${username} ${secondname} и так нет в контактах`})
            // }
            // const removeCandidate = await candidate.destroy();
            // return res.json({message: `${username} ${secondname} удален из контактов`, })
        } catch(e) {
            console.log(e)
        }
    }

    async getAllDialogs(req, res) {
        try {
            const {id} = req.user
            
            const list = await ListOfContacts.findAll({where: {userowner: id}})
            const userIds = list.map(({usercontact}) => usercontact)
            if (list.length === 0) {
                return res.json([])
            }
            let users = await UserInfo.findAll({where: {
                id: userIds
            }})

             const newUsers = [];
            users.forEach(async (user, index) => {
                newUsers.push({})
                let condition = [
                    { [Op.and]: [
                        { userfirst: id },
                        { usersecond: user.id }
                      ] },
                    { [Op.and]: [
                        { userfirst: user.id },
                        { usersecond: id }
                      ] }
                  ];
                  const dialogCandidate = await Dialog.findOne({where: {[Op.or]: condition}})
                newUsers[index].dialogId = dialogCandidate.id
                
                const messageCandidates = await MessageStorage.findAll({where: {
                    conversid: dialogCandidate.id,
                    userid: user.id,
                }, order: [['updatedAt', 'DESC']]})
                
                if (messageCandidates.length > 0 && messageCandidates[0]) {
                    newUsers[index].lastMessage = messageCandidates[0].usermessage
                    newUsers[index].sentDate = messageCandidates[0].createdAt
                }
               
                
                newUsers[index].nameuser = user.nameuser
                newUsers[index].secondname = user.secondname
                newUsers[index].image = implementImage(user.image)
                if (index === users.length - 1)
                res.json(newUsers)
            })
            
        } catch(e) {
            console.log(e)
        }
    }

    async deleteDialog(req, res) {
        try {
            const {dialogId} = req.body
            await MessageStorage.destroy({where: {conversid: dialogId}})
            return res.json({message: 'Диалог удален', dialogId})

        } catch(e) {
            console.log(e)
        }
    }

    // попробуй тестонуть. Мое расширние в vscode походу не умеет отправлять put. Загляни в requests.rest. Там примерная структура запросов
    async updateSettings(req, res) {
        try {
            const {id} = req.user
            const {username, secondname} = req.body
            const {image} = req.files
            const result = await UserInfo.update({username, secondname}, {where: {id}})
            if (!result) {
                return res.status(400).json({message: `Ошибка username = ${username} and secondname = ${secondname}`})
            }
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))

            const user = await UserInfo.update({image: fileName}, {where: {id}})
            
            return res.json({message: `Контакт обновлен`, image: implementImage(fileName)})
        } catch(e) {
            console.log(e)
        }
    }

    // test
    async createMessage(req, res) {
        try {
            const {conversid, userid, usermessage, dataofsend, isseen} = req.body
            const mes = await MessageStorage.create({conversid, userid, usermessage, dataofsend, isseen})
            return res.json({message: `Сообщение добавлено`})
        } catch(e) {
            console.log(e)
        }
    }
}

async function findDialog(userFirst, userSecond) {
    const firstCandidate = await Dialog.findOne({where: {userfirst: userFirst, usersecond: userSecond}})
    if (firstCandidate) {
        return {userfirst: firstCandidate.userfirst, usersecond: firstCandidate.usersecond}
    }
    const secondCandidate = await Dialog.findOne({where: {userfirst: userSecond, usersecond: userFirst}})
    if (secondCandidate) {
        return {userfirst: secondCandidate.userfirst, usersecond: secondCandidate.usersecond}
    }
}
async function createDialog(userFirst, userSecond) {
    // const candidate = await Dialog.findOne({where: {[Sequelize.or]: [{[Sequelize.and]: [{userfirst: userFirst}, {usersecond: userSecond}]}, {[Sequelize.and]: [{userfirst: userSecond}, {usersecond: userFirst}]}]}})
    const firstCandidate = await Dialog.findOne({where: {userfirst: userFirst, usersecond: userSecond}})
    if (firstCandidate) {
        return {message: "Диалог уже существует", userfirst: firstCandidate.userfirst, usersecond: firstCandidate.usersecond}
    }
    const secondCandidate = await Dialog.findOne({where: {userfirst: userSecond, usersecond: userFirst}})
    if (secondCandidate) {
        return {message: "Диалог уже существует", userfirst: secondCandidate.userfirst, usersecond: secondCandidate.usersecond}
    }
    const dialog = await Dialog.create({userfirst: userFirst, usersecond: userSecond})
    return dialog
}

function implementImage(name) {
    return `http://localhost:${process.env.PORT}/${name}`;
}

async function deleteMessagesDialog() {

}

module.exports = new userController()