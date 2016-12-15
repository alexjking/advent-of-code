'use strict';

const Part1Solution = require('./part_1');

/**
 * For part 2, just modify the input and call part 1.
 */
module.exports = (input) => {
  input.push('Disc #7 has 11 positions; at time=0, it is at position 0.');
  return Part1Solution(input); // Part 2: 3903937
}