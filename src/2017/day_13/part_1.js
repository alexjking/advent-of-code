'use strict';


const moveSecurityScanners = (layers) => {
  Object.keys(layers).forEach(layerIndex => {
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

  return layers;
}

module.exports = (input, delayLength) => {
  // give delayLength default if 0
  if (delayLength === undefined) {
    delayLength = 0;
  }

  // setup input
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

  // get max depth so we know how far to loop
  let maxDepth = layerIndexes.reduce((a,b) => Math.max(a, b));

  // lets delay our start, but move the secuirty scanners along
  for (let i = 0; i < delayLength; i++) {
    layers = moveSecurityScanners(layers);
  }

  let severity = 0;
  for (let depth = 0; depth <= maxDepth; depth++) {
    let currentLayer = layers[depth];

    // check if we are on a firewall where the scanner is on the 0 position
    // add to severity if hit
    if (currentLayer && currentLayer.position == 0) {
      severity += depth * currentLayer.range;
    }

    // now move the security scanners
    layers = moveSecurityScanners(layers);
  }

  return severity;
};
