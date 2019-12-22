'use strict';

const computer = require('../computer');

// 3892695
module.exports = input => {
  const memory = input[0].split(',').map(Number);
  const result = computer(memory, null, null, [5]);
  return result.output;
}
