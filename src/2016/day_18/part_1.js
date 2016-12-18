'use strict';

function getNextTileRow(lastRow) {
  let length = lastRow.length;

  let nextRow = '';

  for (let i = 0; i < length; i++) {
    let left = (i > 0 && lastRow.charAt(i - 1) === '^');
    let center = (lastRow.charAt(i) === '^');
    let right = (i < (length - 1) && lastRow.charAt(i + 1) === '^');

    // rules to detect if current tile should be a trap
    if ((left && center && !right) ||
      (center && right && !left) ||
      (left && !center && !right) ||
    (right && !center && !left)) {
        nextRow += '^';
    } else {
      nextRow += '.';
    }
  }

  return nextRow;
}

function getNumberOfSafeTiles(row) {
  return row.split('').reduce((acc, char) => {
    return (char === '.') ? acc + 1 : acc;
  }, 0);
}

/**
 * This counts the number of traps based on an initial row of traps.
 * There are a series of rules which dictate how the next row of traps
 * should look like.
 *
 * input[0] is the first row
 * input[1] is the number of rows we should generate
 *
 * @returns {Number} The number of safe tiles.
 */
module.exports = (input) => {
  let currentTileRow = input[0];
  let maxRows = input[1] * 1;

  let tilesCount = getNumberOfSafeTiles(currentTileRow);

  // we've already started at the first row
  let i = 1;

  while (i < maxRows) {
    // get next tile row
    currentTileRow = getNextTileRow(currentTileRow);

    // increment the number of valid tile safe tiles
    tilesCount += getNumberOfSafeTiles(currentTileRow);

    i++;
  }

  return tilesCount;  // part 1: 1951
}
