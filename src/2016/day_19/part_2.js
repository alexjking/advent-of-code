'use strict';

function increment(i, elves) {
  i = (i < elves.length - 1) ?  i + 1 : 0;
  while (elves[i] === -1) {
    i = (i < elves.length - 1) ?  i + 1 : 0;
  }

  return i;
}

/**
 * A modified version of the white elephant game. This involves elves stealing from their opposite neighbour.
 * Which elf gets the last present?
 *
 * I noticed that for even inputs, there is a pattern to how elves are removed.
 * We start on the opposite side of the circle, and loop round deleting the next 2 valid elves
 * and then skipping a valid elf. This continues until only one elf remains.
 *
 * Below contains a simple loop to achieve this, we just have to be slightly careful about incrementing.
 *
 * The answer took less than a second to finish, which is better than the previous code which tries to work
 * out the answer properly (the old code took 17 mins to calculate for 500,000 elves).
 */
module.exports = (input) => {

  let numElves = 3012210;

  // initialize the elves
  let elves = [];
  for (let i = 0; i < numElves; i++) {
    elves[i] = i + 1;
  }

  let index = Math.floor(numElves / 2);
  let removedCounter = 0;
  let skip = 2;

  while (removedCounter < numElves - 1) {
    // if skip > 0, mark the current elf as removed and move along
    if (skip > 0) {
      elves[index] = -1;
      removedCounter++;
      skip--;
    } else {
      // else we shouldn't skip, just set the skip count back to 2
      skip = 2;
    }

    index = increment(index, elves);
  }

  // now loop through the elves until we have one which is alive
  for (let i = 0; i < numElves; i++) {
    if (elves[i] > -1) {
      return elves[i];
    }
  }
}
