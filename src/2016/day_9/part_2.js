'use strict';

/**
 * Recursive function to get the length of a string.
 * We do not copy the string, we just pass indexes around to minimise the memory footprint.
 */
function getLength(input, startIndex, endIndex) {
  if (!input || input.length === 0 || startIndex > endIndex) {
    return 0;
  }

  let count = 0;
  let i = startIndex;

  while (i < endIndex) {
    const char = input.charAt(i);

    // if the char is an empty string, just continue
    if (char === ' ') {
      i++;
      continue;
    }

    // if the current char is a paranthesis, we need to parse this as a whole string and recurse
    // we firstly find the marker information.
    // once we have found the marker information, we can recurse on the part of the string that we need
    // and multiple the length of that string by the times we need to repeat it
    if (char === '(') {
      // progress the pointer to find the whole marker.
      let marker = '';
      i++;

      while (input.charAt(i) !== ')') {
        marker += input.charAt(i);
        i++;
      }

      // parse the marker information
      let markerArr = marker.split('x');
      let charsToRepeat = markerArr[0] * 1;
      let repetitions = markerArr[1] * 1;

      // now find the length of this section
      i++; //move into start of marked area
      count += repetitions * getLength(input, i, i + charsToRepeat);

      // now move i into the next section past this past marked area
      i += charsToRepeat;

      // now continue with the loop
      continue;
    }

    // this is not an empty space, or a marked area so just increment by 1
    count++;
    i++;
  }

  return count;
}


module.exports = (input) => {
  const sequence = input[0];

  return getLength(sequence, 0, sequence.length); // 11052855125
}
