'use strict';

const Computer = require('../computer');

const MOVE = {
  NORTH: 1,
  SOUTH: 2,
  WEST: 3,
  EAST: 4,
};

const STATUS = {
  WALL: 0,
  MOVED: 1,
  MOVED_AND_HIT: 2,
};

function printHull(area) {
  // find ranges for x and y coordinates
  const ranges = Object.keys(area).reduce((acc, panelKey) => {
    const [x, y] = panelKey.split(':');
    return {
      minX: Math.min(acc.minX, Number(x)),
      minY: Math.min(acc.minY, Number(y)),
      maxX: Math.max(acc.maxX, Number(x)),
      maxY: Math.max(acc.maxY, Number(y)),
    };
  }, {minX: Infinity, minY: 0, maxX: 0, maxY: 0});
  // console.log(ranges);
  const xRange = ranges.maxX - ranges.minX;
  const yRange = ranges.maxY - ranges.minY;

  // create an empty grid for x and y range
  const result = [];
  for (let y = 0; y <= yRange; y++) {
    result.push(Array(xRange + 1).fill(' '));
  }

  // loop through painted panels, painting white panels in the grod
  Object.entries(area).forEach(([k, value]) => {
    const [x, y] = k.split(':');

    result[y - ranges.minY][x - ranges.minX] = value;
  });

  const printable = result
    .reverse()
    .map(row => row
      .map(val => {
        if (String(val).length === 1) {
          return ' ' + val + ' ';
        } else if (String(val).length === 2) {
          return ' ' + val;
        }

        return val;
      })
      .join(''));
  printable.forEach(row => console.log('|' + row + '|'));
}


function getNextPosition(move, x, y) {
  switch (move) {
    case MOVE.NORTH:
      y++;
      break;
    case MOVE.SOUTH:
      y--;
      break;
    case MOVE.EAST:
      x++;
      break;
    case MOVE.WEST:
      x--;
      break;
  }

  return {x, y};
}

function getValue(area, x, y) {
  const key = `${x}:${y}`;
  if (area.hasOwnProperty(key)) {
    return area[key];
  } else {
    return '';
  }
}

function calculateNextStep(area, x, y) {
  const temp = [
    {
      value: getValue(area, x - 1, y),
      move: MOVE.WEST,
    },
    {
      value: getValue(area, x, y + 1),
      move: MOVE.NORTH,
    },
    {
      value: getValue(area, x + 1, y),
      move: MOVE.EAST,
    },
    {
      move: MOVE.SOUTH,
      value: getValue(area, x, y - 1),
    },
  ].filter(tempy =>
    tempy.value !== '#' &&
    tempy.value !== '.' &&
    tempy.value !== '%' &&
    typeof tempy.value !== 'number' &&
    tempy.value !== 'v' &&
    tempy.value !== '*'

  );

  if (temp.length === 0) {
    return undefined;
  }
  return temp[0].move;
}

function findMoveToPreviousStep(area, x, y, counter) {
  const last = counter - 1;

  const temp = [
    {
      value: getValue(area, x - 1, y),
      move: MOVE.WEST,
    },
    {
      value: getValue(area, x, y + 1),
      move: MOVE.NORTH,
    },
    {
      value: getValue(area, x + 1, y),
      move: MOVE.EAST,
    },
    {
      move: MOVE.SOUTH,
      value: getValue(area, x, y - 1),
    },
  ];

  const temp2 = temp.filter(t => t.value === last);

  if (temp2.length !== 1) {
    console.log('no previous step', counter, last, x, y, temp, temp2);
    printHull(area);
    throw 'no previous step';
  }

  return temp2[0];
}

// 322
module.exports = input => {

  const computer = new Computer(input[0].split(','));

  // track the path that the droid has moved so far
  const path = [];
  let x = 0;
  let y = 0;
  const area = {
    ['0:0']: '%',
  };

  let counter = 1;

  while (!computer.hasEnded() && counter < 1000) {
    // figure out next move
    const input = calculateNextStep(area, x, y);

    // if there are no more inputs left, backtrack until we can find a new path
    if (input === undefined) {
      counter = counter - 1;

      if (counter === 1) {
        break;
      }

      // backtrack, including dodgy indexing
      while (calculateNextStep(area, x, y) === undefined && counter > 1) {
        if (area[`${x}:${y}`] !== '*') {
          area[`${x}:${y}`] = 'v';
        }        const lastStep = findMoveToPreviousStep(area, x, y, counter);
        const nextPos = getNextPosition(lastStep.move, x, y);
        x = nextPos.x;
        y = nextPos.y;
        computer.run([lastStep.move]);
        counter--;
      }
      counter++;

      continue;
    }

    const output = computer.run([input]);
    const status = Number(output[0]);
    const nextPos = getNextPosition(input, x, y);

    // perform the move
    if (status === STATUS.WALL) {
      // just mark wall instead of moving
      area[`${nextPos.x}:${nextPos.y}`] = '#';
    } else if (status === STATUS.MOVED) {
      // set the x,y to the next position
      x = nextPos.x;
      y = nextPos.y;
      // mark new area as visited
      area[`${x}:${y}`] = counter;
      counter++;
    } else if (status === STATUS.MOVED_AND_HIT) {
      // mark the oxygen tank and return
      area[`${nextPos.x}:${nextPos.y}`] = '*';
      x = nextPos.x;
      y = nextPos.y;
      counter++;
    } else {
      throw 'Invalid output status' + output;
    }
  }

  printHull(area);

  // find oxygen
  const [originX, originY] = Object.entries(area).filter(([key, value]) => {
    return value === '*';
  })[0][0].split(':').map(Number);
  console.log('key', originX, originY);

  function getKey(point) {
    return `${point.x}:${point.y}`;
  }

  let oxygenTime = 0;
  let points = [{x: originX, y: originY}];
  while (points.length > 0) {
    const newPoints = [];
    points.forEach(point => {
      const pointValue = getValue(area, point.x, point.y);
      if (pointValue !== '' && pointValue !== '#' && pointValue !== 'O') {
        // mark as visited
        area[getKey(point)] = 'O';

        // add valid neighbours to newPoints
        let a = getValue(area, point.x, point.y - 1);
        if (a !== '' && a !== '#' && a !== 'O') {
          newPoints.push({
            x: point.x,
            y: point.y - 1,
          });
        }
        a = getValue(area, point.x, point.y + 1);
        if (a !== '' && a !== '#' && a !== 'O') {
          newPoints.push({
            x: point.x,
            y: point.y + 1,
          });
        }

        a = getValue(area, point.x + 1, point.y);
        if (a !== '' && a !== '#' && a !== 'O') {
          newPoints.push({
            x: point.x + 1,
            y: point.y,
          });
        }
        a = getValue(area, point.x - 1, point.y);
        if (a !== '' && a !== '#' && a !== 'O') {
          newPoints.push({
            x: point.x - 1,
            y: point.y,
          });
        }
      }
    });

    // termination condition
    if (newPoints.length === 0) {
      printHull(area);
      console.log('time', oxygenTime);
      return oxygenTime;
    }

    points = newPoints;
    oxygenTime++;
  }
}
