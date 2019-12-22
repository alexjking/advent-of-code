'use strict';

class Node {
  constructor(label, children, parent) {
    this.label = label;
    this.parent = parent;
    this.children = children;
  }

  findOrbitsSum(depth) {
    const childrenOrbits = this.children
      .map(child => {
        return child.findOrbitsSum(depth + 1);
      })
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);

    // return sum of children orbits + orbits for this node
    return childrenOrbits + depth;
  }

  height() {
    let h = 0;
    let node = this;
    while (node.parent != null) {
      h++;
      node = node.parent;
    }

    return h;
  }

  find(label) {
    if (this.label === label) {
      return this;
    }

    for(let i = 0; i < this.children.length; i++) {
      const result = this.children[i].find(label);

      if (result != null) {
        return result;
      }
    }

    return null;
  }
}

function createTree(edges, label, parent) {
  if (!edges.hasOwnProperty(label)) {
    return new Node(label, [], parent);
  }

  const currentNode = new Node(label, [], parent);

  const children = edges[label].map(childLabel => {
    return createTree(edges, childLabel, currentNode);
  });

  currentNode.children = children;
  return currentNode;
}

function convertInputToEdgeMap(input) {
  return input
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

}

// 119831
module.exports = input => {
  // generate a NodeLabel -> Array<NodeLabel> map
  const edges = convertInputToEdgeMap(input);

  // create a tree
  const tree = createTree(edges, 'COM', null);

  // now find the number of direct and indrect orbits
  return tree.findOrbitsSum(0);
};

module.exports.Node = Node;
module.exports.createTree = createTree;
module.exports.convertInputToEdgeMap = convertInputToEdgeMap;
