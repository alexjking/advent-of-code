'use strict';

function findVisited(pathInput) {
  return pathInput.reduce((acc, path) => {
    const direction = path.substr(0, 1);
    const distance = Number(path.substr(1));

    let nextPos = acc.pos;
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'U':
          nextPos = {x: nextPos.x, y: nextPos.y + 1};
          break;
        case 'D':
          nextPos = {x: nextPos.x, y: nextPos.y - 1};
          break;
        case 'L':
          nextPos = {y: nextPos.y, x: nextPos.x - 1};
          break;
        case 'R':
          nextPos = {y: nextPos.y, x: nextPos.x + 1};
          break;
      }

      const posStr = nextPos.x + ':' + nextPos.y;
      acc.visited[posStr] = true;
    }

    return {
      visited: acc.visited,
      pos: nextPos,
    };
  }, {
    visited: {},
    pos: {
      x: 0,
      y: 0,
    }
  }).visited;
}

// 855
module.exports = input => {
  const firstPath = input[0].split(',');
  const secondPath = input[1].split(',');

  const firstVisited = findVisited(firstPath);
  const secondVisited = findVisited(secondPath);

  return Object.keys(firstVisited).reduce((minDistance, point) => {
    if (secondVisited[point] === true) {
      const arr = point.split(':');
      const distance = Math.abs(Number(arr[0])) + Math.abs(Number(arr[1]));
      return Math.min(minDistance, distance);
    }
    return minDistance;
  }, 9999999999);

  return 0;
}
