'use strict';

const OP = {
  END: 99,
  ADD: 1,
  MULTIPLY: 2,
};

function computer(memory, noun, verb) {
    let index = 0;

    memory[1] = noun;
    memory[2] = verb;

    while (memory[index] != OP.END) {
      const leftIndex = memory[index + 1];
      const rightIndex = memory[index + 2];
      const saveIndex = memory[index + 3];
      switch (memory[index]) {
        case OP.ADD:
          const addVal = memory[leftIndex] + memory[rightIndex];
          memory[saveIndex] = addVal;
          break;
        case OP.MULTIPLY:
          const multVal = memory[leftIndex] * memory[rightIndex];
          memory[saveIndex] = multVal;
          break;
        default:
          console.error('unexpected operator', memory[index]);
      }

      index += 4;
    }

    return memory[0];
}

// 4090701
module.exports = inputs => {
  inputs = inputs.filter(input => input !== '').map(Number);

  return computer(inputs, 12, 2);
};

module.exports.computer = computer;
