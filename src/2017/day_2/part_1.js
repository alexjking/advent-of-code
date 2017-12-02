'use strict';

const _ = require('lodash');

module.exports = (input) => {
  return _.reduce(input, (memo, row) => {
    let nums = _(row)
      .split(' ')
      .map((num) => {
        return Number(num);
      })
      .value();

    let min = _.min(nums);
    let max = _.max(nums);

    return memo + (max - min);
  }, 0);
};
