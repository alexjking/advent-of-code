'use strict';

const _ = require('lodash');

const getDistance = (coordinates) => {
  return (Math.abs(coordinates.x) + Math.abs(coordinates.y) + Math.abs(coordinates.z)) / 2;
};

module.exports = (input) => {
  input = input[0].trim();

    let coordinates = _(input)
    .split(',')
    .reduce((memo, char) => {
      switch (char) {
        case 'n':
          memo.y++;
          memo.z--;
          break;
        case 's':
          memo.z++;
          memo.y--;
          break;
        case 'ne':
          memo.x++;
          memo.z--;
          break;
        case 'nw':
          memo.x--;
          memo.y++;
          break;
        case 'se':
          memo.y--;
          memo.x++;
          break;
        case 'sw':
          memo.z++;
          memo.x--;
      }

      memo.maxDistance = Math.max(memo.maxDistance, getDistance(memo));

      return memo;
    }, {
      x: 0,
      y: 0,
      z: 0,
      maxDistance: 0,
    });

  console.log('Part 1: ', getDistance(coordinates));
  console.log('Part 2: ', coordinates.maxDistance);
};