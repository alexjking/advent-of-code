'use strict';

const IPAddress = require('./IPAddress');

module.exports = (input) => {

  return input.reduce((count, address) => {
    var ipAddress = new IPAddress(address);
    if (ipAddress.supportsTls()) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  // 105
}