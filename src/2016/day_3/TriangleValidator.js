'use strict';

module.exports = class TriangleValidator {
  constructor(array) {
    this.sides = array.split(' ').map(function(item) {
      return parseInt(item, 10);
    });
  }

  isValidTriandle() {
    // get the largest side
    var maxSide = Math.max.apply(Math, this.sides);

    // sum array
    var totalSum = this.sides.reduce((a, b) => {
      return a += b * 1;
    }, 0);

    // now check if the two smaller sides greater than third side
    return totalSum - maxSide > maxSide;
  }
}