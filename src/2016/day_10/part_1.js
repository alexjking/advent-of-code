'use strict';

const Bot = require('./bot');

let bots = {};
let output = {};

function getBot(botId) {
  if (bots[botId]) {
    return bots[botId];
  } else {
    bots[botId] = new Bot(botId);
    return bots[botId];
  }
}

function sendToOutput(id, value) {
  if (output[id]) {
    output[id].push(value);
  } else {
    output[id] = [value];
  }
}

module.exports = (input) => {

  for (let inputCount = 0; inputCount  < input.length; inputCount++) {
    let instruction = input[inputCount];

    // lets parse the instruction.
    const instructionArr = instruction.split(' ');

    let bot = null;

    // get the desired bot and add new instruction/value as necessary
    if (instructionArr[0] === 'bot') {
      bot = getBot(instructionArr[1]);
      bot.giveInstruction(instructionArr[5] === 'output', instructionArr[6], instructionArr[10] === 'output', instructionArr[11]);
    } else if (instructionArr[0] === 'value') {
      bot = getBot(instructionArr[5]);
      bot.giveValue(instructionArr[1]);
    }

    // check if we can execute these instructions
    let botQueue = [bot];

    while (botQueue.length > 0) {
      let currentBot = botQueue.shift();

      // if the current bot has 2 values ready to be used
      // execute the its next instruction set
      if (currentBot.canExecute()) {
        // firstly lets check to see if it is responsible for comparing
        // value-61 chips with value-17 chips
        if (currentBot.getMinValue() === 17 && currentBot.getMaxValue() === 61) {
          console.log(`Part 1 Solution: Bot ${currentBot.id} is responsible for comparing 17-61 chips.`);
          //return currentBot.id;
        }

        // if we haven't found the correct bot, continue executing
        let instructionSet = currentBot.execute();

        // execute low instruction
        if (instructionSet.low.isOutput !== true) {
          let lowBot = getBot(instructionSet.low.botId);
          lowBot.giveValue(instructionSet.low.value);
          botQueue.push(lowBot);
        } else {
          sendToOutput(instructionSet.low.botId, instructionSet.low.value);
        }

        // update the high bot
        if (instructionSet.high.isOutput !== true) {
          let highBot = getBot(instructionSet.high.botId);
          highBot.giveValue(instructionSet.high.value);
          botQueue.push(highBot);
        } else {
          sendToOutput(instructionSet.high.botId, instructionSet.high.value);
        }
      }
    }

  };


  // Part 2 solution:
  // take the first three output bins and multiply their contents.
  let tempArray = [];
  tempArray = tempArray.concat(output['0']);
  tempArray = tempArray.concat(output['1']);
  tempArray = tempArray.concat(output['2']);

  let part2Solution = tempArray.reduce((acc, value) => {
    return acc * value;
  }, 1);

  console.log(`Part 2 Solution: ${part2Solution}`);

  return part2Solution; // 3965
}
