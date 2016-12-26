'use strict';

module.exports = class AssembunnySolver {

  constructor(instructions, registers) {
    this.instructions = instructions;
    this.registers = registers;
  }

  solve() {
    let clockSignal = 0;
    let count = 0;
    let i = 0;
    while (i < this.instructions.length) {//&& count < 30) {
      let commandArgs = this.instructions[i].split(' ');

      // if ((count % 500000) === 0) {
      //  console.log(count, this.registers, this.instructions[i], i);
      // }
      count++;

      switch (commandArgs[0]) {
        case 'cpy':
          if (this.isValidRegisterOrNumber(commandArgs[1]) && this.isValidRegister(commandArgs[2])) {
            this.registers[commandArgs[2]] = this.getValue(commandArgs[1]);
          }

          i++;
          break;
        case 'inc':
          if (this.isValidRegister(commandArgs[1])) {
            this.registers[commandArgs[1]]++;
          }

          i++;
          break;
        case 'dec':
          if (this.isValidRegister(commandArgs[1])) {
            this.registers[commandArgs[1]]--;
          }

          i++;
          break;
        case 'jnz':
          if (this.isValidRegisterOrNumber(commandArgs[1]) && this.isValidRegisterOrNumber(commandArgs[2])) {
            let x = this.getValue(commandArgs[1]);
            let y = this.getValue(commandArgs[2]);
            if (x != 0 && y != 0) { // make sure y is not 0, otherwise we infinite loop
              i += y;
            } else {
              i++;
            }
          } else {
            i++;
          }
          break;
        case 'out':
          // lets check if
          if (clockSignal % 2 === 0) {
            if (this.getValue(commandArgs[1]) !== 0) {
              return false;
            }
          } else {
            if (this.getValue(commandArgs[1]) !== 1) {
              return false;
            }
          }
          clockSignal++;
          i++;
          break;
        default:
          console.log('should not be here');
          break;
      }
    }

    // if the loop ends, then this isn't infinite so it is not a suitable clock signal
    return false;
  }

  isValidNumber(input) {
    return !isNaN(input);
  }

  isValidRegister(word) {
    return Object.keys(this.registers).includes(word);
  }

  isValidRegisterOrNumber(input) {
    return (this.isValidNumber(input) || this.isValidRegister(input));
  }

  getValue(word) {
    if (this.isValidRegister(word)) {
      return this.registers[word];
    } else {
      return word * 1;
    }
  }
}