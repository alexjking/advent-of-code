'use strict';

module.exports = (input) => {
  let aValue = Number(input[0].split(' ')[4]);
  let bValue = Number(input[1].split(' ')[4]);

  const aFactor = 16807;
  const bFactor = 48271;

  let judge = 0;

  // mask to get lowest 16 bits
  let mask = parseInt('1111111111111111', 2);

  for (let i = 0; i < 40000000; i++) {
    // get next value
    aValue = (aValue * aFactor) % 2147483647;
    bValue = (bValue * bFactor) % 2147483647;

    // check if lowest 16 bits equal
    if ((aValue & mask) == (bValue & mask)) {
      judge++;
    }
  }

  return judge;
};