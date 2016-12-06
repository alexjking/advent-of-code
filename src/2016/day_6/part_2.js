'use strict';

// we need to find the least common character for each position
// this solution is almost exactly the same as the solution for part 1
// the only change we had to make was comparing the key values when sorting them (< instead of >);
module.exports = (input) => {

  // create an array of objects which we can use for storing character occurrences
  // for each letter. A glorified hashmap sort of thing.
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

  // now reduce this to a string by finding the key with smallest value for each letter
  return letterOccurrences.reduce((message, occurrences) => {
    const letter = Object.keys(occurrences).reduce(function(a, b){
      return occurrences[a] < occurrences[b] ? a : b;
    });

    return message + letter;
  }, '');

  // answer is: xrwcsnps
}
