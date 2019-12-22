'use strict';

const Computer = require('../computer');

// 46014
module.exports = input => {
  let max = 0;
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      for (let c = 0; c < 5; c++) {
        for (let d = 0; d < 5; d++) {
          for (let e = 0; e < 5; e++) {
            if (
              (a === b || a === c || a === d || a === e) ||
              (b === c || b === d || b === e) ||
              (c === d || c === e) ||
              (d === e)
            ) {
              continue;
            }

            // otherwise let's check this combo
            const phase = [a,b,c,d,e];
            let lastOutput = 0;
            for (let i = 0; i < 5; i++) {
              const memory = input[0].split(',');

              const comp = new Computer(memory);
              const result =  comp.run([phase[i], lastOutput]);
              lastOutput = Number(result[0]);
            }

            // record the max output seen so far
            max = Math.max(max, lastOutput);
          }
        }
      }
    }
  }

  return max;
};
