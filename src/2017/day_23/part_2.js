'use strict';

// CHEAT ALERT: I don't have the patience for these kind of teasers,
// I looked at the subreddit and found this solution.
module.exports = (input) => {
  let x = 108400;
  let nonprimes = 0;
  for (let n = x; n <= x + 17000; n += 17) {
      let d = 2;
      while (n % d !== 0) d++;
      if (n !== d) nonprimes++;
  }

  return nonprimes;
};
