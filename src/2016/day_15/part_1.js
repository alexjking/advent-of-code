'use strict';

module.exports = (input) => {

  // setup the discs
  let discs = input.map(discInput => {
    let discInputArr = discInput.split(' ');
    return {
      positions: (discInputArr[3] * 1),
      currentPos: discInputArr[11].slice(0, -1) * 1,
    }
  });

  let index = 0;

  /**
   * Loop through each time point, checking whether the discs at that time are valid.
   */
  while (index < Number.MAX_SAFE_INTEGER) {
    let discIndex = 1;

    // ES2015 doesn't have array.every(...)
    // So check if the current solution is invalid, and check !isInvalidSolution
    let isInvalidSolution = discs.some(disc => {
      let newPosition = disc.currentPos + index + discIndex;
      let isValidDisc = (newPosition % disc.positions) === 0;
      discIndex++

      return !isValidDisc;
    });

    // return the time index if we have found the first solution
    if (!isInvalidSolution) {
      return index;  // Part 1 Solution: 376777
    }

    index++;
  }
}
