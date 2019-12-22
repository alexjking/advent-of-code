'use strict';

const OP = {
  END: 99,
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
};

function computer(memory, noun, verb, input) {
    let index = 0;

    if (noun != null) {
      memory[1] = noun;
    }

    if (verb != null) {
      memory[2] = verb;
    }

    function fetchValue(m, fvidx, immediateMode) {
      if (immediateMode) {
        return m[fvidx];
      } else {
        return m[m[fvidx]];
      }
    }

    while (1) {
      const operation = memory[index] % 100;
      const parameterMode1 = (Math.floor(memory[index] / 100) % 10) === 1;
      const parameterMode2 = (Math.floor(memory[index] / 1000) % 10) === 1;
      const parameterMode3 = (Math.floor(memory[index] / 10000) % 10) === 1;

      switch (operation) {
        case OP.ADD:
          const addSaveIndex = memory[index + 3];
          const addVal = fetchValue(memory, index + 1, parameterMode1) + fetchValue(memory, index + 2, parameterMode2);
          memory[addSaveIndex] = addVal;
          index += 4;
          break;
        case OP.MULTIPLY:
          const multSaveIndex = memory[index + 3];
          const multVal = fetchValue(memory, index + 1, parameterMode1) * fetchValue(memory, index + 2, parameterMode2);
          memory[multSaveIndex] = multVal;
          index += 4;
          break;
        case OP.JUMP_IF_TRUE:
          const jitFirstValue = fetchValue(memory, index + 1, parameterMode1);
          if (jitFirstValue !== 0) {
            index = fetchValue(memory, index + 2, parameterMode2);
          } else {
            index += 3;
          }
          break;
        case OP.JUMP_IF_FALSE:
          const jifFirstValue = fetchValue(memory, index + 1, parameterMode1);
          if (jifFirstValue === 0) {
            index = fetchValue(memory, index + 2, parameterMode2);
          } else {
            index += 3;
          }
          break;
        case OP.LESS_THAN:
          const ltLeft = fetchValue(memory, index + 1, parameterMode1);
          const ltRight = fetchValue(memory, index + 2, parameterMode2);
          const ltSaveIndex = memory[index + 3];
          if (ltLeft < ltRight) {
            memory[ltSaveIndex] = 1;
          } else {
            memory[ltSaveIndex] = 0;
          }
          index += 4;
          break;
        case OP.EQUALS:
          const equalsLeft = fetchValue(memory, index + 1, parameterMode1);
          const equalsRight = fetchValue(memory, index + 2, parameterMode2);
          const equalsSaveIndex = memory[index + 3];
          if (equalsLeft === equalsRight) {
            memory[equalsSaveIndex] = 1;
          } else {
            memory[equalsSaveIndex] = 0;
          }
          index += 4;
          break;
        case OP.INPUT:
          const inputIndex = memory[index + 1];
          memory[inputIndex] = input;
          index += 2;
          break;
        case OP.OUTPUT:
          const outputVal = fetchValue(memory, index + 1, parameterMode1);
          console.log('output', outputVal);
          index += 2;
          break;
        case OP.END:
          console.log('ending');
          return memory[0];
        default:
            console.error('unexpected operator', memory[index]);
            return;
      }
    }
    console.log(memory);

    console.log('length', memory.length);

    return memory[0];
}

// 4090701
module.exports = inputs => {
  inputs = inputs.filter(input => input !== '').map(Number);

  return computer(inputs, 12, 2);
};

module.exports.computer = computer;
