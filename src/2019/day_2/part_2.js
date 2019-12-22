'use strict';

const Computer = require('../computer');

// 6421
module.exports = inputs => {
  const memory = inputs.filter(input => input !== '').map(Number);
  const target = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const tempMemory = memory.slice();
      tempMemory[1] = noun;
      tempMemory[2] = verb;

      const comp = new Computer(tempMemory);
      comp.run([]);

      if (comp.memory[0] === target) {
        return 100 * noun + verb;
      }
    }
  }

  return -1;
}
