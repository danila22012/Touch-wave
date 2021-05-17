const {UserInfo, ImageStorage, ListOfContacts} = require('../models/models')

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
            const {nameuser, secondname, phonenumber} = user
            return res.json({nameuser, secondname, phonenumber});
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
                return res.status(400).json({message: `${username} ${secondname} уже есть в контактах`})
            }
            const contact = await ListOfContacts.create({userowner: id, usercontact: candidate.id})
            return res.json({message: `${username} ${secondname} добавлен в контакты`})
        } catch(e) {
            console.log(e)
        }
    }

    // попробуй тестонуть. Мое расширние в vscode походу не умеет отправлять put. Загляни в requests.rest. Там примерная структура запросов
    async updateSettings(req, res) {
        try {
            const {id} = req.user
            const {username, secondname, pathtoimg} = req.body
            const result = await UserInfo.update({username, secondname}, {where: id})
            if (!result) {
                return res.status(400).json({message: "Ошибка"})
            }
            if (pathtoimg) {
                const imageRes = await ImageStorage.update({pathtoimg}, {where: id})
                if (!imageRes) {
                    return res.status(400).json({message: "Ошибка"})
                }
            }
            
            return res.json({message: `Контакт обновлен`})
        } catch(e) {

        }
    }
}

module.exports = new userController()