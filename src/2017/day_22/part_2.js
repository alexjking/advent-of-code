'use strict';

module.exports = (input) => {
  // lets parse input into our virtual grid
  // we represent the virtual grid as a map of
  // coordinates that are infected
  let infectedMap = {};

  let zeroOffset = Math.floor(input.length / 2);
  input.forEach((row, rowIndex) => {
    row.split('').forEach((node, colIndex) => {
      if (node !== '.') {
        let id = [
          rowIndex - zeroOffset,
          colIndex - zeroOffset,
        ].join(',');

        infectedMap[id] = node;
      }
    });
  });

  let direction = 'N';
  let pos = {
    row: 0,
    col: 0,
  };

  let infectionCount = 0;


  for (let burst = 0; burst < 10000000; burst++) {
    let currentId = [pos.row, pos.col].join(',');

    // turn direction
    if (infectedMap[currentId] === '#') {
      // infected
      switch(direction) {
        case 'N': direction = 'E'; break;
        case 'E': direction = 'S'; break;
        case 'S': direction = 'W'; break;
        case 'W': direction = 'N'; break;
      }
    } else if (infectedMap[currentId] === undefined) {
      // clean
      switch(direction) {
        case 'N': direction = 'W'; break;
        case 'E': direction = 'N'; break;
        case 'S': direction = 'E'; break;
        case 'W': direction = 'S'; break;
      }
    } else if (infectedMap[currentId] === 'F') {
      // flagged
      switch(direction) {
        case 'N': direction = 'S'; break;
        case 'E': direction = 'W'; break;
        case 'S': direction = 'N'; break;
        case 'W': direction = 'E'; break;
      }
    }

    // infect/clean current node
    // - record the number of times an infection is caused
    if (infectedMap[currentId] === 'F') {
      // flagged nodes become clean
      delete infectedMap[currentId];
    } else if (infectedMap[currentId] === 'W') {
      // weakened nodes become infected
      infectedMap[currentId] = '#';
      infectionCount++;
    } else if (infectedMap[currentId] === '#') {
      // infected nodes become flagged
      infectedMap[currentId] = 'F';
    } else if (infectedMap[currentId] === undefined) {
      // clean node become weakened
      infectedMap[currentId] = 'W';
    }

    // moves forward
    switch(direction) {
      case 'N': pos.row--; break;
      case 'E': pos.col++; break;
      case 'S': pos.row++; break;
      case 'W': pos.col--; break;
    }
  }

  return infectionCount;
};