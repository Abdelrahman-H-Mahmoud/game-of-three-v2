function sendMessage(socket, socketId = null, msgType, message, data = {}) {
  if (socketId)
    socket.in(socketId).emit(msgType, { message: message, ...data });
  else
    socket.emit(msgType, { message: message, ...data });
}


module.exports=sendMessage;