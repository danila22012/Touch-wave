const { nanoid } = require('nanoid')
const {UserInfo, Dialog, MessageStorage} = require('../models/models')
const { Op } = require("sequelize")

module.exports = (io, socket) => {
    const getMessages = () => {
    //   const messages = db.get('messages').value()
  
      io.in(socket.roomId).emit('messages', messages)
    }
  
    const addMessage = (message) => {
    //   db.get('messages')
    //     .push({
    //       messageId: nanoid(8),
    //       createdAt: new Date(),
    //       ...message
    //     })
    //     .write()
  
      getMessages()
    }
  
    const removeMessage = (messageId) => {
    //   db.get('messages').remove({ messageId }).write()
  
      getMessages()
    }
  
    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
    socket.on('message:remove', removeMessage)
  }