const { nanoid } = require('nanoid')
const {UserInfo, Dialog, MessageStorage} = require('../models/models')
const { Op } = require("sequelize")

module.exports = (io, socket) => {
    const getMessages = async () => {
    //   const messages = db.get('messages').value()
      const messages = await MessageStorage.findAll({where: {conversid: socket.roomId}})
      io.in(socket.roomId).emit('messages', messages)
    }
  
    const addMessage = async (conversid, userid, message) => {
    //   db.get('messages')
    //     .push({
    //       messageId: nanoid(8),
    //       createdAt: new Date(),
    //       ...message
    //     })
    //     .write()
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