'use strict';

module.exports = (input) => {

  let registers = {};
  let registerNames = ['a', 'b', 'c', 'd'];

  registerNames.forEach((name) => {
    registers[name] = 0;
  });

  // we need to start off with 7n eggs in register a. Clue from the question.
  registers['a'] = 7;

  let getValueFromRegister = (word) => {
    if (registerNames.includes(word)) {
      return registers[word];
    } else {
      return word * 1;
    }
  }

  let isValidNumber = (input) => {
    return !isNaN(input);
  }

  let isValidRegister = (input) => {
    return registerNames.includes(input);
  };

  let isValidRegisterOrNumber = (input) => {
    return (isValidNumber(input) || isValidRegister(input));
  }

  let count = 0;
  let i = 0;
  while (i < input.length) {



    let command = input[i];
    let commandArgs = command.split(' ');

    if ((count % 50000) === 0) {
      console.log(count, registers, command, i);
    }
    count++;

    if (commandArgs[0] === 'cpy') {
      if (isValidRegisterOrNumber(commandArgs[1]) && isValidRegister(commandArgs[2])) {
        registers[commandArgs[2]] = getValueFromRegister(commandArgs[1]);
      }

      i++;
      continue;
    }

    if (commandArgs[0] === 'inc') {
      if (isValidRegister(commandArgs[1])) {
        registers[commandArgs[1]]++;
      }

      i++;
      continue;
    }

    if (commandArgs[0] === 'dec') {
      if (isValidRegister(commandArgs[1])) {
        registers[commandArgs[1]]--;
      }

      i++;
      continue;
    }

    if (commandArgs[0] === 'jnz') {
      if (isValidRegisterOrNumber(commandArgs[1]) && isValidRegisterOrNumber(commandArgs[2])) {
        let x = getValueFromRegister(commandArgs[1]);
        let y = getValueFromRegister(commandArgs[2]);
        if (x != 0 && y != 0) { // make sure y is not 0, otherwise we infinite loop
          i += y;
        } else {
          i++;
        }
      } else {
        i++;
      }

      continue;
    }

    if (commandArgs[0] === 'tgl') {

      let x = getValueFromRegister(commandArgs[1]);
      // find out how many arguments the command we need to toggle has
      let toggleIndex = i + x;
      if (toggleIndex < 0 || toggleIndex >= input.length) {
        i++;
        continue;
      }

      let toggleCommandArgs = input[i + x].split(' ');
      if (toggleCommandArgs.length === 2) {
        if (toggleCommandArgs[0] === 'inc') {
          toggleCommandArgs[0] = 'dec';
        } else {
          toggleCommandArgs[0] = 'inc';
        }
        // } else if (toggleCommandArgs[0] === 'inc') {
        //   toggleCommandArgs[0] = 'inc';
        // }
      } else if (toggleCommandArgs.length === 3) {
        if (toggleCommandArgs[0] === 'jnz') {
          toggleCommandArgs[0] = 'cpy';
        } else {
          toggleCommandArgs[0] = 'jnz';
        }
        // } else if (toggleCommandArgs[0] === 'cpy') {
        //   toggleCommandArgs[0] = 'jnz';
        // }
      }

      input[toggleIndex] = toggleCommandArgs.join(' ');
      i++;
      continue
    }

  }

  console.log(registers);
  return registers['a']; //Part 1: 11200
}
