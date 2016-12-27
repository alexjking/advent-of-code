'use strict';

let Graph = require('./Graph');

/**
 * Find the minimum steps to traverse all numbers and return to zero.
 *
 * This is more or less a copy and paste of part 1, however when we calculate
 * the minimum distance, we also factor in the distance from the last node
 * back to node 0.
 */
module.exports = (input) => {
  let graph = new Graph(input);

  let shortestPathMatrix = graph.getShortestPathMatrix();

  let initialPathObj = {
    distance: 0,
    path: [0],
    remaining: [1,2,3,4,5,6,7],
  };

  let results = [];

  let queue = [];
  queue.push(initialPathObj);

  while (queue.length > 0) {
    let currentPathObj = queue.shift();

    // if we have reached the end, add this to the results array
    if (currentPathObj.remaining.length === 0) {
      results.push(JSON.parse(JSON.stringify(currentPathObj)));
      continue;
    }

    for (let i = 0; i < currentPathObj.remaining.length; i++) {
      let newPathObj = JSON.parse(JSON.stringify(currentPathObj));


      // get the next node to visit (removes it from remaining array)
      let nextNode = newPathObj.remaining.splice(i, 1);

      // find the distance from last visited node to this node, and update distance
      let distance = shortestPathMatrix[newPathObj.path.slice(-1)[0]][nextNode];
      newPathObj.distance += distance;

      // now add the node we are currently visiting into this object
      newPathObj.path.push(nextNode);

      // now add this back to the queue
      queue.push(newPathObj);
    }
  }

  let minimumDistance = results.reduce((acc, pathObj) => {
    // get the distance from the last node we visited to the first node (0).
    let distanceToZero = shortestPathMatrix[pathObj.path.slice(-1)[0]][0];
    let newDistance = pathObj.distance + distanceToZero;

    if (newDistance < acc) {
      return newDistance;
    } else {
      return acc;
    }
  }, Infinity)

  return minimumDistance; // Part 2: 696
}
