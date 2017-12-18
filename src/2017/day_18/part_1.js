'use strict';

module.exports = (input) => {
  let instructions = input.map((row) => {
    return row.split(' ');
  });

  let registers = instructions.reduce((memo, instr) => {
    memo[instr[1]] = 0;
    return memo;
  }, {});

  let lastSound;

  let i = 0;
  while (i < instructions.length && i >= 0) {
    let instr = instructions[i];

    let x = instr[1];

    let y;
    if (isNaN(instr[2])) {
      y = Number(registers[instr[2]]);
    } else {
      y = Number(instr[2]);
    }

    switch (instr[0]) {
      case 'snd':
        lastSound = Number(registers[x]);
        break;
      case 'set':
        registers[x] = y;
        break;
      case 'add':
        registers[x] += y;
        break;
      case 'mul':
        registers[x] *= y;
        break;
      case 'mod':
        registers[x] %= y;
        break;
      case 'rcv':
        if (registers[x] > 0) {
          return lastSound;
        }
        break;
      case 'jgz':
        break;
      default:
        break;
      }

      if (instr[0] === 'jgz' && registers[x] > 0) {
        i += y;
      } else {
        i++;
      }
    }
};
