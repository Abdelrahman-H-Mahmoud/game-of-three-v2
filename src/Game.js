const { generateNumber } = require('./utils');
class Game {
  constructor() {
    this.initGameValues();
  }

  switchTurns() {
    let temp = this.turn;
    this.turn = this.nextTurn;
    this.nextTurn = temp;
  }

  endGame() {
    this.initGameValues();
  }

  initGameValues() {
    this.id = "";
    this.player1 = null;
    this.player2 = null;
    this.turn = null;
    this.nextTurn = null;
    this.num = 0;
  }

  setGameNumber(add) {
    this.num = Math.floor((this.num + add) / 3);
    return this.num;
  }
  
  startGame() {
    this.num = generateNumber(3, 10000);
    this.turn = this.player1;
    this.nextTurn = this.player2;
  }
}


module.exports = Game;