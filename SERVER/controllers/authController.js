const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const {UserInfo} = require('../models/models')




const generateAccessToken = (id, phonenumber, login) => {
    const payload = {
        id, phonenumber, login
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, secondname, phonenumber, login, password} = req.body
            // const candidate = await UserInfo.findOne({phonenumber})
            const candidate = await UserInfo.findOne({where: {phonenumber}})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким телефоном уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = await UserInfo.create({nameuser: username, secondname: secondname, phonenumber: phonenumber, userlogin: login, userpassword: hashPassword, image: ''})
            // const imageStorage = await ImageStorage.create({id: user.id, pathtoimg: null})

            const token = generateAccessToken(user.id, user.phonenumber, user.login)
            return res.json({ token, message: "Пользователь успешно зарегистрирован"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await UserInfo.findOne({where: {userlogin:login}})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${login} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.userpassword)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.phonenumber, user.login)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
