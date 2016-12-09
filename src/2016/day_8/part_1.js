'use strict';

const Screen = require('./Screen');

module.exports = (input) => {
  var screen = new Screen();

  screen.print();

  input.forEach((command) => {
    const words = command.split(' ');
    if (words[0] === 'rect') {
      const sizes = words[1].split('x').map((size) => {
        return size * 1;
      });
      screen.rect(sizes[0], sizes[1]);
    } else if (words[0] === 'rotate') {
      const rotateNumber = words[4];
      const index = words[2].split('=')[1];

      if (words[1] === 'column') {
        screen.rotateColumn(index, rotateNumber);
      } else if (words[1] === 'row') {
        screen.rotateRow(index, rotateNumber);
      }
    }

  });

  // print to get the answer for part 2
  screen.print(); // CFLELOYFCS

  return screen.getNumberOfLitPixels(); // part 1: 106
}
