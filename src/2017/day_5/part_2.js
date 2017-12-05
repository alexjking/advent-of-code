'use strict';

const _ = require('lodash');

module.exports = (input) => {
  // convert to numbers
  let instructions = _.map(input, (row) => {
    return Number(row);
  });

  const upperBound = input.length - 1;

  let pointer = 0;

  let counter = 0;

  while (pointer <= upperBound && pointer >= 0) {
    let offset = instructions[pointer];
    if (offset >= 3) {
      instructions[pointer]--;
    } else {
      instructions[pointer]++;
    }

    pointer += offset;
    counter++;
  }

  return counter;
};
