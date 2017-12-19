'use strict';

const isInBounds = (grid, row, col) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

module.exports = (input) => {
  // create a grid from the input, making sure each row has the same width
  let maxWidth = input.reduce((memo, row) => {
    return Math.max(memo, row.length);
  }, 0);

  let grid = input.map((rowStr) => {
    let row = rowStr.split('');

    for (let i = row.length; i < maxWidth; i++) {
      row.push(' ');
    }

    return row;
  });

  // our position and direction arguments
  let row = 0;
  let col = 0;
  let direction = 'S';

  // find the starting coordinate
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[0][i] === '|') {
      col = i;
    }
  }

  // stores letters as we come across them
  let letters = [];

  while (isInBounds(grid, row, col) && grid[row][col] !== ' ') {

    // loop in current direction until we hit a corner
    while (grid[row][col] !== '+' && grid[row][col] !== " " && isInBounds(grid, row, col)) {
      if (grid[row][col] !== '-' && grid[row][col] !== '|') {
        letters.push(grid[row][col]);
      }

      switch (direction) {
        case 'N':
          row -= 1;
          break;
        case 'S':
          row += 1;
          break;
        case 'E':
          col += 1;
          break;
        case 'W':
          col -= 1;
          break;
      }
    }

    // set the new direction
     if (direction === 'N' || direction === 'S') {
      if (grid[row][col - 1] === '-' || grid[row][col - 1].match(/[a-z]/i)) {
        direction = 'W';
        col -= 1;
      } else if (grid[row][col + 1] === '-' || grid[row][col + 1].match(/[a-z]/i)) {
        direction = 'E';
        col += 1;
      } else {
        console.log('error v->h junction');
      }
     } else {
      if (grid[row - 1][col] === '|' || grid[row - 1][col].match(/[a-z]/i)) {
        direction = 'N';
        row -= 1;
      } else if (grid[row + 1][col] === '|' || grid[row + 1][col].match(/[a-z]/i)) {
        direction = 'S';
        row += 1;
      } else {
        console.log('error h->v junction');
      }
    }
  }

  return letters.join('');
};
