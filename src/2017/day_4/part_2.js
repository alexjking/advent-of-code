'use strict';

const _ = require('lodash');

const getKey = function(word) {
  return _(word)
    .split('')
    .sortBy()
    .join('');
}

const isValid = function(passphrase) {
  let words = passphrase.split(' ');

  let usedWords = {};

  for (let i = 0; i < words.length; i++) {
    const key = getKey(words[i]);

    if (_.isUndefined(usedWords[key])) {
      usedWords[key] = true;
    } else {
      return false;
    }
  }

  return true;
};

// 208
module.exports = (input) => {
  return _.reduce(input, (memo, passphrase) => {
    if (isValid(passphrase)) {
      memo++;
    }

    return memo;
  }, 0);
};
