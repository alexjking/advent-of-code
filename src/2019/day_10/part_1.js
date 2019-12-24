'use strict';

function convertInputToAsteroids(input) {
  return input.reduce((acc, row, yIndex) => {
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
}

function findLinesToOtherAsteroids(asteroids) {
  return asteroids.map(currentAsteroid => {
    const otherAsteroidLines = asteroids
      .filter(asteroid => asteroid !== currentAsteroid)
      .map(otherAsteroid => {
        const yDiff = currentAsteroid.y - otherAsteroid.y;
        const xDiff = otherAsteroid.x - currentAsteroid.x;
        const m = yDiff / xDiff;
        const c = currentAsteroid.y - (m * currentAsteroid.x);
        const distance = Math.sqrt(Math.pow(yDiff, 2) + Math.pow(xDiff, 2));
        return {
          otherAsteroid,
          m,
          c,
          yDiff,
          xDiff,
          distance,
        };
      });

    return {
      asteroid: currentAsteroid,
      lines: otherAsteroidLines,
    };
  });
}

// 299
module.exports = input => {
  // convert input into coords.
  const asteroids = convertInputToAsteroids(input);

  const asteroidsToOtherAsteroids = findLinesToOtherAsteroids(asteroids);

  const asteroidsDetected = asteroidsToOtherAsteroids.map(currentAsteroidObj => {
    let uniqueLines = new Set();

    currentAsteroidObj.lines.forEach(otherAsteroid => {
      if (otherAsteroid.m === Infinity) {
        uniqueLines.add(`x = ${currentAsteroidObj.asteroid.x} xDiff=${Math.sign(otherAsteroid.xDiff)} yDiff=${Math.sign(otherAsteroid.yDiff)}`);
      } else {
        const c = currentAsteroidObj.asteroid.y - (currentAsteroidObj.asteroid.m * currentAsteroidObj.asteroid.x);
        uniqueLines.add(`y = ${String(otherAsteroid.m)}x + ${String(otherAsteroid.c)} xDiff=${Math.sign(otherAsteroid.xDiff)} yDiff=${Math.sign(otherAsteroid.yDiff)}`);
      }
    });

    return {
      asteroid: currentAsteroidObj.asteroid,
      directHits: uniqueLines.size,
      lines: currentAsteroidObj.lines
    };
  });

  // find the highest number of asteroids detected
  return asteroidsDetected.reduce((max, val) => {
    if (max.directHits > val.directHits) {
      return max;
    } else {
      return val;
    }
  }, {
    asteroid: null,
    directHits: -1,
    lines: null,
  });
}
