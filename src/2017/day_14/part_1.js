'use strict';

const KnotHash = require('../day_10/part_2');

const convertToBinary = (hexHash) => {
  let binaryString = '';

  return hexHash.split('').reduce((memo, char) => {
    // convert hex to decimal, then decimal to binary
    let binString = parseInt(char, 16).toString(2);

    // add padding if necessary and return
    return memo + ("0000" + binString).slice(-4);
  }, '');
};

module.exports = (input) => {
  let key  = input[0];

  let grid = Array(128);
  for (let i = 0; i < 128; i++) {
    // create hash and convert to binary
    let hashInput = key + '-' + i;
    let hexHash = KnotHash(hashInput);
    let binaryHash = convertToBinary(hexHash);

    // map to free/empty spaces
    grid[i] = binaryHash.split('').map((bit) => {
      return (bit === '0') ? '.' : '#';
    });
  }

  // reduce grid to count the squares
  let usedSpace = grid.reduce((memo, row) => {
    return memo + row.reduce((rowMemo, bit) => {
      return rowMemo + (bit === '#' ? 1 : 0);
    }, 0);
  }, 0);

  console.log('Part 1:', usedSpace);

  // Modified BFS to calculate number of regions
  let regions = 0;
  for (let row = 0; row < 128; row++) {
    for (let col = 0; col < 128; col++) {
      // get selected cell
      let cell = grid[row][col];

      // continue if we have already visited this cell, or it is a free space
      if (cell === '*' || cell === '.') {
        continue;
      }

      // perform BFS to visit whole region, marking cells as visited as we go along
      regions++;
      let queue = [{
        row: row,
        col: col,
      }];

      while (queue.length > 0) {
        let currentCellLocation = queue.shift();
        let currentCellValue = grid[currentCellLocation.row][currentCellLocation.col];
        if (currentCellValue === '*' || currentCellValue === '.') {
          continue;
        }

        // mark as visited
        grid[currentCellLocation.row][currentCellLocation.col] = '*';

        // add neighbours to queue
        if (currentCellLocation.row > 0) {
          queue.push({row: currentCellLocation.row - 1, col: currentCellLocation.col});
        }
        if (currentCellLocation.row < 127) {
          queue.push({row: currentCellLocation.row + 1, col: currentCellLocation.col});
        }
        if (currentCellLocation.col > 0) {
          queue.push({row: currentCellLocation.row, col: currentCellLocation.col - 1});
        }
        if (currentCellLocation.col < 127) {
          queue.push({row: currentCellLocation.row, col: currentCellLocation.col + 1});
        }
      }
    }
  }

  console.log('Part 2:', regions);
  return regions;
};
