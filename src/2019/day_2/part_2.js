'use strict';

const computer = require('../computer');

// 6421
module.exports = inputs => {
  const memory = inputs.filter(input => input !== '').map(Number);
  const target = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const val = computer(memory.slice(), noun, verb).memory[0];
      if (val === target) {
        return 100 * noun + verb;
      }
    }
  }

  return -1;
}
