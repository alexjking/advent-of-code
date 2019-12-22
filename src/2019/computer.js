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

function fetchValue(m, fvidx, immediateMode) {
  if (immediateMode) {
    return Number(m[fvidx]);
  } else {
    return Number(m[m[fvidx]]);
  }
}

module.exports = (memory, noun, verb, input) => {
    let index = 0;
    let output = []

    if (noun != null) {
      memory[1] = noun;
    }

    if (verb != null) {
      memory[2] = verb;
    }

    while (1) {
      if (index >= memory.length) {
        console.error('index greater than memory length');
      }

      const operation = memory[index] % 100;
      const parameterMode1 = (Math.floor(memory[index] / 100) % 10) === 1;
      const parameterMode2 = (Math.floor(memory[index] / 1000) % 10) === 1;
      const parameterMode3 = (Math.floor(memory[index] / 10000) % 10) === 1;

      switch (operation) {
        case OP.ADD:
          const addVal = fetchValue(memory, index + 1, parameterMode1) + fetchValue(memory, index + 2, parameterMode2);
          memory[memory[index + 3]] = addVal;
          index += 4;
          break;
        case OP.MULTIPLY:
          const multVal = fetchValue(memory, index + 1, parameterMode1) * fetchValue(memory, index + 2, parameterMode2);
          memory[memory[index + 3]] = multVal;
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
          if (ltLeft < ltRight) {
            memory[memory[index + 3]] = 1;
          } else {
            memory[memory[index + 3]] = 0;
          }
          index += 4;
          break;
        case OP.EQUALS:
          const equalsLeft = fetchValue(memory, index + 1, parameterMode1);
          const equalsRight = fetchValue(memory, index + 2, parameterMode2);
          if (equalsLeft === equalsRight) {
            memory[memory[index + 3]] = 1;
          } else {
            memory[memory[index + 3]] = 0;
          }
          index += 4;
          break;
        case OP.INPUT:
          const inputVal = input.shift();
          memory[memory[index + 1]] = inputVal;
          index += 2;
          break;
        case OP.OUTPUT:
          const outputVal = fetchValue(memory, index + 1, parameterMode1);
          output.push(outputVal);
          index += 2;
          break;
        case OP.END:
          return {
            memory,
            output,
          };
        default:
          console.error('unexpected operator', memory[index]);
          return;
      }
    }

    console.error('unexpected end, did not meet end operator');
}
