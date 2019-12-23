'use strict';

const Computer = require('../Computer');

// 19581200
module.exports = input => {
  let max = 0;
  for (let a = 5; a < 10; a++) {
    for (let b = 5; b < 10; b++) {
      for (let c = 5; c < 10; c++) {
        for (let d = 5; d < 10; d++) {
          for (let e = 5; e < 10; e++) {
            if (
              (a === b || a === c || a === d || a === e) ||
              (b === c || b === d || b === e) ||
              (c === d || c === e) ||
              (d === e)
            ) {
              continue;
            }

            const phase = [a,b,c,d,e];

            const amplifiers = [
              new Computer(input[0].split(',')),
              new Computer(input[0].split(',')),
              new Computer(input[0].split(',')),
              new Computer(input[0].split(',')),
              new Computer(input[0].split(',')),
            ];

            // store the inputs here
            const inputs = [
              [a, 0],
              [b],
              [c],
              [d],
              [e],
            ];

            let amplifierIndex = 0;
            let running = true;
            let lastResult = -1;
            while (1) {
              // run the current amplifier with the available inputs
              const result = amplifiers[amplifierIndex].run(inputs[amplifierIndex]);

              // clear inputs now that we've used them
              inputs[amplifierIndex] = [];

              // break with the result if E is ending
              if (amplifierIndex === 4 && amplifiers[amplifierIndex].hasEnded()) {
                lastResult = result[0];
                break;
              }

              // update next index, and add results as input for next index
              amplifierIndex = (amplifierIndex + 1) % 5;
              inputs[amplifierIndex] = inputs[amplifierIndex].concat(result);
            }

            // record the max output seen so far
            max = Math.max(max, lastResult);
          }
        }
      }
    }
  }

  return max;
};
