'use strict';

const Particle = require('./Particle');

module.exports = (input) => {
  // setup particles
  let particles = input.map((str, index) => {
    return new Particle(index, str);
  });

  for (let simulation = 0; simulation < 500; simulation++) {
    // move every particle
    particles.forEach(p => {
      p.move();
    });

    // see if there are any collisions
    let collisions = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = 1; j < particles.length; j++) {
        if (i === j) continue;
        const a = particles[i];
        const b = particles[j];

        if (a.position.x === b.position.x && a.position.y === b.position.y && a.position.z === b.position.z) {
          collisions = collisions.concat(i, j);
        }
      }
    }

    // remove particles that collided
    let newParticles = [];
    for (let i = 0; i < particles.length; i++) {
      if (!collisions.includes(i)) {
        newParticles.push(particles[i]);
      }
    }

    particles = newParticles;
  }

  // return total number of particles
  return particles.length;
};
