'use strict';

module.exports = (input) => {
  const steps = Number(input[0]);

  let buffer = [0];
  let currentPosition = 0;

  for (let i = 1; i <= 2017; i++) {
    // step forward
    currentPosition = (currentPosition + steps) % buffer.length;

    // insert a value into the next position
    currentPosition++;
    buffer.splice(currentPosition, 0, i);
  }

  // log the elements before and after 2017
  console.log(buffer.slice(currentPosition - 4, currentPosition + 4));

  // return value after 2017
  return buffer[currentPosition + 1];
}