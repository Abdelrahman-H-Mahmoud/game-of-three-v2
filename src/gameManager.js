const { generateId, getRecommendedAdd, socketSendMessage } = require('./utils');
const MSG_TYPES = require('./consts/msgTypes');

const Game = require('./Game');
let game = null;

function onNewGame(socket) {
  socket.on('new_game', ({ name }) => {
    let id = generateId();
    socket.join(id);
    if (game && game.player1 && !game.player2) {
      let player2 = { name, id: id };
      game.player2 = player2;

      socketSendMessage(socket, null, MSG_TYPES.MSG, "Starting Game you are player2", game.player1);
      socketSendMessage(socket, game.player1.id, MSG_TYPES.MSG, "Starting Game you are player1");

      game.startGame();
      sendGameStarted(socket, game.player1.id, game.num);
      sendTurn(socket, game.turn.id, game.num, getRecommendedAdd(game.num), 0);
    }
    else {
      console.log("Starting New Game");
      game = new Game();
      game.player1 = { name, id };
      socketSendMessage(socket, null, MSG_TYPES.MSG ,"Waiting for other player to join", { _id: game.player1 });
    }
  });
}

function onMove(socket) {
  socket.on("move", ({ id, add }) => {
    game.setGameNumber(add);
    if (game.num != 1) {
      game.switchTurns();
      sendTurn(socket, game.turn.id, game.num, getRecommendedAdd(game.num), add);
    } else {
      let obj = {
        num: game.num
      }
      socketSendMessage(socket, game.nextTurn.id, MSG_TYPES.GAME_ENDED, "You Lost", obj);
      socketSendMessage(socket, null, MSG_TYPES.GAME_ENDED, "You Won", obj);
      game.endGame();
    }
  });
}

function sendGameStarted(socket, socketId, num) {
  let obj = {
    num: num
  }
  socketSendMessage(socket, socketId, MSG_TYPES.GAME_STARTED, "Game Started", obj);
  socketSendMessage(socket, null, MSG_TYPES.GAME_STARTED, "Game Started", obj);
}

function sendTurn(socket, socketId = null, num, add, lastPlayedAdd) {
  let obj = {
    num: num,
    add: add,
    lastPlayedAdd
  }
  if (socketId)
    socketSendMessage(socket, socketId, MSG_TYPES.TURN, "Your Turn", obj);
  else
    socketSendMessage(socket, null, MSG_TYPES.TURN, "Your Turn", obj);
}

module.exports = function gameManager(socket) {
  onNewGame(socket);
  onMove(socket);
}