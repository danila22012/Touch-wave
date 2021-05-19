require('dotenv').config()
const express = require('express')
// const authRouter = require('./routers/authRouter')
// const userRouter = require('./routers/userRouter')
const sequelize = require('./bd')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const fileupload = require('express-fileupload')
const path = require('path')



const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
// app.use("/auth", authRouter)
// app.use("/user", userRouter)

app.use("/api", router)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

