'use strict';

const StringUtils = require('./StringUtils');

// to descramble the password we just need to reverse the input
// and modify non reversible instructions to their reversed format
// this is very similar to part 1.
module.exports = (input) => {
  let utils = new StringUtils();

  // the scrambled string
  let str = 'fbgdceah';
  let charArr = str.split('');

  input.reverse();
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
      utils.rotateRight(charArr, x); //rotate right instead of left
    } else if (arr[0] === 'rotate' && arr[1] === 'right') {
      let x = arr[2] * 1;
      utils.rotateLeft(charArr, x); // rotate left instead of right
    } else if (arr[0] === 'move') {
      let x = arr[2] * 1;
      let y = arr[5] * 1;
      utils.movePosition(charArr, y, x); // reverse positions (y,x) instead of (x,y)
    } else if (arr[0] == 'rotate' && arr[1] === 'based') {
      utils.reverseRotateBasedOnLetterPosition(charArr, arr[6]); // use a reverse letter position function instead
    } else {
      console.error('Invalid Command');
    }
  });

  return charArr.join(''); // Part 2: bacdefgh
}