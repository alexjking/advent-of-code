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

module.exports = (input) => {
  // . safe
  // ^ traps in the fist row

  // let test = '.^^^^';
  // console.log(getNextTileRow(test));
  // return;

  // the type of tile (trapped or safe)
  // depends on types of tile in the same position
  // in the above row, and to either side of that popsition
  // e.g. (row - 1, col) (row - 1, col - 1) (row - 1, col + 1)
  // if off the end of the row, counts as safe


  let currentTileRow = input[0];

  let tilesCount = getNumberOfSafeTiles(currentTileRow);

  // we've already started at the first row
  let i = 1;

  while (i < 40) {
    // get next tile row
    currentTileRow = getNextTileRow(currentTileRow);

    // increment the number of valid tile safe tiles
    tilesCount += getNumberOfSafeTiles(currentTileRow);

    i++;
  }

  return tilesCount;  // part 1: 1951
}
