'use strict';

const part1 = require('./part_1');

function noThreeDigitsSame(num) {
  const str = String(num);

  let i = 0;
  while (i < 5) {
    if (str.charAt(i) !== str.charAt(i + 1)) {
      i++;
      continue;
    }

    // if we have a matching pair, and the next char doesn't match
    // then we have a valid number
    if (i > 4 || str.charAt(i) !== str.charAt(i + 2)) {
      return true;
    } else {
      // skip forward to next new character (outside of the group)
      let j = i;
      while (str.charAt(j) === str.charAt(i)) {
        i++;
      }
    }
  }

  return false;
}

// 1390
module.exports = input => {
  const ranges = input[0].split('-').map(Number);

  let matches = 0;
  for (let i = ranges[0]; i <= ranges[1]; i++) {
    if (
      noThreeDigitsSame(i) &&
      part1.ascendingDigits(i)
    ) {
      matches++;
    }
  }

  return matches;
}
