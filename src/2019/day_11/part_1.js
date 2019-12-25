'use strict';

const Computer = require('../computer');

const D = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 3,
  WEST: 4,
};

class HullPainter {
  constructor(startPanelColour) {
    this.hull = {}
    this.x = 0;
    this.y = 0;
    this.direction = D.NORTH;
    this.paintHull(startPanelColour);
  }

  getKey() {
    return this.x + ':' + this.y;
  }

  getCurrentColour() {
    if (this.hull.hasOwnProperty(this.getKey())) {
      return this.hull[this.getKey()];
    } else {
      return 0;
    }
  }

  paintHull(colour) {
    this.hull[this.getKey()] = colour;
  }

  move(direction) {
    if (direction === 0) {
      this.turnLeft();
    } else if (direction === 1) {
      this.turnRight();
    } else {
      throw 'invalid direction for move';
    }

    // move forward
    switch(this.direction) {
      case D.NORTH:
        this.y++;
        break;
      case D.WEST:
        this.x--;
        break;
      case D.SOUTH:
        this.y--;
        break;
      case D.EAST:
        this.x++;
        break;
      default:
        throw 'Invalid direction';
    }
  }

  turnLeft() {
    switch(this.direction) {
      case D.NORTH:
        this.direction = D.WEST;
        break;
      case D.WEST:
        this.direction = D.SOUTH;
        break;
      case D.SOUTH:
        this.direction = D.EAST;
        break;
      case D.EAST:
        this.direction = D.NORTH;
        break;
      default:
        throw 'Invalid direction';
    }
  }

  turnRight() {
    switch(this.direction) {
      case D.NORTH:
        this.direction = D.EAST;
        break;
      case D.EAST:
        this.direction = D.SOUTH;
        break;
      case D.SOUTH:
        this.direction = D.WEST;
        break;
      case D.WEST:
        this.direction = D.NORTH;
        break;
      default:
        throw 'Invalid direction';
    }
  }

  printHull() {
    // find ranges for x and y coordinates
    const ranges = Object.keys(this.hull).reduce((acc, panelKey) => {
      const [x, y] = panelKey.split(':');
      return {
        minX: Math.min(acc.minX, Number(x)),
        minY: Math.min(acc.minY, Number(y)),
        maxX: Math.max(acc.maxX, Number(x)),
        maxY: Math.max(acc.maxY, Number(y)),
      };
    }, {minX: Infinity, minY: 0, maxX: 0, maxY: 0});

    const xRange = ranges.maxX - ranges.minX;
    const yRange = ranges.maxY - ranges.minY;

    // create an empty grid for x and y range
    const result = [];
    for (let y = 0; y <= yRange; y++) {
      result.push(Array(xRange + 1).fill(' '));
    }

    // loop through painted panels, painting white panels in the grod
    Object.entries(this.hull).forEach(([k, value]) => {
      const [x, y] = k.split(':');

      if (value === 1) {
        result[y - ranges.minY][x - ranges.minX] = '#';
      }
    });

    return result
      .reverse()
      .map(row => row.join(''));
  }
}

// 2319
module.exports = input => {
  const painter = new HullPainter(0);
  const computer = new Computer(input[0].split(','));

  while (!computer.hasEnded()) {
    const currentColour = painter.getCurrentColour();
    const [colourToPaint, direction] = computer.run([currentColour]);

    painter.paintHull(colourToPaint);
    painter.move(direction);
  }

  return Object.keys(painter.hull).length;
}

module.exports.HullPainter = HullPainter;
