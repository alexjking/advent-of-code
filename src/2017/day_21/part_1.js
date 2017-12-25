'use strict';

/**
 * Rotates a grid
 *
 * @param {} a
 */
function rotate(a) {
  const len = a.length;
  for (let i = 0; i < len / 2; i++) {
      for (let j = i; j < len - i - 1; j++) {
          const current = a[i][j];
          a[i][j] = a[j][len - i - 1];
          a[j][len - i - 1] = a[len - i - 1][len - j - 1];
          a[len - i - 1][len - j - 1] = a[len - j - 1][i];
          a[len - j - 1][i] = current;
      }
  }
  return a;
}

/**
 * Initializes a grid of the given size
 *
 * @param {*} size
 */
function make(size) {
  const a = [];
  for (let i = 0; i < size; i++) {
      a[i] = [];
      for (let j = 0; j < size; j++) {
          a[i][j] = 0;
      }
  }
  return a;
}

/**
 * Fills given cell with data from the given grid.
 *
 * @param {*} grid
 * @param {*} cell
 * @param {*} x
 * @param {*} y
 */
function fillcell(grid, cell, x, y) {
  x *= cell.length;
  y *= cell.length;
  for(let i = 0; i < cell.length; i++) {
      for(let j = 0; j < cell.length; j++) {
          cell[i][j] = grid[i + x][j + y];
      }
  }
}

/**
 * Fill grid with contents of given cell at specified coordinates
 * @param {*} grid
 * @param {*} cell
 * @param {*} x
 * @param {*} y
 */
function fillgrid(grid, cell, x, y) {
  x *= cell.length;
  y *= cell.length;
  for(let i = 0; i < cell.length; i++) {
      for(let j = 0; j < cell.length; j++) {
          grid[i + x][j + y] = cell[i][j];
      }
  }
}

module.exports = (input) => {
  // flatten array into a single string
  const flatten = (a) => a.map((e) => e.join('')).join('');
  const rules = new Map();

  // generate rules (rotate/flip beofre hand)
  input.forEach((l) => {
    const [k, v] = l.split(' => ').map((x) => x.split('/').map((y) => [...y.trim()].map((z) => (z === '#') ? 1 : 0)));
    rules.set(flatten(k), v);
    rules.set(flatten(rotate(k)), v);
    rules.set(flatten(rotate(k)), v);
    rules.set(flatten(rotate(k)), v);
    k.reverse();
    rules.set(flatten(k), v);
    rules.set(flatten(rotate(k)), v);
    rules.set(flatten(rotate(k)), v);
    rules.set(flatten(rotate(k)), v);
  });

  // setup initial grid
  let grid = [
    [ 0, 1, 0 ],
    [ 0, 0, 1 ],
    [ 1, 1, 1 ],
  ];

  for(let i = 0; i < 18; i++) {
    const cellsize = (grid.length % 2 === 0) ? 2 : 3;
    const nextsize = grid.length + grid.length / cellsize;
    const cell = make(cellsize);
    const next = make(nextsize);

    for(let j = 0; j < grid.length / cellsize; j++) {
        for(let k = 0; k < grid.length / cellsize; k++) {
            fillcell(grid, cell, j, k);
            const replace = rules.get(flatten(cell));
            fillgrid(next, replace, j, k);
        }
    }
    grid = next;
  }


  return grid.reduce((a, b) => a + b.reduce((c, d) => c + d), 0);
};
