'use strict';


const part1 = require('./part_1');

// 1419
module.exports = input => {

  // find the optimal asteroid for the laser
  const result = part1(input);

  function getQuadrantValue(line) {
    if (line.xDiff >= 0 && line.yDiff >= 0) {
      return 0;
    } else if (line.xDiff >= 0 && line.yDiff < 0) {
      return 1;
    } else if (line.xDiff < 0 && line.yDiff < 0) {
      return 2;
    } else {
      return 3;
    }
  }

  function angleComparator(a, b) {
    if (a.xDiff >= 0 && a.yDiff >= 0) {
      return b.m - a.m;
    } else if (a.xDiff >= 0 && a.yDiff < 0) {
      return Math.abs(a.m) - Math.abs(b.m);
    } else if (a.xDiff < 0 && a.yDiff < 0) {
      return Math.abs(b.m) - Math.abs(a.m);
    } else {
      return Math.abs(a.m) - Math.abs(b.m);
    }
  }

  // sort the asteroid lines from laser, in clockwise order
  const sortedAsteroidLines = result.lines.sort((a, b) => {
    // sort by quadrant
    const quadrantSort = getQuadrantValue(a) - getQuadrantValue(b);
    if (quadrantSort !== 0) {
      return quadrantSort;
    }

    // sort by angle
    const angleCompared = angleComparator(a, b);
    if (angleCompared !== 0) {
      return angleCompared;
    }

    // now we need to sort those that have the same angle
    return a.distance - b.distance;
  });

  // loop through the sorted asteroids, taking into account that we can only
  // destroy one asteroid in a line at a time
  let i = 0; // index
  let lastM = -999999;
  let j = 1; // result number
  while (sortedAsteroidLines.length !== 0) {
    // if this asteroid has same angle as last, then this means we should move
    // on since we cannot hit this until we spin around to the next times
    if (sortedAsteroidLines[i].m === lastM) {
      i = (i + 1) % sortedAsteroidLines.length;
      continue;
    }

    // remove the asteroid since it is destroyed
    const next = sortedAsteroidLines.splice(i, 1);
    lastM = next[0].m;

    if (j === 200) {
      return next[0].otherAsteroid;
    }

    j++
  }
};
