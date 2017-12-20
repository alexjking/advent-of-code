'use strict';

class Particle {
  constructor(id, inputStr) {
    this.id = id;

    [this.position, this.velocity, this.acceleration] = inputStr.split(' ').map((str) => {
      let parsedString = str.substring(3, str.lastIndexOf('>'));

      let coordinates = parsedString.split(',');

      return {
        x: Number(coordinates[0]),
        y: Number(coordinates[1]),
        z: Number(coordinates[2]),
      };
    });
  }

  getDistanceFromOrigin() {
    return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
  }

  move() {
    // move position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;

    // adjust velocty
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.z += this.acceleration.z;
  }
}

module.exports = (input) => {
  // setup particles
  let particles = input.map((str, index) => {
    return new Particle(index, str);
  });

  // simulate 10,000 movements to find the long term positions
  for (let i = 0; i < 10000; i++) {
    particles.forEach((particle) => {
      particle.move();
    });
  }

  // find particle with smallest manhattan distance
  let closestParticle = particles.reduce((memo, particle) => {
    let distance = particle.getDistanceFromOrigin();

    if (distance < memo.distance) {
      memo.distance = distance;
      memo.particle = particle;
    }

    return memo;
  }, {
    distance: Infinity,
    particule: null,
  });

  return closestParticle.particle.id;
};