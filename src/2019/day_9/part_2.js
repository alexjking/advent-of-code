'use strict';

const Computer = require('../computer');

// 63441
module.exports = input => {
  const memory = input[0].split(',');
  const computer = new Computer(memory);
  const result = computer.run([2]);
  return result[0];
}
