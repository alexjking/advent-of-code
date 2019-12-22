'use strict';

const computer = require('../computer');

// 4090701
module.exports = inputs => {
  inputs = inputs.filter(input => input !== '').map(Number);

  return computer(inputs, 12, 2, null)[0];
};

module.exports.computer = computer;
