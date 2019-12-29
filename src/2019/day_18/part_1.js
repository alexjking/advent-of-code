'use strict';

function getKey(node) {
  return `${node.y}:${node.x}`;
}

function getCacheKey(node) {
  const positions = node.nodes.map(el => {
    return el.y + ':' + el.x;
  }).join(',');

  return positions + ':' + node.keys.concat().sort().join(',');
}

function getNextStates(area, state) {
  let keyStates = [];
  let states = [state];
  const visitedCoords = new Set();
  let distance = 0;

  function isInvalid(position) {
    return (// within bounds
      position.y < 0 ||
      position.y >= area.length ||
      position.x < 0 ||
      position.x >= area[0].length ||
      // not a wall
      area[position.y][position.x] === '#' ||
      // we haven't visited this yet
      visitedCoords.has(getKey(position)) ||
      // we counter a door without a key
      (
        area[position.y][position.x] !== '@' &&
        area[position.y][position.x] !== '.' &&
        area[position.y][position.x] === area[position.y][position.x].toUpperCase() &&
        !state.keys.includes(area[position.y][position.x].toLowerCase())
      )
    );
  }

  while(states.length > 0) {
    let tempStates = [];
    while (states.length > 0) {
      const tempState = states.pop();

      // loop through each node
      for (let sector = 0; sector < tempState.nodes.length; sector++) {
        let position = tempState.nodes[sector];

        // check if node is invalid
        if (isInvalid(position)) {
          continue;
        }

        // mark current node as visited
        visitedCoords.add(getKey(position));

        // check if we have a key, add it if we find one
        if (
          area[position.y][position.x] !== '.' &&
          area[position.y][position.x] !== '@' &&
          area[position.y][position.x] === area[position.y][position.x].toLowerCase() &&
          !state.keys.includes(area[position.y][position.x])
        ) {
          keyStates.push({
            ...tempState,
            distance: distance,
            keys: state.keys.concat([area[position.y][position.x]]),
          });
          continue;
        }

        const neighbourPositions = [{
            x: position.x,
            y: position.y + 1,
          },
          {
            x: position.x,
            y: position.y - 1,
          },
          {
            x: position.x + 1,
            y: position.y,
          },
          {
            x: position.x - 1,
            y: position.y,
          },
        ];

        const validNeighbourPositions = neighbourPositions.filter(el => !isInvalid(el));

        // now we need to create a load of states for the neighbours
        const nextStates = validNeighbourPositions.map((neighbourPosition) => {
          const myNewNodes =  {
            nodes: [...tempState.nodes],
          };
          myNewNodes.nodes[sector] = neighbourPosition;
          return myNewNodes;
        });

        // add valid neighbours
        tempStates = tempStates.concat(nextStates);
      }
    }

    states = tempStates;
    distance++;
  }

  return keyStates;
}

function convertInputToArea(input) {
  return input.reduce((acc, row) => {
    if (row === '') {
      return acc;
    }
    acc.push(row.split(''));
    return acc;
  }, []);
}

function findEntrance(area) {
  const nodes = [];
  area.forEach((row, y) => {
    row.forEach((el, x) => {
      if (el === "@") {
        nodes.push({
          x,
          y,
        });
      }
    });
  });

  return {
    nodes,
    keys: [],
    distance: 0,
  }

  if (entrance != null) {
    return entrance;
  }
  throw 'Could not find entrance';
}

function findNumberOfKeys(area) {
  return area.reduce((acc, row) => {
    return acc + row.reduce((innerAcc, el) => {
      if (el !== "@" && el !== "." && el !== "#" && el === el.toLowerCase()) {
        return innerAcc + 1;
      }

      return innerAcc;
    }, 0);
  }, 0);
}

const remainingDistanceCache = {};

function fetchRemainingDistanceFromCache(node) {
  const key = getCacheKey(node);
  if (remainingDistanceCache.hasOwnProperty(key)) {
    return remainingDistanceCache[key];
  } else {
    return null;
  }
}

function saveRemainingDistanceToCache(node, result) {
  const key = getCacheKey(node);
  remainingDistanceCache[key] = result;
}

module.exports = input => {
  const area = convertInputToArea(input);
  const entrance = findEntrance(area);
  const numKeys = findNumberOfKeys(area);

  function recurse(node) {
    // base case
    if (node.keys.length === numKeys) {
      return node.distance;
    }

    // check cache
    const remainingDistanceCacheResult = fetchRemainingDistanceFromCache(node);
    if (remainingDistanceCacheResult !== null) {
      return remainingDistanceCacheResult + node.distance;
    }

    // calculate remaining distance from this point onwards
    const nextStates = getNextStates(area, node);
    const minimumRemainingDistance = nextStates.map(el => {
      return recurse(el);
    }).reduce((acc, distance) => {
      return Math.min(acc, distance);
    }, Infinity);

    // save to cache and return
    saveRemainingDistanceToCache(node, minimumRemainingDistance);
    return minimumRemainingDistance + node.distance;
  }

  return recurse(entrance);
}
