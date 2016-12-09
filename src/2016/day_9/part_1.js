'use strict';

module.exports = (input) => {
  const sequence = input[0];
  let count = 0;

  let i = 0;
  while (i < sequence.length) {
    const char = sequence.charAt(i);

    // this means we are about to enter a marker
    // lets parse the marker, update our count and continue;
    if (char === '(') {
      let marker = '';
      i++;

      while (sequence.charAt(i) !== ')') {
        marker += sequence.charAt(i);
        i++;
      }

      // parse the marker information from the characters
      let markerArr = marker.split('x');
      let charsToRepeat = markerArr[0] * 1;
      let repetitions = markerArr[1] * 1;

      // count the number of total characters from this repetition
      // and update the counter to point at the end of the repetition sequence
      count += charsToRepeat * repetitions;
      i += charsToRepeat;
    } else if (char !== '') {
      // if this is just a normal character, increment counter and continue
      count++;
    }

    i++;
  }

  return count; // 150914
}
