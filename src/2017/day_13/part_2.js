'use strict';

/**
 * Optimised function to check if passed.
 *
 * All we need to do is to work out whether the scanner is in the 0
 * position. We can do this by checking whether:
 *  delay % (2 * (layerRange - 1)) === 0
 *
 * We calculate almost 4 million delays in ~11s, which is not bad!
 *
 * @param {*} layers
 * @param {*} delay
 */
const checkPassed = (layers, delay) => {
  let layerIds = Object.keys(layers);
  for (let i = 0; i < layerIds.length; i++) {
    let layerId = Number(layerIds[i]);
    let layer = layers[layerId];

    let scannerDelay = delay + layerId;

    if (scannerDelay % (2 * (layer.range - 1)) === 0) {
      return false;
    }
  }
  return true;
};

module.exports = (input) => {
  // setup input
  let layers = {};
  for (let i = 0; i < input.length; i++) {
    let temp = input[i].split(':');
    let index = Number(temp[0]);
    let range = Number(temp[1].trim());

    layers[index] = {
      direction: 'down',
      position: 0,
      range: range,
    };
  }


  let delay = 0;
  let passed = false;
  while (!passed) {
    delay++;
    passed = checkPassed(layers, delay);
  }

  return delay;
};
