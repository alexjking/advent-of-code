'use strict';

const {Maze, Node} = require('./part_1');

module.exports = input => {
  // Similar to first solution, we just create the neighbours as we go along using the original
  // maze as a guide for this solution.

  // create new nodes as we go along
  function getUnvisitedNeighbours(maze, currentNode, visitedKeys) {
    // get the copy of the node from the original maze at the same position at level 0
    const mazeNode = maze.nodes[`${currentNode.y}:${currentNode.x}:0`];

    // copy the current nodes neighbours from the maze as new nodes (retaining currentNode level)
    const neighbours = mazeNode.children.map(neighbour => {
      const newNode = new Node(neighbour.x, neighbour.y, currentNode.level);
      newNode.label = neighbour.label;
      return newNode;
    });

    // if the node is labelled, we need to add the portal as an extra neighbour
    if (currentNode.label !== null && currentNode.label !== 'AA'  && currentNode.label !== 'ZZ') {
        const portalNodes = maze.portalSourceMap[currentNode.label];
        let newNode = null;
        if (portalNodes.up.x === currentNode.x && portalNodes.up.y === currentNode.y) {
          newNode = new Node(portalNodes.down.x, portalNodes.down.y, currentNode.level - 1);
        } else if (portalNodes.down.x === currentNode.x && portalNodes.down.y === currentNode.y) {
          newNode = new Node(portalNodes.up.x, portalNodes.up.y, currentNode.level + 1);
        } else {
          throw "Error creating unvisisted neighbours";
        }

        newNode.label = currentNode.label;
        neighbours.push(newNode);
      }

    // filter for any nodes that have already been visited, and any invalid nodes
    return neighbours
      .filter(el => el.level >= 0)
      .filter(el => !visitedKeys.has(el.getKey()));
  }

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

      // extra condition here makes sure that we only exit if we're at the base level
      if (currentNode.x === exitNode.x && currentNode.y === exitNode.y && currentNode.level === 0) {
        return distance;
      }

      // else we need to find next neighbours
      const unvisitedNeighbours = getUnvisitedNeighbours(maze, currentNode, visitedKeys);
      tempQueue = tempQueue.concat(unvisitedNeighbours);
    }

    distance++;
    queue = tempQueue;
  }

  return "Not found";
}
