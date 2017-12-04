'use strict';

const _ = require('lodash');

const isValid = function(passphrase) {
  let words = passphrase.split(' ');

  let usedWords = {};

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    if (_.isUndefined(usedWords[word])) {
      usedWords[word] = true;
    } else {
      return false;
    }
  }

  return true;
};

// 386
module.exports = (input) => {
  return _.reduce(input, (memo, passphrase) => {
    if (isValid(passphrase)) {
      memo++;
    }

    return memo;
  }, 0);
};
