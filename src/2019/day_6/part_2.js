'use strict';

const part1 = require('./part_1');

function findLowestCommonAncestor(nodeA, nodeB) {
  let aHeight = nodeA.height();
  let bHeight = nodeB.height();

  while (aHeight > bHeight) {
    nodeA = nodeA.parent;
    aHeight--;
  }

  while(bHeight > aHeight) {
    nodeB = nodeB.parent;
    bHeight--;
  }

  while (nodeA.label !== nodeB.label) {
    nodeA = nodeA.parent;
    nodeB = nodeB.parent;
  }

  return nodeA;
}

// 322
module.exports = input => {
  const edges = part1.convertInputToEdgeMap(input);
  const rt = part1.createTree(edges, 'COM');

  const you = rt.find('YOU');
  const san = rt.find('SAN');
  const lca = findLowestCommonAncestor(you, san);

  // find distance for both to LCA
  let distance = 0;
  let temp = you.parent; // start from parent
  while (temp !== lca) {
    temp = temp.parent;
    distance++;
  }

  temp = san.parent; // start from parent
  while(temp !== lca) {
    temp = temp.parent;
    distance++;
  }

  return distance;
}
