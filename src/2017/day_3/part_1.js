'use strict';

const _ = require('lodash');

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

          if (count === input) {
            count++;
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
          count++;
        }

        direction = 'N';
        break;
      case 'N':
        // move north level times.

        for (let i = 0; i < level; i++) {
          rowIndex--;

          if (count === input) {
            count++;
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
          count++;
        }

        direction = 'W';
        break;
      case 'W':
        // move west level + 1 times.

        for (let i = 0; i < (level + 1); i++) {
          colIndex--;

          if (count === input) {
            count++;
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
          count++;
        }

        direction = 'S';
        break;
      case 'S':
        // move south level + 1 times
        direction = 'E';

        for (let i = 0; i < (level + 1); i++) {
          rowIndex++;

          if (count === input) {
            count++;
            break;
          }

          setCell(grid, rowIndex, colIndex, count);
          count++;
        }


        level += 2; // we increment the level now
        break;
    }
  }


  console.log('finsihed', 'row: ' + rowIndex,  'col: ' + colIndex);

  return Math.abs(rowIndex) + Math.abs(colIndex);

}