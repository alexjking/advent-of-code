'use strict';

const Program = class {
  constructor(instructions) {
    this.instructions = instructions;
    this.register = {};
    this.lastSound = null;
    this.pos = 0;
    this.receivedSound = null;
  }

  val(y) {
    if (isNaN(y)) {
      return this.register[y] || 0;
    } else {
      return Number(y);
    }
  }
  snd(x) { this.lastSound = this.val(x); }
  set(x, y) { this.register[x] = this.val(y); }
  add(x, y) { this.register[x] += this.val(y); }
  mul(x, y) { this.register[x] *= this.val(y); }
  mod(x, y) { this.register[x] %= this.val(y); }
  rcv(x, y) {
    if (this.val(x) !== 0) {
      console.log('rcv', this.lastSound);
      this.receivedSound = this.lastSound;
    }
  }
  jgz(x, y) {
    if (this.val(x) > 0) {
      this.pos += this.val(y) - 1;
    }
  }

  run() {
    while (this.pos >= 0 && this.pos < this.instructions.length && this.receivedSound === null) {
      let instr = this.instructions[this.pos].split(' ');
      this[instr[0]](instr[1], instr[2]);
      this.pos++;
    }

    return this.receivedSound;
  }
};

module.exports = (input) => {
  let p1 = new Program(input);
  return p1.run();
};
