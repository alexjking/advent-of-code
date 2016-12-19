'use strict';

module.exports = (input) => {

  let numElves = input[0];

  let elves = [];
  for (let i = 0; i < 3012210; i++) {
    elves[i] = i + 1;
  }

  let currentIndex = 0;
  while (elves.length > 1) {
    if ((elves.length % 50000) === 0) {
      console.log(elves.length);
    }
    //console.log(elves);
    let increment = Math.floor(elves.length / 2);

    let deletionIndex = (currentIndex + increment) % elves.length;
    elves.splice(deletionIndex, 1);

    if (currentIndex < elves.length) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  }


  return elves[0];
}
