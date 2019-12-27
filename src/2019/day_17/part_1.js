'use strict';


const Computer = require('../computer');

// 7816
module.exports = input => {

  const computer = new Computer(input[0].split(','));
  const output = computer.run([]);
  const grid = [];
  grid.push([]);

  output.forEach(el => {
    if (el === 10) {
      grid.push([]);
    } else {
      grid[grid.length - 1].push(String.fromCharCode(el));
    }
  });

  let sum = 0;

  grid.forEach((row, y) => {
    row.forEach((el, x) => {
      if (
        grid[y][x] === '#' &&
        (y < grid.length - 1 && grid[y + 1][x] === '#') &&
        (y > 0 && grid[y - 1][x] === '#') &&
        grid[y][x + 1] === '#' &&
        grid[y][x - 1] === '#'
      ) {
        sum += (x * y);
      }
    });
  });

  return sum;
}
