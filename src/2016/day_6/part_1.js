'use strict';

module.exports = (input) => {
  // we need to find the most common character for each position

  var letterOccurrences = [];
  for (var i = 0; i < input[0].length; i++) {
    letterOccurrences.push({});
  }

  // loop through each word finding the occurrences of letters at each point
  input.forEach((word) => {
    for (var i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      if (!letterOccurrences[i][char]) {
        letterOccurrences[i][char] = 1;
      } else {
        letterOccurrences[i][char]++;
      }
    }
  });

  // now reduce this to a string by finding the key with greatest value for each letter
  return letterOccurrences.reduce((message, occurrences) => {
    const letter = Object.keys(occurrences).reduce(function(a, b){
      return occurrences[a] > occurrences[b] ? a : b;
    });

    return message + letter;
  }, '');

  // answer is: kjxfwkdh
}
