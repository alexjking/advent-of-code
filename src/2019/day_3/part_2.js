'use strict';

const part1 = require('./part_1');

// 11238
module.exports = input => {
  const firstPath = input[0].split(',');
  const secondPath = input[1].split(',');

  const firstVisited = part1.findVisited(firstPath);
  const secondVisited = part1.findVisited(secondPath);

  return Object.keys(firstVisited).reduce((minSteps, point) => {
    if (secondVisited.hasOwnProperty(point)) {
      return Math.min(
        firstVisited[point] + secondVisited[point],
        minSteps
      );
    }

    return minSteps;
  }, 9999999999);
};
