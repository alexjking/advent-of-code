'use strict';

/**
 * Problem involving the white elephant party.
 * From the example you can work out simple rules for filtering the elves
 * without presents. Every time we go round,
 *  - if the total number of elves is odd, the first elf has no presents.
 *  - all other odd indexes elves (0-based) have no presents.
 */
module.exports = (input) => {

  let numElves = input[0];

  let elves = [];
  for (let i = 0; i < 3012210; i++) {
    elves[i] = i + 1;
  }

  while (elves.length > 1) {
    let filteredElvesArr = [];

    if ((elves.length % 2) === 0) {
      filteredElvesArr.push(elves[0]);
    }

    for (let i = 1; i < elves.length; i++) {
      if ((i % 2) === 0) {
        filteredElvesArr.push(elves[i]);
      }
    }

    elves = filteredElvesArr;
  }

  return elves[0]; // Part 1: 1830117
}
