const {UserInfo, Dialog, MessageStorage} = require('../models/models')

module.exports = (io, socket) => {
    const getMessages = async (roomId) => {
      const messages = await MessageStorage.findAll({where: {conversid: roomId}})
      io.in(roomId).emit('messages', messages)
    }
  
    const addMessage = async (conversid, userid, message) => {
    await MessageStorage.create({conversid, userid, usermessage: message}, {where: {conversid}})
      getMessages()
    }
  
    const removeMessage = async (messageId) => {
    //   db.get('messages').remove({ messageId }).write()
      const candidate = await MessageStorage.destroy({where: {id: messageId}})
      getMessages()
    }
  
    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
    socket.on('message:remove', removeMessage)
  }