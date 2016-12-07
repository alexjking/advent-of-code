'use strict';

const IPAddress = require('./IPAddress');

module.exports = (input) => {

  return input.reduce((count, address) => {
    var ipAddress = new IPAddress(address);
    if (ipAddress.supportsTls()) {
      console.log(address + " is truee");
      return count + 1;
    } else {
      console.log(address + " is false");
      return count;
    }
  }, 0);

  // 105
}