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

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use("/api", router)


const onConnection = (socket) => {
    log('User connected')
    const rooms = []
    socket.on('join', ({ user, room }) => {
      if (!rooms.includes(room)) {
        socket.join(room)
        rooms.push(room)
      }
    });
  
    registerMessageHandlers(io, socket)
  
    socket.on('disconnect', () => {
      log('User disconnected')
      rooms.forEach(room => {
        socket.leave(room)
      })
    })
  }
  
  
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`server started on port ${PORT}`))
        io.on('connection', onConnection)
    } catch (e) {
        console.log(e)
    }
}

start()

