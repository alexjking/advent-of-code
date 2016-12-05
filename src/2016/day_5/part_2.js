'use strict';

const md5 = require('md5');

module.exports = (input) => {
  const doorCode = input[0];

  var i = 0;

  var foundLetters = 0;
  var password = Array(8);

  while (foundLetters < 8) {
    var md5Hash = md5(doorCode + i);

    if (md5Hash.startsWith('00000')) {
      const pos = md5Hash.charAt(5) * 1;

      if (pos >= 0 && pos < 8 && password[pos] === undefined) {
        password[pos] = md5Hash.charAt(6);
        foundLetters++;
        console.log(password);
      }
    }

    ++i;
  }

  return password.join(''); //863dde27
}