'use strict';

const Computer = require('../computer');

function findBall(screen) {
  for (let y = 0; y < screen.length; y++) {
    for (let x = 0; x < screen[0].length; x++) {
      if (screen[y][x] === 4) {
        return x;
      }
    }
  }
}

function findPaddle(screen) {
  for (let y = 0; y < screen.length; y++) {
    for (let x = 0; x < screen[0].length; x++) {
      if (screen[y][x] === 3) {
        return x;
      }
    }
  }
}

function updateScreen(screen, output) {
  let result = 0;
  for (let i = 0; i < output.length; i += 3) {
    if (output[i] === -1 && output[i + 1] === 0) {
      result = output[i + 2];
      console.log('result', result);
    } else {
      screen[output[i + 1]][output[i]] = output[i + 2];
    }
  }

  return result;
}

function print(screen) {
  const blocks = screen.reduce((acc, row) => {
    return acc + row.reduce((acc, tile) => {
      if (tile === 2) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }, 0);

  return blocks;
}

function createScreen(output) {
  const xIndexes = output.filter((el, index) => {
    return index % 3 === 0;
  });
  const yIndexes = output.filter((el, index) => {
    return index % 3 === 1 && index != 0;
  });
  const maxX = xIndexes.reduce((acc, ind) => Math.max(acc, ind));
  const maxY = yIndexes.reduce((acc, ind) => Math.max(acc, ind));
  const screen = [];
  for (let y = 0; y <= maxY; y++) {
    screen.push(Array(maxX + 1).fill(' '));
  }

  return screen;
}

// 12099
module.exports = input => {
  // run computer for first time
  const input2 = input[0].split(',');
  input2[0] = 2;
  const computer = new Computer(input2);
  const firstOutput = computer.run([0]);

  // create the screen
  const screen = createScreen(firstOutput);

  // update screen
  updateScreen(screen, firstOutput);

  let remainingBlocks = Infinity;
  while (!computer.hasEnded()) {
    const ballX = findBall(screen);
    const paddleX = findPaddle(screen);
    let paddleInput = 0;
    if (ballX > paddleX) {
      paddleInput = 1;
    } else if (ballX < paddleX) {
      paddleInput = -1;
    }

    const output = computer.run([paddleInput]);
    remainingBlocks = updateScreen(screen, output);
  }

  return remainingBlocks;
}
