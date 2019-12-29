'use strict';

const Computer = require('../computer');

// 201
module.exports = input => {
  let tractorBeamArea = 0;

  let area = [];
  for (let y = 0; y < 50; y++) {
    let row = [];
    for (let x = 0; x < 50; x++) {
      const computer = new Computer(input[0].split(','));
      const output = computer.run([x, y]);
      if (output[0] === 1) {
        row[x] = '#';
        tractorBeamArea++;
      } else {
        row[x] = '.';
      }
    }
    area.push(row);
  }

  area.forEach(row => {
    console.log(row.join(''));
  });

  return tractorBeamArea;
}
