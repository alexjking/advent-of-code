'use strict';

const Computer = require('../computer');

//239
module.exports = input => {
  const computer = new Computer(input[0].split(','));
  const output = computer.run([]);

  const xIndexes = output.filter((el, index) => {
    return index % 3 === 0;
  });
  const yIndexes = output.filter((el, index) => {
    return index % 3 === 1 && index != 0;
  });

  const maxX = xIndexes.reduce((acc, ind) => Math.max(acc, ind));
  const maxY = yIndexes.reduce((acc, ind) => Math.max(acc, ind));

  console.log(maxX, maxY);
  const screen = [];
  for (let y = 0; y <= maxY; y++) {
    screen.push(Array(maxX + 1).fill(' '));
  }

  for (let i = 0; i < output.length; i += 3) {
    screen[output[i + 1]][output[i]] = output[i + 2];
  }

  const blocks = screen.reduce((acc, row) => {
    return acc + row.reduce((acc, tile) => {
      if (tile === 2) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }, 0);

  console.log(screen.map(row => row.join('')));

  return blocks;
}
