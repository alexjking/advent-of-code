'use strict';

const RoomCode = require('./RoomCode');

module.exports = (input) => {

  for (var i = 0; i < input.length; i++) {
    var roomCode = new RoomCode(input[i]);

    // if the room is valid, decrypt and check if it is what we are looking for
    if (roomCode.isValidRoom()) {
      // lets shift it
      const decryptedCode = roomCode.decrypt();

      // return the sector id if we find a string with north pole in it
      if (decryptedCode.indexOf('north') !== -1) {
        return roomCode.getSectorId(); // 993
      }
    }
  }

  // if we havent found, return null
  return null;
}
