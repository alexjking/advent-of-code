'use strict';

module.exports =  input => {
  const num = Array(10000).fill(input[0]).join('');

  // first calculate the offset
  const offset = Number(input[0].slice(0, 7));

  // get range
  let arr = num.slice(offset, num.length).split('').map(Number);

  for (let phase = 0; phase < 100; phase++) {
    let sum = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
      sum = sum + arr[i];
      arr[i] = sum % 10;
    }
  }

  return arr.slice(0, 8).join('');
}
