'use strict';

const _ = require('lodash');

const getFullestBankIndex = (banks) => {
  let maxCount = -1;
  let maxIndex = -1;

  for(let i = 0; i < banks.length; i++) {
    if (banks[i] > maxCount) {
      maxIndex = i;
      maxCount = banks[i];
    }
  }

  return maxIndex;
};

const getNextIndex = (banks, currentIndex) => {
  if (currentIndex == banks.length - 1) {
    return 0;
  } else {
    return currentIndex + 1;
  }
};

// 1086
module.exports = (input) => {
  let inputStr = input[0].replace(/\s/g, " ");
  let banks = _.map(inputStr.split(' '), (numberStr) => {
    return Number(numberStr);
  });

  let stateMap = {};
  let isInfiniteLoop = false;
  let redistributionCycles = 0;

  while (!isInfiniteLoop) {
    // get the fullest bank index
    let currentBankIndex = getFullestBankIndex(banks);

    // redistribute blocks
    let numBlocks = banks[currentBankIndex];
    banks[currentBankIndex] = 0;
    while (numBlocks > 0) {
      currentBankIndex = getNextIndex(banks, currentBankIndex);
      banks[currentBankIndex]++;
      numBlocks--;
    }

    // increment redistribution cycles count
    redistributionCycles++;

    // get our current state
    let currentState = _.reduce(banks, (memo, bank) => {
      return memo + ',' + bank;
    }, '');

    // check and set our state
    if (!_.isUndefined(stateMap[currentState])) {
      isInfiniteLoop = true;
      return redistributionCycles - stateMap[currentState];
    } else {
      stateMap[currentState] = redistributionCycles;
    }
  }

  return redistributionCycles;
};
