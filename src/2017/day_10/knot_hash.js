'use strict';

module.exports = (hashArr, lengths, currentPosition, skipSize) => {

  lengths.forEach((length) => {
    // inore any invalid lengths
    if (length > hashArr.length) {
        return;
    }

    // reverse the order of the current length of elements
    let leftIndex = currentPosition;
    let rightIndex = currentPosition + (length - 1);

    while (leftIndex < rightIndex) {
        // modified indexes to ensure that they are circular
        let modifiedLeftIndex = leftIndex % (hashArr.length);
        let modifiedRightIndex = rightIndex % (hashArr.length);

        // swap values
        let tempLeftValue = hashArr[modifiedLeftIndex];
        hashArr[modifiedLeftIndex] = hashArr[modifiedRightIndex];
        hashArr[modifiedRightIndex] = tempLeftValue;

        // increment/decrement pointers
        leftIndex++;
        rightIndex--;
    }

    // move current position forward by this length + skip size
    currentPosition = (currentPosition + length + skipSize) % (hashArr.length);

    // increase skip size
    skipSize++;
  });

  return {
    hashArr: hashArr,
    lengths: lengths,
    currentPosition: currentPosition,
    skipSize: skipSize,
  };
};
