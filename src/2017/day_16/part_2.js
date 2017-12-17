'use strict';


const danceMove = function(programsArr, danceMoves) {
  danceMoves.forEach((move, index) => {
    let instr = move.charAt(0);
    switch (instr) {
      case 's':
        let spinSize = Number(move.substr(1)) % programsArr.length;
        let removed = programsArr.splice(programsArr.length - spinSize, spinSize);
        programsArr = removed.concat(programsArr); // unshift(removed);

        break;
      case 'x':
        let [indexA, indexB] = move.substr(1).split('/');

        let indexAVal = programsArr[indexA];
        programsArr[indexA] = programsArr[indexB];
        programsArr[indexB] = indexAVal;

        break;
      case 'p':
        let [aVal, bVal] = move.substr(1).split('/');
        let temp = programsArr.join('');
        temp = temp.replace(aVal, '*');
        temp = temp.replace(bVal, aVal);
        temp = temp.replace('*', bVal);
        programsArr = temp.split('');
        break;
    }
  });

  return programsArr;
};

module.exports = (input) => {
  let danceMoves = input[0].split(',');
  let programs = 'abcdefghijklmnop';
  let programsArr = programs.split('');

  // calculate the cycle
  let cycle = 1;
  programsArr = danceMove(programsArr, danceMoves);
  while (programsArr.join('') !== programs) {
    programsArr = danceMove(programsArr, danceMoves);
    cycle++;
  }

  // find the dance position we would be at 1 billion moves
  for (let i = 0; i < 1000000000 % cycle; i++) {
    programsArr = danceMove(programsArr, danceMoves);
  }

  return programsArr.join('');
};
