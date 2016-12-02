'use strict';

module.exports = class NumberPad {
  constructor(padArray, position) {
    this.pad = padArray;
    this.currentPosition = position;
  }

  getCurrentNumber() {
    return this.pad[this.currentPosition.y][this.currentPosition.x];
  }

  move(char) {
    switch (char) {
      case 'U':
        this.moveUp();
        break;
      case 'D':
        this.moveDown();
        break;
      case 'L':
        this.moveLeft();
        break;
      case 'R':
        this.moveRight();
        break;
      default:
        console.log('error moving ' + char);
        break;
    }
  }

  moveUp() {
    if (this.currentPosition.y > 0) {
      this.currentPosition.y--;
    }
  }

  moveDown() {
    if (this.currentPosition.y < this.pad.length - 1) {
      this.currentPosition.y++;
    }
  }

  moveLeft() {
    if (this.currentPosition.x > 0) {
      this.currentPosition.x--;
    }
  }

  moveRight() {
    if (this.currentPosition.x < this.pad[0].length - 1) {
      this.currentPosition.x++;
    }
  }
}
