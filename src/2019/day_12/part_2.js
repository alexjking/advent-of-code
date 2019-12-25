'use strict';

const {Moon} = require('./part_1');

function findFirstTimeAxisRepeat(input, axis) {
  function toStr(moons) {
    return moons.reduce((acc, moon) => {
      return acc + `|${moon.position[axis]},${moon.velocity[axis]}`;
    }, '');
  }

  let moons = input
    .filter(data => data !== '')
    .map(data => new Moon(data));

  const moonState = toStr(moons);

  let time = 1;
  while(1) {
    // apply gravity
    moons.forEach(moon => {
      moons.forEach(otherMoon => {
        if (otherMoon !== moon) {
          moon.applyGravity(otherMoon);
        }
      });
    });

    // apply velocity
    moons.forEach(moon => {
      moon.applyVelocity();
    });

    // return if the axis has reached a turning point (velocity === 0)
    const everyVelocityZero = moons.every(moon => moon.velocity[axis] === 0);
    if (everyVelocityZero && toStr(moons) === moonState) {
      return time;
    }

    time++;
  }

  return null;
}


module.exports = input => {
  const x = findFirstTimeAxisRepeat(input, 'x');
  const y = findFirstTimeAxisRepeat(input, 'y');
  const z = findFirstTimeAxisRepeat(input, 'z');

  // find LCM (use google) of these three numbers for result.
  return [x, y, z];
}
