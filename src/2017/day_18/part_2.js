'use strict';

const Program = class {
  constructor(instructions, pid) {
    this.pid = pid;
    this.instructions = instructions;
    this.register = {
      p: this.pid,
    };
    this.pos = 0;

    this.queue = [];
    this.otherProgram = null;
    this.isWaiting = false;
    this.sendCount = 0;
  }

  val(y) {
    if (isNaN(y)) {
      return this.register[y] || 0;
    } else {
      return Number(y);
    }
  }
  snd(x) {
    this.otherProgram.queue.unshift(this.val(x));
    this.sendCount++;
  }
  set(x, y) { this.register[x] = this.val(y); }
  add(x, y) { this.register[x] += this.val(y); }
  mul(x, y) { this.register[x] *= this.val(y); }
  mod(x, y) { this.register[x] %= this.val(y); }
  rcv(x) {
    if (this.queue.length > 0) {
      this.register[x] = this.queue.pop();
    } else {
      this.isWaiting = true;
      this.pos --;
    }
  }
  jgz(x, y) {
    if (this.val(x) > 0) {
      this.pos += this.val(y) - 1;
    }
  }

  run() {
    this.isWaiting = false;
    let instr = this.instructions[this.pos].split(' ');
    this[instr[0]](instr[1], instr[2]);
    this.pos++;
  }
};

module.exports = (input) => {
  let p0 = new Program(input, 0);
  let p1 = new Program(input, 1);

  p0.otherProgram = p1;
  p1.otherProgram = p0;

  while (!(p0.isWaiting && p1.isWaiting)) {
    p0.run();
    p1.run();
  }

  return p1.sendCount;
};
