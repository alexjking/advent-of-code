'use strict';

function getKey(node) {
  return `${node.y}:${node.x}`;
}

const neighbouringKeysCache = {};

function fetchFromCache(node) {
  const key = node.y + ':' + node.x + ':' + node.keys.sort().join('');
  if (neighbouringKeysCache.hasOwnProperty(key)) {
    return neighbouringKeysCache[key];
  } else {
    return null;
  }
}

function saveToCache(node, neighbours) {
  const key = node.y + ':' + node.x + ':' + node.keys.sort().join('');
  neighbouringKeysCache[key] = neighbours;
}

function getNeighbouringKeys(area, rootNode) {
  const cache = fetchFromCache(rootNode);
  if (cache !== null) {
    return cache;
  }

  let keyNodes = [];
  let nodes = [rootNode];
  const visitedCoords = new Set();
  let distance = 0;

  function isInvalid(checkingNode) {
    return (// within bounds
      checkingNode.y < 0 ||
      checkingNode.y >= area.length ||
      checkingNode.x < 0 ||
      checkingNode.x >= area[0].length ||
      // not a wall
      area[checkingNode.y][checkingNode.x] === '#' ||
      // we haven't visited this yet
      visitedCoords.has(getKey(checkingNode)) ||
      // we counter a door without a key
      (
        area[checkingNode.y][checkingNode.x] !== '@' &&
        area[checkingNode.y][checkingNode.x] !== '.' &&
        area[checkingNode.y][checkingNode.x] === area[checkingNode.y][checkingNode.x].toUpperCase() &&
        !rootNode.keys.includes(area[checkingNode.y][checkingNode.x].toLowerCase())
      )
    );
  }

  while(nodes.length > 0) {
    let tempNodes = [];
    while (nodes.length > 0) {
      const node = nodes.pop();

      // check if node is invalid
      if (isInvalid(node)) {
        continue;
      }

      // mark current node as visited
      visitedCoords.add(getKey(node));

      // check if we have a key, add it if we find one
      if (
        area[node.y][node.x] !== '.' &&
        area[node.y][node.x] !== '@' &&
        area[node.y][node.x] === area[node.y][node.x].toLowerCase() &&
        !rootNode.keys.includes(area[node.y][node.x])
      ) {
        keyNodes.push({
          ...node,
          distance: distance,
          keys: rootNode.keys.concat([area[node.y][node.x]]),
        });
      }

      // add neighbours
      const neighbours = [{
          x: node.x,
          y: node.y + 1,
        },
        {
          x: node.x,
          y: node.y - 1,
        },
        {
          x: node.x + 1,
          y: node.y,
        },
        {
          x: node.x - 1,
          y: node.y,
        },
      ];
      tempNodes = tempNodes.concat(neighbours.filter(el => !isInvalid(el)));
    }

    nodes = tempNodes;
    distance++;
  }

  saveToCache(rootNode, keyNodes);
  return keyNodes;
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
  let entrance = null;
  area.forEach((row, y) => {
    row.forEach((el, x) => {
      if (el === "@") {
        entrance = {
          x,
          y,
          keys: [],
          distance: 0,
        }
      }
    });
  });

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

module.exports = input => {
  const area = convertInputToArea(input);
  const entrance = findEntrance(area);
  const numKeys = findNumberOfKeys(area);

  const completedNodes = [];
  let nodes = [entrance];
  while (nodes.length > 0) {
    let nextNodes = [];
    let alex2 = 0;
    while (nodes.length > 0) {
      // check if we've completed, we should store distance somewhere
      const currentNode = nodes.pop();
      if (currentNode.keys.length === numKeys) {
        completedNodes.push(currentNode);
        continue;
      }

      // otherwise, we should find all the neighbouring keys that we can access
      // and continue search
      const neighbouringKeys = getNeighbouringKeys(area, currentNode);
      nextNodes = nextNodes.concat(neighbouringKeys.map(el => {
        return {
          ...el,
          distance: el.distance + currentNode.distance,
        };
      }));
    }

    nodes = nextNodes;
  }

  return completedNodes.reduce((acc, el) => {
    if (el.distance < acc.distance) {
      return el;
    } else {
      return acc;
    }
  }, {distance: Infinity});
}
