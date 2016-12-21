'use strict';

module.exports = class StringUtils {
  constructor() {

  }

  swapPosition(charArr, x, y) {
    // swap position x with position y
    if (x < 0 || y < 0) {
      console.error('Invalid index.');
      return;
    }

    let temp = charArr[y];
    charArr[y] = charArr[x];
    charArr[x] = temp;
  }

  swapLetter(charArr, x, y) {
    // swaps the positions of the given letters
    let xIndex = charArr.indexOf(x);
    let yIndex = charArr.indexOf(y);

    if (xIndex < 0 || yIndex < 0) {
      console.error('Invalid index.');
      console.log(charArr, x, y);
      return;
    }


    this.swapPosition(charArr, xIndex, yIndex);
  }

  rotateLeft(charArr, x) {
    let tempArr = charArr.slice(0, x);
    let count = 0;

    // lets sanitise x
    x = x % charArr.length;

    while (count < charArr.length - x) {
      charArr[count] = charArr[count + x];
      count++;
    }

    while (count < charArr.length) {
      charArr[count] = tempArr.shift();
      count++;
    }
  }

  rotateRight(charArr, x) {
    let tempArr = charArr.slice(charArr.length - x, charArr.length);

    // lets sanitise x
    x = x % charArr.length;

    // lets rotate x -> end
    let count = charArr.length - 1;
    while (count >= x) {
      charArr[count] = charArr[count - x];
      count--;
    }

    // now lets set the 0 -> x values
    count = 0;
    while (count < x) {
      charArr[count] = tempArr.shift();
      count++;
    }
  }

  rotateBasedOnLetterPosition(charArr, x) {
    // rotate string based on position of letter x
    let index = charArr.indexOf(x);

    if (index < 0) return;

    let rotations = 1 + index;
    if (index >= 4) {
      rotations++;
    }

    this.rotateRight(charArr, rotations);
  }

  reverseRotateBasedOnLetterPosition(charArr, x) {
    // rotate string based on position of letter x
    let index = charArr.indexOf(x);

    if (index < 0) return;

    // this is a mapping of current position to previous position
    let mapping = [9, 1, 6, 2, 7, 3, 8, 4];

    this.rotateLeft(charArr, mapping[index]);
  }

  reversePositions(charArr, x, y) {
    // reverse position x through y
    while (x < y) {
      this.swapPosition(charArr, x, y);
      x++;
      y--;
    }
  }

  movePosition(charArr, x, y) {
    // letter at position x should be removed from string, and inserted so that
    // it is at position Y

    let letter = charArr.splice(x, 1)[0];
    charArr.splice(y, 0, letter);
  }
}