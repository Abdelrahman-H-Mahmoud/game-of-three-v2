const socket = require('socket.io');
const gameManager = require('./gameManager');
const Game = require("./Game");

function initSocket(server) {
  const io = socket(server);
  io.on("connection", gameManager);
  return io;
}

module.exports = initSocket;
