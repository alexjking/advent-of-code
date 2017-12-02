'use strict';

const _ = require('lodash');


const getEvenDivide = function(nums) {
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let max = Math.max(nums[i], nums[j]);
      let min = Math.min(nums[i], nums[j]);

      if (max % min === 0) {
        return max / min;
      }
    }
  }

  console.error('even divide not found');
  return 0;
}

module.exports = (input) => {
  return _.reduce(input, (memo, row) => {
    let nums = _(row)
      .split(' ')
      .map((num) => {
        return Number(num);
      })
      .value();

    let evenDivide = getEvenDivide(nums)

    return memo + evenDivide;
  }, 0);
};
