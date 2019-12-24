'use strict';

// 299
module.exports = input => {
  // convert input into coords.
  const asteroids = input.reduce((acc, row, yIndex) => {
    if (row === '') {
      return acc;
    }

    const rowCoords = row.split('').reduce((innerAcc, entry, xIndex) => {
      if (entry === '.') {
        return innerAcc;
      }

      innerAcc.push({
        x: xIndex,
        y: yIndex,
      });

      return innerAcc;
    }, []);

    return acc.concat(rowCoords);
  }, []);

  // find the number of asteroids detected from each asteroid
  const asteroidsDetected = asteroids.map(currentAsteroid => {
    let lines = new Set();

    asteroids.forEach(otherAsteroid => {
      if (otherAsteroid === currentAsteroid) {
        return;
      }

      // find line coeff, add to the lines set
      const yDiff = currentAsteroid.y - otherAsteroid.y;
      const xDiff = currentAsteroid.x - otherAsteroid.x;
      const m = yDiff / xDiff;

      // add the line coeff to the set (including the ydiff/xdiff to
      // differentiate asteroids on the same line but different sides)
      if (m === Infinity) {
        lines.add(`x = ${currentAsteroid.x} xDiff=${Math.sign(xDiff)} yDiff=${Math.sign(yDiff)}`);
      } else {
        const c = currentAsteroid.y - (m * currentAsteroid.x);
        lines.add(`y = ${String(m)}x + ${String(c)} xDiff=${Math.sign(xDiff)} yDiff=${Math.sign(yDiff)}`);
      }
    });

    return lines.size;
  });

  // find the highest number of asteroids detected
  return asteroidsDetected.reduce((max, val) => {
    return Math.max(max, val);
  }, -1);
}
