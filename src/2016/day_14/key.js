'use strict';

const md5 = require('md5');

module.exports = class Hash {

  constructor(salt, number, additionalHashes) {
    this.key = md5(salt + number);

    if (!additionalHashes) additionalHashes = 0;

    for (let i = 0; i < additionalHashes; i++) {
      this.key = md5(this.key);
    }
  }

  getFirstTriplet() {
    let match = this.key.match(/(.)\1{2}/);

    if (match === null) {
      return null;
    }

    let char = match[0].charAt(0);
    return char;
  }

  containsFiveOfAKind(char) {
    let regex = new RegExp('(' + char + '){5}');
    return this.key.match(regex);
  }
}