'use strict';

const _ = require('lodash');

const getValue = function(grid, rowIndex, colIndex) {
  let value = 0;

  for (let r = rowIndex - 1; r <= rowIndex + 1; r++) {
    for (let c = colIndex - 1; c <= colIndex + 1; c++) {
      value += _.get(grid, [r, c], 0);
    }
  }

  return value;
}

const setCell = function(grid, rowIndex, colIndex, value) {

  // get row
  let row = grid[rowIndex];

  if (_.isUndefined(row)) {
    grid[rowIndex] = [];
    row = grid[rowIndex];
  }

  // set the column from the row
  row[colIndex] = value;
};

module.exports = (input) => {
  input = 277678;

  let count = 1;
  let rowIndex = 0;
  let colIndex = 0;

  // initialize grid
  let grid = {};
  grid[rowIndex] = {};
  grid[rowIndex][colIndex] = 1;
  count++;

  let direction = 'E';

  let level = 1;

  // update these as I go along, these are used to calculate the end result
  let horizontalDistance = 0;
  let verticalDistance = 0;

  // loop around until we reach the number
  // keep track of how far away I am from the centre in both directions
  while (count < input) {
    switch(direction) {
      case 'E':
        // move right level times

        for (let i = 0; i < level; i++) {
          colIndex++;

          count = getValue(grid, rowIndex, colIndex);

          if (count > input) {
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
        }

        direction = 'N';
        break;
      case 'N':
        // move north level times.

        for (let i = 0; i < level; i++) {
          rowIndex--;

          count = getValue(grid, rowIndex, colIndex);

          if (count > input) {
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
        }

        direction = 'W';
        break;
      case 'W':
        // move west level + 1 times.

        for (let i = 0; i < (level + 1); i++) {
          colIndex--;

          count = getValue(grid, rowIndex, colIndex);

          if (count > input) {
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
        }

        direction = 'S';
        break;
      case 'S':
        // move south level + 1 times
        direction = 'E';

        for (let i = 0; i < (level + 1); i++) {
          rowIndex++;

          count = getValue(grid, rowIndex, colIndex);

          if (count > input) {
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
        }


        level += 2; // we increment the level now
        break;
    }
  }

  return count;

}