'use strict';

class Moon {
  constructor(rawInput) {
    this.position = rawInput
      .slice(1, rawInput.length - 1)
      .split(',')
      .reduce((acc, temp) => {
        const [key, value] = temp.split('=');
        return {
          ...acc,
          [key.trim()]: Number(value),
        };
      }, {});

    this.velocity = {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  applyGravity(otherMoon) {
    if (otherMoon.position.x > this.position.x) {
      this.velocity.x++;
    } else if (otherMoon.position.x < this.position.x) {
      this.velocity.x--;
    }

    if (otherMoon.position.y > this.position.y) {
      this.velocity.y++;
    } else if (otherMoon.position.y < this.position.y) {
      this.velocity.y--;
    }

    if (otherMoon.position.z > this.position.z) {
      this.velocity.z++;
    } else if (otherMoon.position.z < this.position.z) {
      this.velocity.z--;
    }
  }

  applyVelocity() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }

  getPotentialEnergy() {
    const {x, y, z} = this.position;
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
  }

  getKineticEnergy() {
    const {x, y, z} = this.velocity;
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
  }

  getTotalEnergy() {
    return this.getPotentialEnergy() * this.getKineticEnergy();
  }
}

// 7697
module.exports = input => {
  let moons = input
    .filter(data => data !== '')
    .map(data => new Moon(data));

  for (let time = 0; time < 1000; time++) {
    moons.forEach(moon => {
      moons
        .filter(otherMoon => otherMoon != moon)
        .forEach(otherMoon => {
          moon.applyGravity(otherMoon);
        });
    });

    moons.forEach(moon => {
      moon.applyVelocity();
    });
  }

  return moons
    .map(moon => moon.getTotalEnergy())
    .reduce((acc, energy) => acc + energy);
}
