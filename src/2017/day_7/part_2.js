'use strict';

const Part1 = require('./part_1');
const _ = require('lodash');

const getDiscs = function(input) {
  return _.map(input, (row) => {
    let items = row.split(' ');

    let object = {};
    object.name = items[0];

    object.weight = Number(items[1].substring(1, items[1].length - 1));

    let childrenNames = [];

    for (let i = 3; i < items.length; i++) {
      let str = items[i];
      str = str.replace(',', '');
      childrenNames.push(str);
    }

    object.childrenNames = childrenNames;

    return object;
  });
};

const getTree = function(name, discsMap) {
  let disc = discsMap[name];

  disc.children = _.map(disc.childrenNames, (childName) => {
    return getTree(childName, discsMap);
  });

  disc.totalWeight = disc.weight + _.reduce(disc.children, (memo, child) => {
    return memo + child.totalWeight;
  }, 0);

  return disc;
};


const getRootUnevenTree = function(treeRoot) {
  let queue = [treeRoot];

    while (!_.isEmpty(queue)) {
      let currentProgram = queue.shift();

      let uniqueTotalWeights = _.uniq(_.map(currentProgram.children, (child) => {
        return child.totalWeight;
      }));

      // exit, we have found a set of children with uneven weights.
      if (_.size(uniqueTotalWeights) > 1) {
        return currentProgram;
      }

      queue = queue.concat(currentProgram.children);
    }
};

const traverse = function(root) {
  // find the weights for the children
  let childWeights = _.map(root.children, (child) => {
    return child.totalWeight;
  });

  let uniqueWeights = _.uniq(childWeights);
  let numUniqueTotalWeights = _.size(uniqueWeights);

  // if I reach a node which is either a leaf, or has all children balanced,
  // then this node is the one we need to correct.
  if (numUniqueTotalWeights === 1 || numUniqueTotalWeights === 0) {
    return {
      difference: 'unknown',
      nodeWeight: root.weight,
    };
  } else {

    // find the child which has the incorrect weight

    let uniqueChild;
    for (let i = 0; i < uniqueWeights.length; i++) {
      let tempChildren = _.filter(root.children, (child) => {
        return child.totalWeight === uniqueWeights[i];
      });

      if (_.size(tempChildren) === 1) {
        uniqueChild = tempChildren[0];
      }
    }

    // lets traverse down and find the weight of the child that is wrong
    let incorrectChildInfo = traverse(uniqueChild);
    let correctTotalWeight = (uniqueChild.totalWeight === uniqueWeights[0]) ? uniqueWeights[1] : uniqueWeights[0];
    let difference = correctTotalWeight - uniqueChild.totalWeight;
    incorrectChildInfo.difference = difference;
    return incorrectChildInfo;
  }
};

module.exports = (input) => {
  let rootInfo = Part1(input);

  let discs = getDiscs(input);

  // lets turn this into a map for easy access
  let discsMap = _.reduce(discs, (memo, disc) => {
    memo[disc.name] = disc;
    return memo;
  }, {});

  // generate tree starting from root
  //  - each node stores the accumulative weight of its and its children
  let treeRoot = getTree(rootInfo.name, discsMap);

  // traverse through the tree, checking the children at each stage
  // to find the root of the uneven tree
  let unevenRoot = getRootUnevenTree(treeRoot);

  // we need to traverse down the uneven tree until we find the incorrect node
  const incorrectNodeData = traverse(unevenRoot);

  // return the adjusted weight
  return incorrectNodeData.nodeWeight + incorrectNodeData.difference;
};
