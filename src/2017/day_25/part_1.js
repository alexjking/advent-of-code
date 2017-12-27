'use strict';

const parseStates = (input) => {
  let states = {};
  let currentLine = 3;

  while (currentLine < input.length) {
    let state = {};
    let currentStateId = input[currentLine].split(' ')[2].replace(':', '');

    state[0] = {
      value: Number(input[currentLine + 2].trim().split(' ')[4].replace('.', '')),
      direction: input[currentLine + 3].trim().split(' ')[6].replace('.', ''),
      nextState: input[currentLine + 4].trim().split(' ')[4].replace('.', ''),
    };

    state[1] = {
      value: Number(input[currentLine + 6].trim().split(' ')[4].replace('.', '')),
      direction: input[currentLine + 7].trim().split(' ')[6].replace('.', ''),
      nextState: input[currentLine + 8].trim().split(' ')[4].replace('.', ''),
    };

    states[currentStateId] = state;

    currentLine += 10;
  }

  return states;
};

module.exports = (input) => {
  let currentState = input[0].split(' ')[3].replace('.', '');
  let steps = Number(input[1].split(' ')[5]);
  let states = parseStates(input);

  let tape = {};
  let cursor = 0;

  while (steps > 0) {
    let currentValue = tape[cursor] || 0;

    let currentInstruction = states[currentState][currentValue];

    // write the new value ( we only store set values to preserve memory)
    if (currentInstruction.value === 0) {
      delete tape[cursor];
    } else {
      tape[cursor] = currentInstruction.value;
    }

    // move cursor
    if (currentInstruction.direction === 'left') {
      cursor--;
    } else {
      cursor++;
    }

    // set new state
    currentState = currentInstruction.nextState;

    steps--;
  }

  return Object.keys(tape).length;
}