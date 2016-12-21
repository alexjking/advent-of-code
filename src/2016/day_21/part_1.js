'use strict';

function swapPosition(charArr, x, y) {
  // swap position x with position y
  if (x < 0 || y < 0) {
    console.error('ERRROOO------------------------------');
    return;
  }

  let temp = charArr[y];
  charArr[y] = charArr[x];
  charArr[x] = temp;
}

function swapLetter(charArr, x, y) {
  // swaps the positions of the given letters
  let xIndex = charArr.indexOf(x);
  let yIndex = charArr.indexOf(y);

  if (xIndex < 0 || yIndex < 0) {
    console.error('ERRROOO------------------------------');
    console.log(charArr, x, y);
    return;
  }


  swapPosition(charArr, xIndex, yIndex);
}

function rotateLeft(charArr, x) {
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

function rotateRight(charArr, x) {
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

function rotateBasedOnLetterPosition(charArr, x) {
  // rotate string based on position of letter x
  let index = charArr.indexOf(x);

  if (index < 0) return;

  let rotations = 1 + index;
  if (index >= 4) {
    rotations++;
  }

  rotateRight(charArr, rotations);
}

function reversePositions(charArr, x, y) {
  // reverse position x through y
  while (x < y) {
    swapPosition(charArr, x, y);
    x++;
    y--;
  }
}

function movePosition(charArr, x, y) {
  // letter at position x should be removed from string, and inserted so that
  // it is at position Y

  let letter = charArr.splice(x, 1)[0];
  charArr.splice(y, 0, letter);
}


module.exports = (input) => {
  //let str = 'abcde';
  let str = 'abcdefgh';

  let charArr = str.split('');
  //console.log(str);

  input.forEach(command => {
    // console.log(command);
    // console.log('-', charArr.join(''));
    // console.log(charArr);

    let arr = command.split(' ');
    if (arr[0] === 'swap' && arr[1] === 'position') {
      let x = arr[2] * 1;
      let y = arr[5] * 1;
      swapPosition(charArr, x, y);
    } else if (arr[0] === 'swap' && arr[1] === 'letter') {
      swapLetter(charArr, arr[2], arr[5]);
    } else if (arr[0] === 'reverse') {
      let x = arr[2] * 1;
      let y = arr[4] * 1;
      reversePositions(charArr, x, y);
    } else if (arr[0] === 'rotate' && arr[1] === 'left') {
      let x = arr[2] * 1;
      rotateLeft(charArr, x);
    } else if (arr[0] === 'rotate' && arr[1] === 'right') {
      let x = arr[2] * 1;
      rotateRight(charArr, x);
    } else if (arr[0] === 'move') {
      let x = arr[2] * 1;
      let y = arr[5] * 1;
      movePosition(charArr, x, y);
    } else if (arr[0] == 'rotate' && arr[1] === 'based') {
      rotateBasedOnLetterPosition(charArr, arr[6]);
    }


    // console.log('-', charArr.join(''));
    // console.log('');
  });

  return charArr.join(''); // Part 1: cbeghdaf
}
