'use strict';

// UBUFP
module.exports = input => {
  const str = input[0];
  const layerSize = 25 * 6;

  const strLayers = [];
  for (let i = 0; i < str.length; i += layerSize) {
    strLayers.push(str.substr(i, layerSize));
  }

  // get layers
  const layers = strLayers
    .map(layer => {
      return layer
        .split('')
        .map(Number);
    });

  // for each pixel in the image, find the correct colour
  const image = [];
  for (let i = 0; i < layerSize; i++) {
    let layerIndex = 0;
    while (layerIndex < layers.length && layers[layerIndex][i] === 2) {
      layerIndex++;
    }
    image.push(layers[layerIndex][i]);
  }

  // render
  const rows = [];
  for (let i = 0; i < image.length; i += 25) {
    console.log(image.slice(i, i + 25).join('').split('1').join('■■').split('0').join('  '));
  }

  return 0;
};
