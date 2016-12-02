'use strict';

module.exports = class NumberPad {
  constructor(padArray, position) {
    this.pad = padArray;
    this.currentPosition = position;
  }

  getCurrentNumber() {
    return this.getNumber(this.currentPosition);
  }

  getNumber(position) {
    return this.pad[position.y][position.x];
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
    const newPos = {
      x: this.currentPosition.x,
      y: this.currentPosition.y - 1,
    }

    if (newPos.y >= 0 && this.getNumber(newPos) !== null) {
      this.currentPosition.y--;
    }
  }

  moveDown() {
    const newPos = {
      x: this.currentPosition.x,
      y: this.currentPosition.y + 1,
    }

    if (newPos.y < this.pad.length && this.getNumber(newPos) !== null) {
      this.currentPosition.y++;
    }
  }

  moveLeft() {
    const newPos = {
      x: this.currentPosition.x - 1,
      y: this.currentPosition.y,
    }

    if (newPos.x >= 0 && this.getNumber(newPos) !== null) {
      this.currentPosition.x--;
    }
  }

  moveRight() {
    const newPos = {
      x: this.currentPosition.x + 1,
      y: this.currentPosition.y,
    }

    if (newPos.x < this.pad[0].length && this.getNumber(newPos) !== null) {
      this.currentPosition.x++;
    }
  }
}
