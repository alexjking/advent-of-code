'use strict';

const part1 = require('./part_1');

// 4628989
module.exports = (input) => {

  const massList = input
    .filter(mass => mass !== '')
    .map(Number);

  let sum = 0;

  while (massList.length > 0) {
    const mass = massList.pop();
    const fuel = (Math.floor(mass / 3) - 2);
    if (fuel >= 0) {
      sum += fuel;
      massList.push(fuel);
    }
  }

  return sum;
}
