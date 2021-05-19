const {UserInfo, ImageStorage, ListOfContacts, Dialog, MessageStorage} = require('../models/models')
const { Op } = require("sequelize");

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
            //тоже не нужный метод
            const {id: usercontact} = req.query
            const {id: userowner} = req.user
            const list = await ListOfContacts.findOne({where: {userowner, usercontact}})
            if (!list) {
                return res.status(400).json({message: "Хуй тебе, у тебя нет в контактах этого пидора"})
            }

            const user = await UserInfo.findOne({where: {id: usercontact}})
            const {nameuser, secondname, phonenumber} = user
            return res.json({nameuser, secondname, phonenumber});
        } catch (e) {
            console.log(e)
        }
    }

    // это для теста чтобы доавлять произвольно contact_list 
    async createContactList(req, res) {
        try {
            // хз для чего этод метож, мы моем толкьо добавлять юзера, а не создавать
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
            //ненужный метож кста
            const {id: usercontact} = req.query
            const {id: userowner} = req.user
            const list = await ListOfContacts.findOne({where: {userowner, usercontact}})
            if (!list) {
                return res.status(400).json({message: "Хуй тебе, у тебя нет в контактах этого пидора"})
            }

            const user = await UserInfo.findOne({where: {id: usercontact}})
            const {nameuser, secondname} = user
            return res.json({nameuser, secondname});
        } catch (e) {
            console.log(e)
        }
    }


    async addContact(req, res) {
        try {
            const {id} = req.user
            //спросить а нахуя нам сообствнно передавать имя, если по номеру можно подтянуть имя с бд
            const {username, secondname, phonenumber} = req.body
            const candidate = await UserInfo.findOne({where: {phonenumber}})
            if (!candidate) {
                return res.status(400).json({message: "Такого пользователя нет"})
            }
            
            const candidateList = await ListOfContacts.findOne({where: {userowner: id, usercontact: candidate.id}})
            if (candidateList) {
                return res.status(400).json({message: `${username} ${secondname} уже есть в контактах`})
            }
            const contact = await ListOfContacts.create({userowner: id, usercontact: candidate.id})
            const dialog = await createDialog(id, candidate.id)
            return res.json({message: `${username} ${secondname} добавлен в контакты`, dialogId: dialog.id})
        } catch(e) {
            console.log(e)
        }
    }

    async getAllContacts(req, res) {
        try {
            const {id} = req.user
            //работает чётко
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
            // нахуя передавать всю инфу если можно передать только айди юзера?
            const {phonenumber, username, secondname, id : contactId} = req.body
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
            await Dialog.destroy({where: {[Op.or]: condition}})
            await MessageStorage.destroy({where: {conversid: dialogId}})
             
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
            //добавить последнее сообщение в ответ
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
                
                newUsers[index].lastMessage = messageCandidates[0]?.usermessage
                
                newUsers[index].nameuser = user.nameuser
                newUsers[index].secondname = user.secondname
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

        //решить вопрос с картинками нахуй
            const {id} = req.user
            const {username, secondname, pathtoimg} = req.body
            const result = await UserInfo.update({username, secondname}, {where: {id}})
            if (!result) {
                return res.status(400).json({message: "Ошибка"})
            }
            if (pathtoimg) {
                const imageRes = await ImageStorage.update({pathtoimg}, {where: {id}})
                if (!imageRes) {
                    return res.status(400).json({message: "Ошибка"})
                }
            }
            
            return res.json({message: `Контакт обновлен`})
        } catch(e) {

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

async function deleteMessagesDialog() {

}

module.exports = new userController()