'use strict';

const md5 = require('md5');

function hasVisited(oldState, newState) {
  let currentPair = [newState[0], newState[1]];
  return oldState.includes(currentPair);
}

function hasReachedEnd(state) {
  return (state[0] === 3 && state[1] === 3);
}

function getNextValidStates(state, salt) {
  // calculate the current room hash.
  let hash = md5(salt + state[3]);

  // these chars indicate that a path is open (should be using ascii values instead)
  let validOpenChars = ['b', 'c','d', 'e', 'f'];

  let nextValidStates = [];

  // add up state
  if (state[0] > 0 && validOpenChars.includes(hash.charAt(0))) {
    let newState = [];
    newState[0] = state[0] - 1;
    newState[1] = state[1];
    newState[2] = JSON.parse(JSON.stringify(state[2]));
    newState[2].push([state[0], state[1]]);
    newState[3] = state[3] + 'U';

    if (!hasVisited(state, newState)) {
      nextValidStates.push(newState);
    }
  }

  // add down state
  if (state[0] < 3 && validOpenChars.includes(hash.charAt(1))) {
    let newState = [];
    newState[0] = state[0] + 1;
    newState[1] = state[1];
    newState[2] = JSON.parse(JSON.stringify(state[2]));
    newState[2].push([state[0], state[1]]);
    newState[3] = state[3] + 'D';

    if (!hasVisited(state, newState)) {
      nextValidStates.push(newState);
    }
  }

  // add left state if valid
  if (state[1] > 0 && validOpenChars.includes(hash.charAt(2))) {
    let newState = [];
    newState[0] = state[0];
    newState[1] = state[1] - 1;
    newState[2] = JSON.parse(JSON.stringify(state[2]));
    newState[2].push([state[0], state[1]]);
    newState[3] = state[3] + 'L';

    if (!hasVisited(state, newState)) {
      nextValidStates.push(newState);
    }
  }

  // add right state if valid
  if (state[1] < 3 && validOpenChars.includes(hash.charAt(3))) {
    let newState = [];
    newState[0] = state[0]; // row
    newState[1] = state[1] + 1; // col
    newState[2] = JSON.parse(JSON.stringify(state[2])); // visited
    newState[2].push([state[0], state[1]]);
    newState[3] = state[3] + 'R'; // path

    if (!hasVisited(state, newState)) {
      nextValidStates.push(newState);
    }
  }

  // and return!
  return nextValidStates;
}

module.exports = (input) => {
  let passcode = input[0];

  // each state consists of row, column, previously visited positions, path
  let initialPosition = [0, 0, [], ''];

  let stateQueue = [];
  stateQueue.push(initialPosition);

  while (stateQueue.length !== 0) {
    let currentState = stateQueue.shift();

    // check if we have reached the end
    if (hasReachedEnd(currentState)) {
      return currentState[3];
    }

    // get a list of all of the next valid states
    // and add them to the state queue
    let nextStates = getNextValidStates(currentState, passcode);
    stateQueue = stateQueue.concat(nextStates);
  }

  return null;
}