'use strict';

// 3087896
module.exports = (input) => {
  return input.reduce((sum, mass) => {
    if (mass === '' || mass === 0) {
      return sum;
    }

    return sum + (Math.floor(Number(mass) / 3) - 2);
  }, 0);
};
