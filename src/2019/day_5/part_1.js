'use strict';

const Utils = require('../day_2/part_1');

// 13787043
module.exports = input => {
  const memory = input[0].split(',').map(Number);
  const computer = Utils.computer;
  const result = computer(memory, null, null, 1);
  return result;
}
