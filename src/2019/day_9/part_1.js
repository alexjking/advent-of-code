'use strict';

const Computer = require('../computer');

// 2662308295
module.exports = input => {
  const memory = input[0].split(',');
  const computer = new Computer(memory);
  const result = computer.run([1]);
  return result[0];
}
