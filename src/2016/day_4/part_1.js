'use strict';

const RoomCode = require('./RoomCode');

module.exports = (input) => {
  const validRooms = input.reduce((total, code) => {

    var roomCode = new RoomCode(code);

    if (roomCode.isValidRoom()) {
      return total + roomCode.getSectorId();
    } else {
      return total;
    }
  }, 0);

  return validRooms; // 158835
}
