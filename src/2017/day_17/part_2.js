'use strict';

module.exports = (input) => {
  const steps = Number(input[0]);
  let length = 1;
  let result = -1;
  let currentPosition = 0;

  // it keeps on growing so I don't really need to worry about the array
  for (let i = 1; i <= 50000000; i++) {
    currentPosition = ((currentPosition + steps) % length) + 1;

    if (currentPosition === 1) {
      result = i;
    }

    length++;
  }

  return result;
};
