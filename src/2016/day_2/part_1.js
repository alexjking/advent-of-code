'use strict';

const NumberPad = require('./NumberPad');

module.exports = (inputArr) => {

  // setup the number pad class
  var padArray = [];
  padArray.push([1, 2, 3]);
  padArray.push([4, 5, 6]);
  padArray.push([7, 8, 9]);
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