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

module.exports = class Computer {

  constructor(memory) {
    this.memory = memory;
    this.index = 0;
  }

  fetchValue(idx, immediateMode) {
    if (immediateMode) {
      return Number(this.memory[idx]);
    } else {
      return Number(this.memory[this.memory[idx]]);
    }
  }

  run(input) {
    let output = [];
    while (1) {
      if (this.index >= this.memory.length) {
        console.error('index greater than memory length');
      }

      const operation = this.memory[this.index] % 100;
      const parameterMode1 = (Math.floor(this.memory[this.index] / 100) % 10) === 1;
      const parameterMode2 = (Math.floor(this.memory[this.index] / 1000) % 10) === 1;
      const parameterMode3 = (Math.floor(this.memory[this.index] / 10000) % 10) === 1;

      switch (operation) {
        case OP.ADD:
          const addVal = this.fetchValue(this.index + 1, parameterMode1) + this.fetchValue(this.index + 2, parameterMode2);
          this.memory[this.memory[this.index + 3]] = addVal;
          this.index += 4;
          break;
        case OP.MULTIPLY:
          const multVal = this.fetchValue(this.index + 1, parameterMode1) * this.fetchValue(this.index + 2, parameterMode2);
          this.memory[this.memory[this.index + 3]] = multVal;
          this.index += 4;
          break;
        case OP.JUMP_IF_TRUE:
          const jitFirstValue = this.fetchValue(this.index + 1, parameterMode1);
          if (jitFirstValue !== 0) {
            this.index = this.fetchValue(this.index + 2, parameterMode2);
          } else {
            this.index += 3;
          }
          break;
        case OP.JUMP_IF_FALSE:
          const jifFirstValue = this.fetchValue(this.index + 1, parameterMode1);
          if (jifFirstValue === 0) {
            this.index = this.fetchValue(this.index + 2, parameterMode2);
          } else {
            this.index += 3;
          }
          break;
        case OP.LESS_THAN:
          const ltLeft = this.fetchValue(this.index + 1, parameterMode1);
          const ltRight = this.fetchValue(this.index + 2, parameterMode2);
          if (ltLeft < ltRight) {
            this.memory[this.memory[this.index + 3]] = 1;
          } else {
            this.memory[this.memory[this.index + 3]] = 0;
          }
          this.index += 4;
          break;
        case OP.EQUALS:
          const equalsLeft = this.fetchValue(this.index + 1, parameterMode1);
          const equalsRight = this.fetchValue(this.index + 2, parameterMode2);
          if (equalsLeft === equalsRight) {
            this.memory[this.memory[this.index + 3]] = 1;
          } else {
            this.memory[this.memory[this.index + 3]] = 0;
          }
          this.index += 4;
          break;
        case OP.INPUT:
          const inputVal = input.shift();
          this.memory[this.memory[this.index + 1]] = inputVal;
          this.index += 2;
          break;
        case OP.OUTPUT:
          const outputVal = this.fetchValue(this.index + 1, parameterMode1);
          output.push(outputVal);
          this.index += 2;
          break;
        case OP.END:
          return output;
        default:
          console.error('unexpected operator', this.memory[this.index]);
          return;
      }
    }

    console.error('unexpected end, did not meet end operator');
  }
}
