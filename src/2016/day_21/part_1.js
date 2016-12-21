'use strict';

const StringUtils = require('./StringUtils');

module.exports = (input) => {
  let utils = new StringUtils();

  let str = 'abcdefgh';
  let charArr = str.split('');

  input.forEach(command => {
    let arr = command.split(' ');
    if (arr[0] === 'swap' && arr[1] === 'position') {
      let x = arr[2] * 1;
      let y = arr[5] * 1;
      utils.swapPosition(charArr, x, y);
    } else if (arr[0] === 'swap' && arr[1] === 'letter') {
      utils.swapLetter(charArr, arr[2], arr[5]);
    } else if (arr[0] === 'reverse') {
      let x = arr[2] * 1;
      let y = arr[4] * 1;
      utils.reversePositions(charArr, x, y);
    } else if (arr[0] === 'rotate' && arr[1] === 'left') {
      let x = arr[2] * 1;
      utils.rotateLeft(charArr, x);
    } else if (arr[0] === 'rotate' && arr[1] === 'right') {
      let x = arr[2] * 1;
      utils.rotateRight(charArr, x);
    } else if (arr[0] === 'move') {
      let x = arr[2] * 1;
      let y = arr[5] * 1;
      utils.movePosition(charArr, x, y);
    } else if (arr[0] == 'rotate' && arr[1] === 'based') {
      utils.rotateBasedOnLetterPosition(charArr, arr[6]);
    } else if (arr[0] == 'rotate' && arr[1] === 'reverse') {
     utils.reverseRotateBasedOnLetterPosition(charArr, arr[6]);
    } else {
      console.error('Invalid Command');
    }
  });

  return charArr.join(''); // Part 1: cbeghdaf
}
