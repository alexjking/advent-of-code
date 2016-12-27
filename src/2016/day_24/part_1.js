'use strict';

let Graph = require('./Graph');


module.exports = (input) => {

  // lets convert the input into a graph.


  // lets generate a series of shortest differences between each edge
  // by doing a BFS starting at each node, ending at each other node
  // we can generate a matrix of shortest distances between nodes.


  // find minimum distance between each pair of nodes
  // once we have done this, we can use this to do TSP.

  let g = new Graph(input);

      //console.log(g.neighbourMatrix);



  return null;
}