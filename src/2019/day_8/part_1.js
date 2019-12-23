'use strict';

// 1677
module.exports = input => {
  const str = input[0];
  const layerSize = 25 * 6;

  const strLayers = [];
  for (let i = 0; i < str.length; i += layerSize) {
    strLayers.push(str.substr(i, layerSize));
  }

  const layers = strLayers
    .map(layer => {
      return layer
        .split('')
        .map(Number)
        .reduce((acc, digit) => {
          acc[digit]++
          return acc;
        }, {0: 0, 1: 0, 2: 0});
    })
    .sort((a, b) => a[0] - b[0]);

  return layers[0][1] * layers[0][2];
}
