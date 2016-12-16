'use strict';

function reverse(str) {
  return str.split('').reverse().join('');
}

function flipBits(str) {
  return str.split('').map(char => char === '0' ? '1' : '0').join('');
}

function generateRandomData(str, diskLength) {
  while (str.length < diskLength) {
    let b = flipBits(reverse(str));
    str = str + '0' + b;
  }

  return str;
}

function getCheckSum(str) {
  let checkSum = '';

  for (let i = 0; i < str.length; i += 2) {
    if (str.charAt(i) === str.charAt(i + 1)) {
      checkSum += '1';
    } else {
      checkSum += '0';
    }
  }

  return checkSum;
}


module.exports = (input) => {
  const diskLength = 272;
  let randomData = generateRandomData(input[0], diskLength);

  let checkSum = getCheckSum(randomData.substring(0, diskLength));

  // keep recalculating checksum until its length is odd
  while ((checkSum.length % 2) === 0) {
    checkSum = getCheckSum(checkSum);
  }

  return checkSum; // part 1: 01110011101111011
}