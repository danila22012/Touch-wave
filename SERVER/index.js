require('dotenv').config()
const express = require('express')
const sequelize = require('./bd')
const cors = require('cors')
const router = require('./routers/index')
const fileupload = require('express-fileupload')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const log = console.log


const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})

const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')



app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use("/api", router)


const onConnection = (socket) => {
    log('User connected')
  
    const { roomId } = socket.handshake.query
    socket.roomId = roomId
  
    socket.join(roomId)
  
    // registerMessageHandlers(io, socket)
    // registerUserHandlers(io, socket)
  
    socket.on('disconnect', () => {
      log('User disconnected')
      socket.leave(roomId)
    })
  }
  
  
const start = async () => {
    try {
        io.on('connection', onConnection)
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

