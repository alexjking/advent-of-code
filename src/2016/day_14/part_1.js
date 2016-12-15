'use strict';

const Key = require('./key');
const ADDITIONAL_HASH = 2016; // part 1: 0. part 2: 2016
module.exports = (input) => {
  let salt = input[0];

  let keyIndexes = [];
  let index = 0;

  // store the current potential keys and their invali
  let potentialKeys = [];

  while (keyIndexes.length < 64) {

    if (index % 500 === 0) {
      console.log(index);
    }
    // generate the current key
    let key = new Key(salt, index, ADDITIONAL_HASH);

    // check if the current hash validates a previously found key
    let j = 0;
    while (j < potentialKeys.length) {
      if (key.containsFiveOfAKind(potentialKeys[j].char)) {
        console.log('found hash', index, (potentialKeys[j].expiration - 1000))
        keyIndexes.push(potentialKeys[j].expiration - 1000);
        potentialKeys.splice(j, 1);
      } else {
        j++
      }
    }

    // now check if we need to expire the oldest key
    if (potentialKeys.length && potentialKeys[0].expiration === index) {
      potentialKeys.shift();
    }

    // now lets check if the current key is a potential key
    let tripletChar = key.getFirstTriplet();
    if (tripletChar !== null) {
      potentialKeys.push({
        expiration: index + 1000,
        char: tripletChar,
      });
    }

    index++;
  }

  // we do not necessarily get the keys in order
  // we actually get the keys in order of when we find their
  // matching validation key (quintuplet), so sort the key indexes here.
  // to find the last triplet.
  keyIndexes.sort((a,b)=> {
    return (a*1) - (b*1);
  });

  // print out keys
  // for (let i = 0; i < keyIndexes.length; i++) {
  //   console.log("Key " + (i+1) + " found at : " + keyIndexes[i]);
  // }

  return keyIndexes[63]; // part 1: 15035; part 2: 19968
}
