const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const authMiddleware = require('../middlewaree/authMiddleware')

router.get('/allUsers', authMiddleware, controller.getAllUsers)
router.get('/user', authMiddleware, controller.getUser)
router.post('/createContactList', controller.createContactList)
router.post('/addContact', authMiddleware, controller.addContact)
router.put('/settings', authMiddleware, controller.updateSettings)

module.exports = router