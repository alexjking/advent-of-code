'use strict';

module.exports = (input) => {

  let layers = {};

  let layerIndexes = [];

  for (let i = 0; i < input.length; i++) {
    let temp = input[i].split(':');
    let index = Number(temp[0]);
    let range = Number(temp[1].trim());

    layers[index] = {
      direction: 'down',
      position: 0,
      range: range,
    };

    layerIndexes.push(index);
  }

  let maxValue = layerIndexes.reduce((a,b) => Math.max(a, b));
  let severity = 0;

  for (let depth = 0; depth <= maxValue; depth++) {
    // console.log('----');
    // console.log('depth', depth);
    // console.log(layers);

    // check if we are on a firewall with a range > 0
    // add to severity if hit
    let currentLayer = layers[depth];
    if (currentLayer && currentLayer.position === 0) {
      severity += depth * currentLayer.range;
    }

    // now move the security scanners
    layerIndexes.forEach(layerIndex => {
      let layer = layers[layerIndex];
      // cases if scanning is moving down
      if (layer.direction === 'down') {
        if (layer.position === (layer.range - 1)) {
          layer.direction = 'up';
          layer.position--;
        } else {
          layer.position++;
        }
      } else {
        // cases if scanner is moving up
        if (layer.position === 0) {
          layer.direction = 'down';
          layer.position++;
        } else {
          layer.position--;
        }
      }
    });
  }

  return severity;
};
