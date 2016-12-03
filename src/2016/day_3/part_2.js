'use strict';

const TriangleValidator = require('./TriangleValidator');

module.exports = (input) => {

  // find the number of columns
  var numCols = input[0].length;
  var numRows = input.length;

  // convert into array of arrays
  input = input.map((row) => {
    row = row.replace(/\s+/g,' ').trim();
    return row.split(' ').map(function(item) {
      return parseInt(item, 10);
    });
  });



  var validTriangles = 0;

  for (var currentCol = 0; currentCol < numCols; currentCol++) {
    for (var currentRow = 0; currentRow < numRows; currentRow += 3) {
      var sides = [];
      sides.push(input[currentRow][currentCol]);
      sides.push(input[currentRow + 1][currentCol]);
      sides.push(input[currentRow + 2][currentCol]);

      var validator = new TriangleValidator(sides);

      if (validator.isValidTriandle()) {
        validTriangles++;
      }
    }
  }

  return validTriangles; // 1577
}
