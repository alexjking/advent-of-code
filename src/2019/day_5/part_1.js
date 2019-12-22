'use strict';

const Computer = require('../computer');

// 13787043
module.exports = input => {
  const memory = input[0].split(',').map(Number);
  const comp = new Computer(memory);
  return comp.run([1]);
}
