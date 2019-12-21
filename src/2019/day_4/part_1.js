'use strict';

function twoAdjacentDigitsSame(num) {
  const str = String(num);

  for (let i = 0; i < 5; i++) {
    if (str.charAt(i) === str.charAt(i + 1)) {
      return true;
    }
  }

  return false;
}

function ascendingDigits(num) {
  const a = String(num);

  for (let i = 0; i < 5; i++) {
    if (Number(a.charAt(i)) > Number(a.charAt(i + 1))) {
      return false;
    }
  }

  return true;
}

// 2050
module.exports = input => {
  const ranges = input[0].split('-').map(Number);

  let matches = 0;
  for (let i = ranges[0]; i <= ranges[1]; i++) {
    if (twoAdjacentDigitsSame(i) && ascendingDigits(i)) {
      matches++;
    }
  }

  return matches;
}

module.exports.ascendingDigits = ascendingDigits;
