'use strict';

const computer = require('../computer');

// 13787043
module.exports = input => {
  const memory = input[0].split(',').map(Number);
  computer(memory, null, null, 1);
  return -1;
}