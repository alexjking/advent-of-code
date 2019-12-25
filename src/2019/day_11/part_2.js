'use strict';

const Computer = require('../computer');
const {HullPainter} = require('./part_1');

// UERPRFGJ
module.exports = input => {
  const painter = new HullPainter(1);
  const computer = new Computer(input[0].split(','));

  while (!computer.hasEnded()) {
    const currentColour = painter.getCurrentColour();
    const [colourToPaint, direction] = computer.run([currentColour]);

    painter.paintHull(colourToPaint);
    painter.move(direction);
  }

  return painter.printHull();
}
