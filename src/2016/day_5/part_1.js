'use strict';

const md5 = require('md5');

module.exports = (input) => {
  const doorCode = input[0];

  var i = 0;
  var password = '';

  while (password.length < 8) {
    var md5Hash = md5(doorCode + i);

    if (md5Hash.startsWith('00000')) {
      password += md5Hash.charAt(5);
      console.log(password);
    }
    ++i;
  }

  return password; // f97c354d
}
