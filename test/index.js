const io = require('socket.io-client');
const assert = require('assert');
const expect = require('expect.js');

require('../index');

describe('Suite of unit tests', function () {
  var socket;
  describe('Emitting New Game', function () {

    before(function (done) {
      // Setup
      require('../index');
      socket = io.connect('http://localhost:3000', {
        'reconnection delay': 0
        , 'reopen delay': 0
        , 'force new connection': true
      });
      socket.on('connect', function () {
        console.log('worked...');
        done();
      });
      socket.on('disconnect', function () {
        console.log('disconnected...');
      })
    });

    after(function (done) {

      if (socket.connected) {
        console.log('disconnecting...');
        socket.disconnect();
      } else {
        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
        console.log('no connection to break...');
      }
      done();
    });

    it('Emitting First Player', function (done) {
      socket.emit('new_game', { name: "Abdelrahman" });
      done();
    });

    it('Emitting Second Player', (done) => {
      socket.emit('new_game', { name: "Ahmed" });
      done();
    });

    it("Check if Game Started", (done) => {
      socket.on("game_started", (data) => {
        if (data.hasOwnProperty("num") && !isNaN(data.num)) {
          done();
        }
        else {
          done(false);
        }
      })
    });
  });
});