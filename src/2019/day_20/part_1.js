'use strict';

function getKey(x, y) {
  return y + ':' + x;
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.children = [];
  }

  getKey() {
    return getKey(this.x, this.y);
  }
}

function getNeighbourPositionIncrement() {
  return [
    {
      x:  1,
      y: 0,
    },
    {
      x: -1,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0,
      y: -1,
    }
  ];
}

module.exports = input => {
  // parse table into a grid
  const area = input.reduce((acc, row) => {
    if (row === '') {
      return acc;
    }

    acc.push(row.split(''));
    return acc;
  }, []);

  const nodes = area.reduce((acc, row, y) => {
    row.forEach((el, x) => {
      if (el === '.') {
        acc[getKey(x,y)] = new Node(x, y);
      }
    });

    return acc;
  }, []);

  // Add children for each node that exists
  Object.keys(nodes).forEach(nodeKey => {
    const node = nodes[nodeKey];

    // find children next
    const children = getNeighbourPositionIncrement()
    .map(pos => getKey(node.x + pos.x, node.y + pos.y))
    .map(key => {
      if (nodes.hasOwnProperty(key)) {
        return nodes[key];
      } else {
        return null;
      }
    })
    .filter(el => el !== null);

    node.children = children;
  });


  // find the portals in the grid
  const portalSourceMap = Object.keys(nodes).reduce((acc, nodeKey) => {
    const node = nodes[nodeKey];

    const neighbourLabels = getNeighbourPositionIncrement()
      .filter(pos => {
        return /^[A-Z]$/.test(area[pos.y + node.y][pos.x + node.x]);
      })
      .map(pos => {
        const firstLetter = area[pos.y + node.y][pos.x + node.x];
        const secondLetter = area[(2 * pos.y) + node.y][(2 * pos.x) + node.x]
        return [firstLetter, secondLetter].sort().join('');
      });

    if (neighbourLabels.length > 0) {
      const neighbourLabel = neighbourLabels[0];
      if (!acc.hasOwnProperty(neighbourLabel)) {
        acc[neighbourLabel] = [];
      }
      acc[neighbourLabel].push(node);
    }

    return acc;
  }, {});

  // add portal connections as children in our graph
  Object.keys(portalSourceMap).forEach(portalKey => {
    const portalNodes = portalSourceMap[portalKey];
    if (portalNodes.length !== 2) {
      return;
    }

    portalNodes[1].children.push(portalNodes[0]);
    portalNodes[0].children.push(portalNodes[1]);
  });

  // BFS to find shortest distance
  const entryNode = portalSourceMap['AA'][0];
  const exitNode = portalSourceMap['ZZ'][0];
  let visitedKeys = new Set();
  let queue = [entryNode];
  let distance = 0;
  while (queue.length > 0) {
    let tempQueue = [];

    while (queue.length > 0) {
      const currentNode = queue.pop();

      if (visitedKeys.has(currentNode.getKey())) {
        continue;
      }

      visitedKeys.add(currentNode.getKey());


      if (currentNode.x === exitNode.x && currentNode.y === exitNode.y) {
        return distance;
      }

      // else we need to find next neighbours
      const unvisitedNeighbours = currentNode.children
        .filter(el => !visitedKeys.has(el.getKey()));
      tempQueue = tempQueue.concat(unvisitedNeighbours);
    }

    distance++;
    queue = tempQueue;
  }

  return "Not found";
}
