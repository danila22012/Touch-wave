const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const authMiddleware = require('../middlewaree/authMiddleware')

router.get('/getAllUsers', authMiddleware, controller.getAllUsers)
router.get('/getUser', authMiddleware, controller.getUser)
router.get('/getMyUser', authMiddleware, controller.getMyUser)

// test
router.post('/createContactList', controller.createContactList)
router.put('/updateSettings', authMiddleware, controller.updateSettings)

router.get('/getAllContacts', authMiddleware, controller.getAllContacts)
router.post('/addContact', authMiddleware, controller.addContact)
router.post('/deleteContact', authMiddleware, controller.deleteContact)
router.post('/getContact', authMiddleware, controller.getContact)

router.get('/getAllDialogs', authMiddleware, controller.getAllDialogs)
router.post('/deleteDialog', authMiddleware, controller.deleteDialog)

// test
router.post('/createMessage', controller.createMessage)

module.exports = router