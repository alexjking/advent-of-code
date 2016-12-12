'use strict';

module.exports = (input) => {

  let registers = {};
  let registerNames = ['a', 'b', 'c', 'd'];

  registerNames.forEach((name) => {
    registers[name] = 0;
  });

  let getValueFromRegister = (word) => {
    if (registerNames.includes(word)) {
      return registers[word];
    } else {
      return word * 1;
    }
  }

  let i = 0;
  while (i < input.length) {
    //console.log(i);
    //console.log(registers);
    let command = input[i];
    let commandArgs = command.split(' ');

    if (commandArgs[0] === 'cpy') {
      registers[commandArgs[2]] = getValueFromRegister(commandArgs[1]);
      i++;
      continue;
    }

    if (commandArgs[0] === 'inc') {
      registers[commandArgs[1]]++;
      i++;
      continue;
    }

    if (commandArgs[0] === 'dec') {
      registers[commandArgs[1]]--;
      i++;
      continue;
    }

    if (commandArgs[0] === 'jnz') {
      let x = getValueFromRegister(commandArgs[1]);
      if (x != 0) {
        i += commandArgs[2] * 1;
      } else {
        i++;
      }
      continue;
    }
  }

  console.log(registers);
  return registers['a']; //318020
}
