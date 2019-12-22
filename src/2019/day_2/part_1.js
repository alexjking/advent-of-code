'use strict';

const Computer = require('../computer');

// 4090701
module.exports = inputs => {
  inputs = inputs.filter(input => input !== '').map(Number);

  inputs[1] = 12;
  inputs[2] = 2;

  const comp = new Computer(inputs);
  comp.run([]);
  return comp.memory[0];
};
