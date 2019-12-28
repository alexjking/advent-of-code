'use strict';

function getKey(node) {
  return `${node.y}:${node.x}`;
}

function getNeighbouringKeys(area, rootNode) {
  let keyNodes = [];
  let nodes = [rootNode];
  const visitedCoords = new Set();
  let distance = 0;
  while(nodes.length > 0) {
    let tempNodes = [];
    while (nodes.length > 0) {
      const node = nodes.pop();

      // check if node is invalid
      if (
        // within bounds
        node.y < 0 ||
        node.y >= area.length ||
        node.x < 0 ||
        node.x >= area[0].length ||
        // not a wall
        area[node.y][node.x] === '#' ||
        // we haven't visited this yet
        visitedCoords.has(getKey(node)) ||
        // we counter a door without a key
        (
          area[node.y][node.x] !== '@' &&
          area[node.y][node.x] !== '.' &&
          area[node.y][node.x] === area[node.y][node.x].toUpperCase() &&
          !rootNode.keys.includes(area[node.y][node.x].toLowerCase())
        )
      ) {
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
          distance: distance + rootNode.distance,
          keys: rootNode.keys.concat([area[node.y][node.x]]),
        });
      }

      // add neighbours
      tempNodes.push({
        x: node.x,
        y: node.y + 1,
      });
      tempNodes.push({
        x: node.x,
        y: node.y - 1,
      });
      tempNodes.push({
        x: node.x + 1,
        y: node.y,
      });
      tempNodes.push({
        x: node.x - 1,
        y: node.y,
      });
    }

    nodes = tempNodes;
    distance++;
  }

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
    while (nodes.length > 0) {
      // check if we've completed, we should store distance somewhere
      const currentNode = nodes.pop();
      if (currentNode.keys.length === numKeys) {
        console.log('official route', currentNode);
        completedNodes.push(currentNode);
        continue;
      }

      // otherwise, we should find all the neighbouring keys that we can access
      // and continue search
      const neighbouringKeys = getNeighbouringKeys(area, currentNode);
      nextNodes = nextNodes.concat(neighbouringKeys);
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
