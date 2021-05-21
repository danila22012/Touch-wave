const {MessageStorage} = require('../models/models')
const jwt = require('jsonwebtoken')

module.exports = (io, socket) => {
    const getMessages = async (roomId) => {
      const messages = await MessageStorage.findAll({where: {conversid: roomId}})
      const implementedMessages = messages.map(m => ({usermessage: m.usermessage, userid: m.userid, id: m.id, date: m.createdAt}))
      io.sockets.to(roomId).emit('messages', implementedMessages)
    }
  
    const addMessage = async (conversid, token, message) => {
      const { id } = jwt.verify(token, process.env.secret)
      await MessageStorage.create({conversid, userid: id, usermessage: message}, {where: {conversid}})
      getMessages()
    }
  
    const removeMessage = async (messageId) => {
      const candidate = await MessageStorage.destroy({where: {id: messageId}})
      getMessages()
    }
  
    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
    socket.on('message:remove', removeMessage)
  }
