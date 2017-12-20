'use strict';

module.exports = class Particle {
  constructor(id, inputStr) {
    this.id = id;
    this.destroyed = false;

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
    // adjust velocty
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.z += this.acceleration.z;

    // move position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }

  getSerializedPosition() {
    return [this.position.x, this.position.y, this.position.z].join(',');
  }
}