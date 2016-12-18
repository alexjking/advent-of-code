'use strict';

const Part1Solution = require('./part_1');

/**
 * Part 1 solution is fast enough.
 * Just change the input and defer to part 1.
 * Currently runs at roughly 6 seconds.
 */
module.exports = (input) => {
  input[1] = 400000;
  return Part1Solution(input); // Part 2: 20002936
}
