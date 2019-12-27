'use strict';


const Computer = require('../computer');

// 952010
module.exports = input => {

  const memory = input[0].split(',');
  memory[0] = 2;

  // cheated and calculated this by hand
  // R10,U12,R6,D10,R12,D6,L6,U10,R12,D6,L10,D12,R12,D6,L10,U12,R6,D10,R12,U12,R6,D10,L12,U6,R10,U12,L12,U6,R10,D12,L6,U10,L12,U6
  //
  // R10,L12,R6,R10,L12,R6,R6,R10,R12,R6,R10,L12,L12,R6,R10,R12,R6,R10,L12,L12,R6,R10,R12,R6,R10,L12,L12,R6,R10,R12,R6,R10,L12,R6

  function convertToAscii(arr) {
    return arr
      .split('')
      .map(el => {
        return el.charCodeAt();
      });;
  }

  const routine = convertToAscii('A,A,B,C,B,C,B,C,B,A\n');
  const a = convertToAscii('R,10,L,12,R,6\n');
  const b = convertToAscii('R,6,R,10,R,12,R,6\n');
  const c = convertToAscii('R,10,L,12,L,12\n');

  const video = convertToAscii('n\n');

  const alex = routine.concat(a).concat(b).concat(c).concat(video);
  const computer = new Computer(memory);
  const output = computer.run(alex);

  function convertFromAscii(arr) {
    return arr.map(el => {
      return String.fromCharCode(el);
    })
    .join('');
  }

  console.log('output', convertFromAscii(output));
  console.log('ended', computer.hasEnded());

  return output.splice(output.lastIndexOf('10'), output.length);
}
