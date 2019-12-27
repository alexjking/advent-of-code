'use strict';

function getPattern(basePattern, index) {
  return basePattern.reduce((acc, el) => {
    return acc.concat(Array(index + 1).fill(el));
  }, []);
}

// 67481260
module.exports = input => {
  let signal = input[0].split('').map(Number);
  const basePattern = [0, 1, 0, -1];

  let t = 0;
  while (t < 100) {
    const result = [];
    for (let outputIndex = 0; outputIndex < signal.length; outputIndex++) {
      const pattern = getPattern(basePattern, outputIndex);
      const localResult = signal
        .map((el, index) => el * pattern[(index + 1) % pattern.length])
        .reduce((acc, el) => acc + el);
      result.push(Math.abs(localResult) % 10);
    }

    signal = result;
    t++;
  }

  return signal.join('');
}
