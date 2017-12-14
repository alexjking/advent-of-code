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
  return grid.reduce((memo, row) => {
    return memo + row.reduce((rowMemo, bit) => {
      return rowMemo + (bit === '#' ? 1 : 0);
    }, 0);
  }, 0);
};
