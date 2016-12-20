'use strict';

function getElfIndexForDeletion(elves, currentIndex, invalidElfIndexes) {
    // this finds the element on the opposite side of the large circle (including invalid elves)
    let halfElves = Math.floor((elves.length) / 2);
    let oppositeIndex = (currentIndex + halfElves) % elves.length;

    // now lets find the number of deleted elements between the currentIndex
    // and the opposite index
    let numberOfDeletedElves = 0;
    if (currentIndex < elves.length / 2) {
      numberOfDeletedElves = invalidElfIndexes.reduce((acc, index) => {
        return (index > currentIndex && index < oppositeIndex) ? acc + 1 : acc;
      }, 0);
    } else {
      numberOfDeletedElves = invalidElfIndexes.reduce((acc, index) => {
        return (index > currentIndex || index < oppositeIndex) ? acc + 1 : acc;
      }, 0);
    }

    let virtualOppositeIndex = (currentIndex + Math.floor((elves.length + invalidElfIndexes.length) / 2)) % elves.length;

    // find the index to delete
    let deletionIndex = oppositeIndex + numberOfDeletedElves - invalidElfIndexes.length;

    if (deletionIndex < 0) {
      deletionIndex = elves.length + deletionIndex;
    }

    deletionIndex = deletionIndex % elves.length;

    console.log('current index: ', currentIndex, ', oppositeIndex: ', oppositeIndex, ', numberOfDeletedElves: ', numberOfDeletedElves);
    console.log('deleting at ', deletionIndex);
    console.log('virtual opposite ', virtualOppositeIndex);

    return virtualOppositeIndex;
}

function incrementCurrentIndex(elves, currentIndex) {
  if (currentIndex < elves.length) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  // loop until we find an elf which is valid
  while (elves[currentIndex] === -1) {
    if (currentIndex < elves.length) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  }

  return currentIndex;
}

module.exports = (input) => {

  let numElves = input[0];

  let elves = [];
  for (let i = 0; i < 8; i++) {
    elves[i] = i + 1;
  }

  let currentIndex = 0;
  let invalidElfIndexes = [];
  while ((elves.length - invalidElfIndexes.length) > 1) {
    console.log('');
    console.log(elves, invalidElfIndexes);
    // lets find which elf to steal from
    let elfIndexToStealFrom = getElfIndexForDeletion(elves, currentIndex, invalidElfIndexes);

    // steal from the elf
    elves[elfIndexToStealFrom] = -1;
    invalidElfIndexes.push(elfIndexToStealFrom);

    // now lets increment to the next available elf
    currentIndex = incrementCurrentIndex(elves, currentIndex);

    // finally for optimization purposes
    // check if we have removed half of the elves, and reset the elves array if we ahve
    if (invalidElfIndexes.length >= elves.length / 2) {
      console.log('rejiggling elves');
      console.log(elves);
      currentIndex = 0;
      invalidElfIndexes = [];
      elves = elves.reduce((acc, elf) => {
        if (elf !== -1) acc.push(elf);
        return acc;
      }, []);
      console.log(elves);
      console.log('finished rejiggling');
    }
  }

  return elves[0];
}

// Attempt with this code got 10609.
// Was too low and took an hour.
// Need to investigate better ways of doing this.
// 10700 was also too low.

// input 8 should equal 7
// input 5 should equal 2