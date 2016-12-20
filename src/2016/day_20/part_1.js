'use strict';

module.exports = (input) => {
  // lets map the input into objects
  let blackList = input.map(line => {
    let arr = line.split('-');
    return {
      lower: arr[0] * 1,
      upper: arr[1] * 1,
    };
  });

  // sort by lower order
  blackList.sort((a, b) => {
    return a.lower - b.lower;
  });

  // loop through the black list, comparing the bounds until we find an element
  // where its lower bound is greater than the maximum upper bound occurred so far
  // the lowest value in this segment is the lowest-valued IP that is not blocked
  let i = 0;
  let maxUpper = blackList[i].upper;
  while (i < blackList.length) {
    if (blackList[i].lower > maxUpper + 1) {
      return maxUpper + 1;  // Part 1 answer: 4793564
    }

    // update the max upper and increment our counter
    maxUpper = Math.max(maxUpper, blackList[i].upper)
    i++;
  }

  return null;
}
