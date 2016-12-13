'use strict';


function isOpenSpace(x, y, favouriteNumber) {
  let calc = (x*x) + (3*x) + (2*x*y) + (y) + (y*y);
  calc += favouriteNumber;

  // convert to binary
  let binaryString = calc.toString(2);

  // now count zeros
  let ones = binaryString.split('').reduce((acc, char) => {
    return (char === '1') ? acc + 1 : acc;
  }, 0);

  return (ones % 2) === 0;
}

function print(graph) {
  graph.forEach((row) => {
    let rowStr = row.reduce((acc, letter) => {
      return acc + letter;
    }, '');

    console.log(rowStr);
  });

  console.log('');
  console.log('');
}

module.exports = (input) => {

  // get our input
  let endCol = input[0] * 1;
  let endRow = input[1] * 1;
  let favouriteNumber = input[2] * 1;

  // lets define a graph for this array
  let graph = [];
  for (let i = 0; i < endRow * 2; i++) {
    let tempArr = [];
    for (let j = 0; j < endCol * 2; j++) {
      tempArr.push('.');
    }
    graph.push(tempArr);
  }

  let shortestPathLength = 0;
  let initialPos = [1, 1, 0];
  let queue = [];
  queue.push(initialPos);

  while (queue.length > 0) {
    // get current node
    let position = queue.shift();

    // otherwise lets find the row/col and continue search
    let row = position[0];
    let col = position[1];
    let pathLength = position[2];

    // continue early if the point is invalid, or already traversed
    if (row < 0 || col < 0 || graph[row][col] != '.') {
      continue;
    }

    // return answer if we have found it
    if (row === endRow && col === endCol) {
      shortestPathLength = pathLength;
      break;
    }

    // if a wall, set as wall and continue
    if (!isOpenSpace(col, row, favouriteNumber)) {
      graph[row][col] = '#';
      continue;
    }

    // if an open space, mark as open space and add neighbours
    graph[row][col] = 'O';

    // now add all valid neighbours to the queue
    if (row > 0) {
      queue.push([row - 1, col, pathLength + 1]);
    }

    if (col > 0) {
      queue.push([row, col - 1, pathLength + 1]);
    }

    queue.push([row + 1, col, pathLength + 1]);
    queue.push([row, col + 1, pathLength + 1]);
  }

  print(graph);

  return shortestPathLength; // part 1: 90
}
