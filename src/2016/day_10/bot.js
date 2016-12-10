'use strict';

module.exports = class Bot {
  constructor(botId) {
    this.id = botId;
    this.values = [];
    this.lowInstructionQueue = [];
    this.highInstructionQueue = [];
  }

  giveValue(value) {
    this.values.push(value);
  }

  giveInstruction(isLowOutput, lowInstr, isHighOutput, highInstr) {
    this.lowInstructionQueue.push({
      isOutput: isLowOutput,
      botId: lowInstr,
    });

    this.highInstructionQueue.push({
      isOutput: isHighOutput,
      botId: highInstr,
    });
  }

  execute() {
    // pop an instruction off ech instruction queue
    let lowInstr = this.lowInstructionQueue.shift();
    let highInstr = this.highInstructionQueue.shift();

    // get the values
    lowInstr.value = this.getMinValue();
    highInstr.value = this.getMaxValue();

    // now reset the values array
    this.values = [];

    return {
      high: highInstr,
      low: lowInstr,
    };
  }

  canExecute() {
    let hasInstructions = this.lowInstructionQueue.length > 0;
    return this.values.length === 2 && hasInstructions;// && this.values[0] !== undefined && this.values[1] !== undefined;
  }

  getMinValue() {
    return Math.min(this.values[0], this.values[1]);
  }

  getMaxValue() {
    return Math.max(this.values[0], this.values[1]);
  }
}