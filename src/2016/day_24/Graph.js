'use strict';

module.exports = class Graph {

  constructor(input) {
    this.graph = input.map(row => {
      return row.split('');
    });

    // generates a matrix containing the neighbours for each point
    this.neighbourMatrix = this.generateNeighboursMatrix();

    // generates a matrix of shortest path distances from a number
    // to each other number e.g. this.shortestPathMatrix[0][2]
    // returns shortest distance between 0 and 2.
    // This is a symmetric matrix
    this.shortestPathMatrix = this.generateShortestPaths();
    console.log('Shortest Path Matrix');
    console.log(this.shortestPathMatrix);
  }

  generateShortestPaths() {
    let shortestPathMatrix = [];

    for (let i = 0; i < 5; i++) {
      let currentShortestPathArray = [];

      // lets get the root node
      let pos = this.getPosition(i);
      pos.push({}); // lets push an empty object used for visited nodes

      // create a queue
      let queue = [];
      queue.push(pos);

      // BFS until we've got all of the shortest paths
      while (queue.length > 0) {
        let currentPos = queue.shift();
        let currentValue = this.graph[currentPos[0] * 1][currentPos[1] * 1];

        // if we hit a number, add it to shortest path matix
        if (currentValue !== '-' && currentValue !== '.' && currentValue !== '#') {
          if (currentShortestPathArray[currentValue * 1] == undefined) {
            currentShortestPathArray[currentValue * 1] = Object.keys(currentPos[2]).length;
          }
        }

        // get neighbouring pairs, removing those which are
        let neighbours = JSON.parse(JSON.stringify(this.neighbourMatrix[currentPos[0] * 1][currentPos[1] * 1]));

        // update the hashmap with visited nodes
        let currentVisitedPaths = JSON.parse(JSON.stringify(currentPos[2]));
        currentVisitedPaths[currentPos[0] +':' + currentPos[1]] = true;

        // lets filter neighbours we have already visited
        let unvisitedNeighbours = neighbours.filter(neighbourPair => {
          return currentVisitedPaths[neighbourPair[0] +':' + neighbourPair[1]] !== true;
        }).map(neighbourPair => {
          neighbourPair.push(currentVisitedPaths);
          return neighbourPair;
        });

        // add the unvisited neighbours to the queue
        queue = queue.concat(unvisitedNeighbours);
      }

      shortestPathMatrix.push(currentShortestPathArray);
    }

    return shortestPathMatrix;
  }

  getPosition(number) {
    for (let i = 0; i < this.graph.length; i++) {
      if (this.graph[i].includes(number + '')) {
        return [i, this.graph[i].indexOf(number + '')];
      }
    }

    console.error('ERROR: getPosition');
  }

  generateNeighboursMatrix() {
    let neighbourMatrix = [];

    for (let row = 0; row < this.graph.length; row++) {
      let currentRowNeighbours = [];

      for (let col = 0; col < this.graph[row].length; col++) {
        currentRowNeighbours.push(this.getNeighbours(row, col));
      }

      neighbourMatrix[row] = currentRowNeighbours;
    }


    return neighbourMatrix;
  }

  getNeighbours(row, col) {
    let neighbours = [];

    if (this.graph[row][col] === '#') {
      return neighbours;
    }

    // top
    if (row > 0 && this.graph[row - 1][col] !== '#') {
      neighbours.push([row - 1, col]);
    }

    // bottom
    if (row < (this.graph.length - 1) && this.graph[row + 1][col] !== '#') {
      neighbours.push([row + 1, col]);
    }

    // right
    if (col < (this.graph[0].length - 1) && this.graph[row][col + 1] !== '#') {
      neighbours.push([row, col + 1]);
    }

    // left
    if (col > 0 && this.graph[row][col - 1] !== '#') {
      neighbours.push([row, col - 1]);
    }

    return neighbours;
  }

}