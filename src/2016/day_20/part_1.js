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

  // Loop through the black list, comparing the bounds until we find an element
  // where its lower bound is greater than the maximum upper bound occurred so far
  // The lowest value in the first one of these segments is the lowest valued IP that
  // that is not blocked. (Part 1)
  // We continue looping until we reach the end summing up the total number of IP addresses.
  let i = 0;
  let maxUpper = blackList[i].upper;
  let validIPAddresses = 0;
  while (i < blackList.length) {
    if (blackList[i].lower > maxUpper + 1) {
      // print out part 1 answer when necessary
      if (validIPAddresses === 0) {
        console.log('Part 1: ', maxUpper + 1); // Part 1 answer: 4793564
      }

      // add the range to valid IP addresses for part 2
      validIPAddresses +=  blackList[i].lower - (maxUpper + 1);
    }

    // update the max upper and increment our counter
    maxUpper = Math.max(maxUpper, blackList[i].upper)
    i++;

    // break early if the upper bound hits the max int
    if (maxUpper >= 4294967295) {
      break;
    }
  }

  // add any remaining ipaddresses left at the end
  if (maxUpper < 4294967295) {
    validIPAddresses += 4294967295 - (maxUpper);
  }

  console.log('Part 2: ', validIPAddresses);
  return validIPAddresses; // Part 2: 146
}
