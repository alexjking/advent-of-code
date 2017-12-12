'use strict';

const _ = require('lodash');

module.exports = (input) => {
  // reduce input into a map of node ids to nodes (containing id and neighbours)
  let graphMap = _.reduce(input, (memo, row) => {
    let temp = row.split(' ');
    let id = Number(temp[0]);
    let neighbours = [];

    for (let i = 2; i < temp.length; i++) {
      neighbours.push(Number(temp[i].replace(',', '')));
    }

    memo[id] = {
      id: id,
      neighbours: neighbours,
    };

    return memo;
  }, {});

  // find number of groups
  let groups = {};
  let visitedNodes = {};

  _.forEach(_.keys(graphMap), (groupNodeId) => {
    // lets start checking for a new group
    // if the node id has already been visited it is part of another group
    if (visitedNodes[groupNodeId] === true) {
      return;
    }

    let localVisitedNodes = {};

    // we are gonna traverse through another group
    // increment counter and BFS
    let queue = [groupNodeId];

    while (queue.length > 0) {
      let currentNodeID = queue.shift();
      let currentNode = graphMap[currentNodeID];

      // we haven't visited this node, lets visit it and add neighbours
      if (localVisitedNodes[currentNodeID] !== true) {
        localVisitedNodes[currentNodeID] = true;

        _.forEach(currentNode.neighbours, (neighbourId) => {
          queue.push(neighbourId);
        });
      }
    }

    // merge visitedNodes with localVisitedNodes
    visitedNodes = _.merge({}, visitedNodes, localVisitedNodes);

    // add current group to list of groups
    groups[groupNodeId] = _.keys(localVisitedNodes);
  });

  console.log('Part 1: ', _.size(groups[0]));

  // return number of groups
  return _.size(groups);
};
