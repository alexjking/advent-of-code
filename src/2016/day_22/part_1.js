'use strict';

module.exports = (input) => {
  // remove the first two lines from the input
  input.shift();
  input.shift();

  // map the input into objects
  let nodes = input.map(row => {
    row = row.replace(/  +/g, ' ');
    let arr = row.split(' ');

    let posArr = arr[0].split('-');
    let x = posArr[1].substring(1) * 1;
    let y = posArr[2].substring(1) * 1;

    let node = {
      x: x,
      y: y,
      size: arr[1].slice(0, -1) * 1,
      used: arr[2].slice(0, -1) * 1,
      avail: arr[3].slice(0, -1) * 1,
      usePerc: arr[4].slice(0, -1) * 1,
    };

    return node;
  });

  let viablePairs = 0;

  // get viable pairs
  for (let i = 0; i < nodes.length; i++) {
    let nodeA = nodes[i];
    if (nodeA.used === 0) continue; // Node A is not empty

    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue; // make sure we're not on the same node
      let nodeB = nodes[j];

      if (nodeB.avail >= nodeA.used) {
        viablePairs++;
      }
    }
  }

  return viablePairs; // Part 1: 1020
}