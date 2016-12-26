'use strict';

const AssembunnySolver = require('./AssembunnySolver');

/**
 * AssembunnySolver.solve() returns false if the instructions end,
 * or if the clock sequence fails to go 0,1,0,1 etc.
 *
 * To solve this, run the input and check the console for when an input
 * for i is waiting (infinite loop).
 */
module.exports = (input) => {
  let i = 0;
  while (i < 5000) {
    console.log(i);
    let registers = {};
    registers['a'] = i;
    registers['b'] = 0;
    registers['c'] = 0;
    registers['d'] = 0;

    let solver = new AssembunnySolver(input, registers);
    solver.solve();

    i++;
  }

  return null; // Part 1: 198.
}
