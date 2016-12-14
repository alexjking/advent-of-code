'use strict';

const md5 = require('md5');

module.exports = class Hash {

  constructor(salt, number) {
    this.key = md5(salt + number);
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