'use strict';

const Computer = require('../computer');

// 6610984 - 43s super inefficient and could be improved using an exponential
// search area narrowed down by binary search, but CBA
module.exports = input => {
  let tractorBeamArea = 0;

  const size = 100;

  let topY = 10;
  let bottomY = topY + size - 1;

  while (1) {
    // find left most bottom X
    let leftBottomX = 0;
    while (1) {
      const computer = new Computer(input[0].split(','));
      const output = computer.run([leftBottomX, bottomY]);
      if (output[0] === 1) {
        break;
      }

      leftBottomX++;
    }

    // find right most top X
    let lastValue = 0;
    let rightTopX = 0;
    while (1) {
      const computer = new Computer(input[0].split(','));
      const output = computer.run([rightTopX, topY]);

      // we've found the edge, lets return the x - 1 value
      if (lastValue === 1 && output[0] === 0) {
        rightTopX -=1;
        break;
      }

      lastValue = output[0];
      rightTopX++;
    }

    // exit condition
    if (rightTopX - leftBottomX >= (size - 1)) {
      return (leftBottomX * 10000) + topY;
    }

    topY++;
    bottomY++;
  }

  return "not found";
}
