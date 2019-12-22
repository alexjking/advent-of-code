'use strict';


function createTree(edges, label) {
  if (!edges.hasOwnProperty(label)) {
    return {
      label,
      children: [],
    };
  }

  return {
    label,
    children: edges[label].map(childLabel => {
      return createTree(edges, childLabel);
    }),
  };
}

function findOrbitsSum(tree, depth) {
  // find sum of indirect/direct orbits for children
  const childrenOrbits = tree.children.reduce((sum, child) => {
    return sum + findOrbitsSum(child, depth + 1);
  }, 0);

  // return sum of children orbits + orbits for this node
  return childrenOrbits + depth;
}

// 119831
module.exports = input => {
  // generate a NodeLabel -> Array<NodeLabel> map
  const edges = input
    .filter(row => row !== '')
    .reduce((acc, row) => {
      const vals = row.split(')');
      if (acc.hasOwnProperty(vals[0])) {
        acc[vals[0]] = acc[vals[0]].concat([vals[1]]);
      } else {
        acc[vals[0]] = [vals[1]];
      }

      return acc;
    }, {});

  // create a tree
  const tree = createTree(edges, 'COM');

  // now find the number of direct and indrect orbits
  return findOrbitsSum(tree, 0);
};
