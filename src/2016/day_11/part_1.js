'use strict';
// DEMO STATES
// let initialState = {};
// let itemsCount = 4;
// initialState[0] = ['HM', 'LM'];
// initialState[1] = ['HG'];
// initialState[2] = ['LG'];
// initialState[3] = [];
// initialState['elevator'] = 0;
// initialState['steps'] = 0;

// Part 1
// P = Promethium
// C = Cobalt
// U = Curium
// R = Ruthenium
// T = Plutonium
let itemsCount = 10;
let initialState = {};
initialState[0] = ['PG', 'PM'];
initialState[1] = ['CG', 'UG', 'RG', 'TG' ];
initialState[2] = ['CM', 'UM', 'RM', 'TM'];
initialState[3] = [];
initialState['elevator'] = 0;
initialState['steps'] = 0;

// Part 2
// E = Elerium
// D = Dilithium
// // P = Promethium
// // C = Cobalt
// // U = Curium
// // R = Ruthenium
// // T = Plutonium
itemsCount = 14;
initialState = {};
initialState[0] = ['PG', 'PM', 'EG', 'EM', 'DG', 'DM'];
initialState[1] = ['CG', 'UG', 'RG', 'TG' ];
initialState[2] = ['CM', 'UM', 'RM', 'TM'];
initialState[3] = [];
initialState['elevator'] = 0;
initialState['steps'] = 0;



function getItemPermutations(state) {
  // get current floor
  let currentFloor = state[state['elevator']];

  // now get item permutations (1 or 2 items a time)
  let itemPermutations = [];

  for (let i = 0; i < currentFloor.length; i++) {
    itemPermutations.push([currentFloor[i]]);

    for (let j = i + 1; j < currentFloor.length; j++) {
      itemPermutations.push([currentFloor[i], currentFloor[j]]);
    }
  }

  return itemPermutations;
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
  itemPermutations.forEach(items => {
    let oldFloor = state['elevator'];
    let oldFloorWithoutItems = state[oldFloor].filter(existingItem => items.indexOf(existingItem) === -1);
    if (!isValidFloor(oldFloorWithoutItems)) return;

    neighbouringFloors.forEach(floor => {
      let newNeighbourFloor = state[floor].concat(items);
      if (!isValidFloor(newNeighbourFloor)) return;

      // create a new state if the old floor and new floor are valid
      let newState = {};
      newState[oldFloor] = oldFloorWithoutItems;
      newState[floor] = newNeighbourFloor;
      newState['elevator'] = floor;
      newState['steps'] = state['steps'] + 1;
      for (let i = 0; i < 4; i++) {
        if (newState[i] === undefined) {
          newState[i] = JSON.parse(JSON.stringify(state[i]));
        }
      }

      // we now know that this state is valid
      // let's add it to list of possible states
      possibleNextStates.push(newState);
    });
  });

  // return possible next states
  return possibleNextStates;
}

function isValidFloor(floor) {
  let generatorMap = {};
  let generatorCount = false;
  let machines = [];

  floor.forEach(item => {
    if (item.charAt(1) === 'G') {
      generatorMap[item.charAt(0)] = true;
      generatorCount = true;
    } else {
      machines.push(item.charAt(0));
    }
  });

  // the machines/generators arrays are now just their corresponding letters
  // find out whether we have a machine without a generator
  // as well as another generator (the second gen will fry the chip)

  let isInvalid = machines.some((machine) => {
    return (generatorMap[machine] !== true) && generatorCount;
  });

  return !isInvalid;
}

// function isValidFloor(floor) {
//   let generators = floor.reduce((acc, item) => {
//     if (item.charAt(1) === 'G') acc.push(item.charAt(0));
//     return acc;
//   }, []);

//   let machines = floor.reduce((acc, item) => {
//     if (item.charAt(1) === 'M') acc.push(item.charAt(0));
//     return acc;
//   }, []);

//   // the machines/generators arrays are now just their corresponding letters
//   // find out whether we have a machine without a generator
//   // as well as another generator (the second gen will fry the chip)

//   let isInvalid = machines.some((machine) => {
//     if (!generators.includes(machine) && generators.length > 0){
//       return true;
//     } else {
//       return false;
//     }
//   });

//   return !isInvalid;
// }

function reachedFinalState(state) {
  return state[3].length === itemsCount;
}

let cache0 = {};
let cache1 = {};
let cache2 = {};
let cache3 = {};

function serializeState(state) {
  let serializedString = '';
  for (let i = 0; i <= 3; i++) {
    state[i].sort(); // sorting state so that serialization will be the same regardless of order
    serializedString += 'F' + i;
    serializedString += state[i].reduce((acc, item) => {
      return acc + item;
    }, '');
  }

  return serializedString;
}
function checkCache(state) {
  let serializedString = serializeState(state);

  switch(state['elevator']) {
    case 0:
      if (cache0[serializedString]) return true;
      break;
    case 1:
      if (cache1[serializedString]) return true;
      break;
    case 2:
      if (cache2[serializedString]) return true;
      break;
    case 3:
      if (cache3[serializedString]) return true;
      break;
  }

  return false;
}

function checkAndUpdateCache(state) {
  let serializedString = serializeState(state);

  switch(state['elevator']) {
    case 0:
      if (cache0[serializedString]) {
        return true;
      } else {
        cache0[serializedString] = true;
      }
      break;
    case 1:
      if (cache1[serializedString]) {
        return true;
      } else {
        cache1[serializedString] = true;
      }
      break;
    case 2:
      if (cache2[serializedString]) {
        return true;
      } else {
        cache2[serializedString] = true;
      }
      break;
    case 3:
      if (cache3[serializedString]) {
        return true;
      } else {
        cache3[serializedString] = true;
      }
      break;
  }

  return false;
}

function serializeState(state) {
  let serializedString = 'E' + state['elevator'] + '-';
  for (let i = 0; i <= 3; i++) {
    state[i].sort(); // sorting state so that serialization will be the same regardless of order
    serializedString += 'F' + i;
    serializedString += state[i].reduce((acc, item) => {
      return acc + item;
    }, '');
    serializedString += '-';
  }

  return serializedString;
}


// Part 1: Minimum number of moves is 33 steps.
module.exports = (input) => {
  let stateCache = [];
  let stateQueue = [];
  stateQueue.push(initialState);

  let i = 0;

  while (stateQueue.length > 0) {
    // take the current state.
    let currentState = stateQueue.shift();

    i++;
    if ((i % 15000) === 0) {
      console.log('State queue length: ' + stateQueue.length);
      console.log('Current steps: ' + currentState['steps']);
      console.log(currentState);
      console.log('');
    }


    // check if we've reached our final state (return early)
    if (reachedFinalState(currentState)) {
      console.log('FINAL STATE:');
      console.log(currentState);
      return currentState.steps;
    }

    // we have confirmed we're not at the final state.
    // Let's check whether we have encountered this state before
    // continuing early if so, and update the cache if not.
    // returns true if it already exists
    if (checkAndUpdateCache(currentState)) {
      continue;
    }

    // if we haven't reached the final state
    // get all possible next states
    let possibleNextStates = getPossibleNextStates(currentState);

    // pruning possible states before adding them to queue almost halved the run time 15 seconds for part 1.
    possibleNextStates = possibleNextStates.filter((state) => {
      return checkCache(state) !== true; // we only want to keep those which don't have cache hits
    });

    stateQueue.push.apply(stateQueue, possibleNextStates);
  }
}
