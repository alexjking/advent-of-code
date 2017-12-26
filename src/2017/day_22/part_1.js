'use strict';

module.exports = (input) => {
  // lets parse input into our virtual grid
  // we represent the virtual grid as a map of
  // coordinates that are infected
  let infectedMap = {};

  let zeroOffset = Math.floor(input.length / 2);
  input.forEach((row, rowIndex) => {
    row.split('').forEach((node, colIndex) => {
      if (node === '#') {
        let id = [
          rowIndex - zeroOffset,
          colIndex - zeroOffset,
        ].join(',');

        infectedMap[id] = true;
      }
    });
  });

  let direction = 'N';
  let pos = {
    row: 0,
    col: 0,
  };

  let infectionCount = 0;


  for (let burst = 0; burst < 10000; burst++) {
    let currentId = [pos.row, pos.col].join(',');

    // turn direction
    if (infectedMap[currentId]) {
      switch(direction) {
        case 'N': direction = 'E'; break;
        case 'E': direction = 'S'; break;
        case 'S': direction = 'W'; break;
        case 'W': direction = 'N'; break;
      }
    } else {
      switch(direction) {
        case 'N': direction = 'W'; break;
        case 'E': direction = 'N'; break;
        case 'S': direction = 'E'; break;
        case 'W': direction = 'S'; break;
      }
    }

    // infect/clean current node
    // - record the number of times an infection is caused
    if (infectedMap[currentId]) {
      delete infectedMap[currentId];
    } else {
      infectedMap[currentId] = true;
      infectionCount++;
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