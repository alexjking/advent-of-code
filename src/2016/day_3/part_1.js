'use strict';

const TriangleValidator = require('./TriangleValidator');

module.exports = (input) => {

  var validTriangleCount = 0;

  input.forEach((line) => {

    line = line.replace(/\s+/g,' ').trim();

    var validator = new TriangleValidator(line);

    if (validator.isValidTriandle()) {
      validTriangleCount++;
    }
  });

  return validTriangleCount; // 862
}
