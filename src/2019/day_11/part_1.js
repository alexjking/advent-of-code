'use strict';

const Computer = require('../computer');

const D = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 3,
  WEST: 4,
};

class HullPainter {
  constructor() {
    this.hull = {}
    this.x = 0;
    this.y = 0;
    this.direction = D.NORTH;
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
}

// 2319
module.exports = input => {
  const painter = new HullPainter();
  const computer = new Computer(input[0].split(','));

  while (!computer.hasEnded()) {
    const currentColour = painter.getCurrentColour();
    const [colourToPaint, direction] = computer.run([currentColour]);

    painter.paintHull(colourToPaint);
    painter.move(direction);
  }

  return Object.keys(painter.hull).length;
}
