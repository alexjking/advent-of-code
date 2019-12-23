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
  ADJUST_RELATIVE_BASE: 9,
};

module.exports = class Computer {

  constructor(memory) {
    this.memory = memory;
    this.index = 0;
    this.end = false;
    this.relativeBase = 0;
  }

  fetchWriteIndex(idx, parameterMode) {
    let value = null;
    switch (parameterMode) {
      case 0: // position
        value = Number(this.memory[idx]);
        break;
      case 1: // immediate
        value = Number(idx);
        break;
      case 2: // relative
        value = Number(this.memory[idx]) + this.relativeBase;
        break;
      default:
        throw new Exception('error');
    }

    if (isNaN(value)) {
      throw new Exception('error fetchWriteIndex');
    }

    return value;
  }

  fetchValue(idx, parameterMode) {
    let value = null;
    switch (parameterMode) {
      case 0: // position
        value = Number(this.memory[Number(this.memory[idx])]);
        break;
      case 1: // immediate
        value = Number(this.memory[idx]);
        break;
      case 2: // relative
        // console.log(this.memory[idx] + this.relativeBase);
        value = Number(this.memory[Number(this.memory[idx]) + this.relativeBase]);
        break;
      default:
        throw new Exception('error');
    }

    if (isNaN(value)) {
      return 0;
    }

    return value;
  }

  hasEnded() {
    return this.end;
  }

  run(input) {
    let output = [];
    while (1) {
      if (this.index >= this.memory.length) {
        console.error('index greater than memory length');
      }

      const operation = this.memory[this.index] % 100;
      const parameterMode1 = (Math.floor(this.memory[this.index] / 100) % 10);
      const parameterMode2 = (Math.floor(this.memory[this.index] / 1000) % 10)
      const parameterMode3 = (Math.floor(this.memory[this.index] / 10000) % 10);

      switch (operation) {
        case OP.ADD:
          const addVal = this.fetchValue(this.index + 1, parameterMode1) + this.fetchValue(this.index + 2, parameterMode2);
          this.memory[this.fetchWriteIndex(this.index + 3, parameterMode3)] = addVal;
          this.index += 4;
          break;
        case OP.MULTIPLY:
          const multVal = this.fetchValue(this.index + 1, parameterMode1) * this.fetchValue(this.index + 2, parameterMode2);
          this.memory[this.fetchWriteIndex(this.index + 3, parameterMode3)] = multVal;
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
            this.memory[this.fetchWriteIndex(this.index + 3, parameterMode3)] = 1;
          } else {
            this.memory[this.fetchWriteIndex(this.index + 3, parameterMode3)] = 0;
          }
          this.index += 4;
          break;
        case OP.EQUALS:
          const equalsLeft = this.fetchValue(this.index + 1, parameterMode1);
          const equalsRight = this.fetchValue(this.index + 2, parameterMode2);
          if (equalsLeft === equalsRight) {
            this.memory[this.fetchWriteIndex(this.index + 3, parameterMode3)] = 1;
          } else {
            this.memory[this.fetchWriteIndex(this.index + 3, parameterMode3)] = 0;
          }
          this.index += 4;
          break;
        case OP.INPUT:
          if (input.length === 0) {
            return output;
          }
          const inputVal = input.shift();
          this.memory[this.fetchWriteIndex(this.index + 1, parameterMode1)] = inputVal;
          this.index += 2;
          break;
        case OP.OUTPUT:
          const outputVal = this.fetchValue(this.index + 1, parameterMode1);
          output.push(outputVal);
          this.index += 2;
          break;
        case OP.END:
          this.end = true;
          return output;
        case OP.ADJUST_RELATIVE_BASE:
          this.relativeBase += this.fetchValue(this.index + 1, parameterMode1);
          this.index += 2;
          break;
        default:
          console.error('unexpected operator', this.index, this.memory[this.index]);
          return;
      }
    }

    console.error('unexpected end, did not meet end operator');
  }
}
