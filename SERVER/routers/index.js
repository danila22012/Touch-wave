const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')

router.use('/user', userRouter)
router.use('/auth', authRouter)


module.exports = router