'use strict';

module.exports = class RoomCode {
  constructor(roomCode) {
    this.roomCode = roomCode;

    // get check sum
    this.checkSum = this.roomCode.split('[')[1];
    this.checkSum = this.checkSum.slice(0, -1);

    // get the letters and sector id
    this.lettersArr = this.roomCode.split('[')[0].split('-');

    this.sectorId = this.lettersArr.pop() * 1;
    this.letters = this.lettersArr.join("");
  }

  isValidRoom() {
    var charOccurrences = {};

    for (const ch of this.letters) {
      if (charOccurrences[ch]) {
        charOccurrences[ch]++;
      } else {
        charOccurrences[ch] = 1;
      }
    }

    // lets order the keys by occurrences, then by their name
    const sortedCharsStr = Object.keys(charOccurrences).sort((a, b) => {
      return charOccurrences[b] - charOccurrences[a] || a.localeCompare(b);
    }).join('');

    // check to see if the checksum is valid given the sorted characters
    return (sortedCharsStr.indexOf(this.checkSum) === 0);
  }

  getCheckSum() {
    return this.checkSum;
  }

  getSectorId() {
    return this.sectorId;
  }
}
