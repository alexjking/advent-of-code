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

class Maze {
  constructor(input) {
    this.area = input.reduce((acc, row) => {
      if (row === '') {
        return acc;
      }

      acc.push(row.split(''));
      return acc;
    }, []);

    this.nodes = this.area.reduce((acc, row, y) => {
      row.forEach((el, x) => {
        if (el === '.') {
          acc[getKey(x,y)] = new Node(x, y);
        }
      });

      return acc;
    }, []);

    // Add children for each node that exists
    Object.keys(this.nodes).forEach(nodeKey => {
      const node = this.nodes[nodeKey];

      // find children next
      const children = this.getNeighbourPositionIncrement()
        .map(pos => getKey(node.x + pos.x, node.y + pos.y))
        .map(key => {
          if (this.nodes.hasOwnProperty(key)) {
            return this.nodes[key];
          } else {
            return null;
          }
        })
        .filter(el => el !== null);

      node.children = children;
    });

    // find the portals in the grid
    this.portalSourceMap = Object.keys(this.nodes).reduce((acc, nodeKey) => {
      const node = this.nodes[nodeKey];

      const neighbourLabels = this.getNeighbourPositionIncrement()
        .filter(pos => {
          return /^[A-Z]$/.test(this.area[pos.y + node.y][pos.x + node.x]);
        })
        .map(pos => {
          const firstLetter = this.area[pos.y + node.y][pos.x + node.x];
          const secondLetter = this.area[(2 * pos.y) + node.y][(2 * pos.x) + node.x]
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
    Object.keys(this.portalSourceMap).forEach(portalKey => {
      const portalNodes = this.portalSourceMap[portalKey];
      if (portalNodes.length !== 2) {
        return;
      }

      portalNodes[1].children.push(portalNodes[0]);
      portalNodes[0].children.push(portalNodes[1]);
    });
  }

  getEntryNode() {
    return this.portalSourceMap['AA'][0]
  }

  getExitNode() {
    return this.portalSourceMap['ZZ'][0];
  }

  getNeighbourPositionIncrement() {
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
}

module.exports = input => {

  const maze = new Maze(input);

  // BFS to find shortest distance
  const entryNode = maze.getEntryNode();
  const exitNode = maze.getExitNode();
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
