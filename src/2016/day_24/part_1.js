'use strict';

let Graph = require('./Graph');


module.exports = (input) => {

  // lets convert the input into a graph.


  // lets generate a series of shortest differences between each edge
  // by doing a BFS starting at each node, ending at each other node
  // we can generate a matrix of shortest distances between nodes.


  // find minimum distance between each pair of nodes
  // once we have done this, we can use this to do TSP.

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
    if (pathObj.distance < acc) {
      return pathObj.distance;
    } else {
      return acc;
    }
  }, Infinity)

  return minimumDistance; // Part 1: 474
}
