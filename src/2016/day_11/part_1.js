'use strict';

let initialState = {};
initialState[0] = ['HM', 'LM'];
initialState[1] = ['HG'];
initialState[2] = ['LG'];
initialState[3] = [];
initialState['elevator'] = 0;
initialState['steps'] = 0;

function getItemPermutations(state) {
  return {};
}

function getNeighbouringFloors(state) {
  switch (state['elevator']) {
    case 0:
      return [1];
    case 1:
      return [0, 2];
    case 2:
      return [1, 3];
    case 3:
      return [2];
  }

  console.error('getNeighbouringFloors error');
}

function getPossibleNextStates(state) {
  // we need to get every permutation of objects on the current floor that we can move
  let itemPermutations = getItemPermutations(state);

  // get the neighbouring floors
  let neighbouringFloors = getNeighbouringFloors(state);

  let possibleNextStates = [];

  // now generate the possible states given
  neighbouringFloors.forEach((floor) => {
    itemPermutations.forEach((items) => {
      // create a new state
      let newState = JSON.parse(JSON.stringify(state));

      // remove the items from the current floor
      let oldFloor = newState['elevator'];
      newState[oldFloor] = newState[oldFloor].filter(item => items.indexOf(item) === -1);

      // check if current floor state is valid
      if (!isValidFloor(newState[oldFloor])) {
        return;
      }

      // move the elevator to new position
      newState['elevator'] = floor;

      // move items into the new floor;
      newState[floor].push.apply(newState[floor], items);

      // check if new floor state is valid
      if (!isValidFloor(newState[floor])) {
        return;
      }

      // add to possible next states if the new state is valid
    });
  });

  // return possible next states
}

function isValidFloor(floor) {
  let generators = floor.reduce((acc, items) => {
    if (item.charAt(1) === 'G') acc.push(item);
    return acc;
  });

  let machines = floor.reduce((acc, items) => {
    if (item.charAt(1) === 'M') acc.push(item);
    return acc;
  }, []);

  // find out whether we have a machine without a generator
  // as well as another generator (the second gen will fry the chip)
  let isInvalid = machines.some((item) => {
    return !generators.contains(item.charAt(0) + 'G') && generators.length > 1;
  });

  return !isInvalid;
}


function reachedFinalState(state) {
  return state[3].length === 4;
}

function serializeState(state) {
  let serializedString = '';
  for (let i = 0; i <= 3; i++) {
    state[i].sort(); // sorting state so that serialization will be the same regardless of order
    serializedString += 'F' + i;
    serializedString += state[i].reduce((acc, item) => {
      return acc + ',' + item;
    }, '');
  }

  return serializedString;
}


module.exports = (input) => {
  let stateCache = [];
  let stateQueue = [];
  stateQueue.push(initialState);

  while (queue.length > 0) {
    // take the current state.
    let currentState = stateQueue.shift();

    // check if we've reached our final state (return early)
    if (reachedFinalState(currentState)) {
      return currentState.steps;
    }

    // we have confirmed we're not at the final state.
    // Let's check whether we have encountered this state before
    // continuing early if so, and update the cache if not.
    let serializedState = serializeState(currentState);
    if (stateCache[serializedState] === true) {
      continue;
    } else {
      stateCache[serializedState] = true;
    }

    // if we haven't reached the final state
    // get all possible next states
    let possibleNextStates = getPossibleNextStates(currentState);
    queue.push.apply(queue, possibleNextStates);
  }
}
