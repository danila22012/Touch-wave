require('dotenv').config()
const express = require('express')
const authRouter = require('./authRouter')
const sequelize = require('./bd')
const models = require('./models/models')
const cors = require('cors')



const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)

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

