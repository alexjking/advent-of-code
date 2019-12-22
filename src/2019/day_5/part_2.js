'use strict';

const Utils = require('../day_2/part_1');

// 3892695
module.exports = input => {
  const memory = input[0].split(',').map(Number);
  const computer = Utils.computer;
  const result = computer(memory, null, null, 5);
  return result;
}
