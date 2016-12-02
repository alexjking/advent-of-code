'use strict';

const NumberPad = require('./NumberPad');

module.exports = (inputArr) => {

  // setup the number pad class
  var padArray = [];
  padArray.push([null, null, 1, null, null]);
  padArray.push([null, 2, 3, 4, null]);
  padArray.push([5, 6, 7, 8, 9]);
  padArray.push([null, 'A', 'B', 'C', null]);
  padArray.push([null, null, 'D', null, null]);
  var numberPad = new NumberPad(padArray, {x: 1, y: 1});

  var answer = '';

  // loop through each input moving our position and recording the number at the end of each line
  inputArr.forEach((line) => {
    for (let ch of line) {
      numberPad.move(ch);
    }

    answer += numberPad.getCurrentNumber();
  });

  return answer;
}