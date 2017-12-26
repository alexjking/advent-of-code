'use strict';

const Program = class {
  constructor(instructions) {
    this.instructions = instructions;
    this.register = {};
    this.pos = 0;

    this.mulInvocations = 0;
  }

  val(y) {
    if (isNaN(y)) {
      return this.register[y] || 0;
    } else {
      return Number(y);
    }
  }
  set(x, y) { this.register[x] = this.val(y); }
  sub(x, y) { this.register[x] -= this.val(y); }
  mul(x, y) {
    this.register[x] *= this.val(y);
    this.mulInvocations++;
  }
  jnz(x, y) {
    if (this.val(x) !== 0) {
      this.pos += this.val(y) - 1;
    }
  }

  isValidInstruction() {
    return this.pos >= 0 && this.pos < this.instructions.length;
  }

  run() {
    let instr = this.instructions[this.pos].split(' ');
    this[instr[0]](instr[1], instr[2]);
    this.pos++;
  }
};

module.exports = (input) => {
  let p = new Program(input);

  while (p.isValidInstruction()) {
    p.run();
  }

  return p.mulInvocations;
};
