// Part 2
// Move the data from the top right corner to the top left corner.
// So algorithm as follows:
//
// Starting from the top right corner, do a BST.
// So for all of the Goals neighbours, count how many moves it would take to move them into either of the neighbouring nodes.
// I should check for how many empty spaces there are. If there is one, that might be key to finding out how to do it all.
// Looks exceedingly complicated though, so will wait a while for that one!


// There is only one node which has enough available space. This is node 4, 25.
// Therefore we can reduce this problem down into a movement problem.

// 190 is too low
// 195 is too low

module.exports = (input) => {
  // remove the first two lines from the input
  input.shift();
  input.shift();

  let matrix = [];

  for (let i = 0; i < 35; i++) {
    matrix.push([]);
  }

  input.forEach(row => {
    row = row.replace(/  +/g, ' ');
    let arr = row.split(' ');

    let posArr = arr[0].split('-');
    let x = posArr[1].substring(1) * 1;
    let y = posArr[2].substring(1) * 1;

    let usePerc = arr[4].slice(0, -1) * 1;
    let size = arr[1].slice(0, -1) * 1;
    if (usePerc === 0) {
      matrix[y][x] = '_';
    } else if (size > 100) {
      matrix[y][x] = '#';
    } else {
      matrix[y][x] = '.';
    }
  });

  matrix[0][0] = 'S';
  matrix[0][29] = 'G';

  matrix.forEach(row => {
    console.log(row.join(''));
  });
}