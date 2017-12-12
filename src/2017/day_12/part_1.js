'use strict';

const _ = require('lodash');

module.exports = (input) => {
  // reduce input into a map of node ids to nodes (containing id and neighbours)
  let graphMap = _.reduce(input, (memo, row) => {
    let temp = row.split(' ');
    let id = temp[0];
    let neighbours = [];

    for (let i = 2; i < temp.length; i++) {
      neighbours.push(temp[i].replace(',', ''));
    }

    memo[id] = {
      id: id,
      neighbours: neighbours,
    };

    return memo;
  }, {});

  // find number of programs that are in the group the contains id 0
  let visitedNodes = {};
  let queue = ['0'];

  while (queue.length > 0) {
    let currentNodeID = queue.shift();
    let currentNode = graphMap[currentNodeID];

    // we haven't visited this node, lets visit it and add neighbours
    if (visitedNodes[currentNodeID] !== true) {
      visitedNodes[currentNodeID] = true;

      _.forEach(currentNode.neighbours, (neighbourId) => {
        queue.push(neighbourId);
      });
    }
  }

  // return number of visited nodes
  return _.size(_.keys(visitedNodes));
};
