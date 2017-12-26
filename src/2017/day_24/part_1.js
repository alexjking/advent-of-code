'use strict';

class Bridge {
  constructor(zeroComponent) {
    this.zeroComponent = zeroComponent;
    this.components = [this.zeroComponent];

    let ports = zeroComponent.split('/');
    this.freePort = (ports[0] === '0') ? ports[1] : ports[0];

    this.blocked = false;
  }

  canConnect(component) {
    let ports = component.split('/');
    let validPort = ports[0] === this.freePort || ports[1] === this.freePort;
    return validPort && !this.components.includes(component);
  }

  connect(component) {
    let ports = component.split('/');
    this.freePort = (ports[0] === this.freePort) ? ports[1] : ports[0];
    this.components.push(component);
  }

  getSum() {
    return this.components.reduce((memo, comp) => {
      return memo + comp.split('/').map(x => Number(x)).reduce((sum, x) => sum + x, 0);
    }, 0);
  }
}

module.exports = (input) => {

  let components = input;

  // get the zero ports, the basis for our bridges
  let zeroComponents = input.filter((component) => {
    return component.split('/').some(val => val === '0');
  });

  let currentBridges = zeroComponents.map(zeroComponent => new Bridge(zeroComponent));
  let finishedBridges = [];

  while (currentBridges.length > 0) {
    let tempBridges = [];

    // loop through the bridges
    // - cloning and adding a connector if it is valid
    // - adding it to the finished bridges array if it is done
    currentBridges.slice().reverse().forEach((bridge, index) => {
      let count = 0;
      components.forEach(component => {
        if (bridge.canConnect(component)) {
          let newBridge = new Bridge('x/x');
          newBridge.zeroComponent = JSON.parse(JSON.stringify(bridge.zeroComponent));
          newBridge.components = JSON.parse(JSON.stringify(bridge.components));
          newBridge.freePort = JSON.parse(JSON.stringify(bridge.freePort));
          newBridge.blocked = JSON.parse(JSON.stringify(bridge.blocked));

          newBridge.connect(component);
          tempBridges.push(newBridge);
          count++;
        }
      });

      // if there are no new bridges, then we should add the bridge to the
      // finished bridges.
      // it has not been aded to the tempBridhes, so it will be removed
      // from the current bridhes array
      if (count === 0) {
        finishedBridges.push(bridge);
      }
    });

    currentBridges = tempBridges;
  }

  // string version for debugging
  let strArr = finishedBridges.map(bridge => {
    return bridge.components.join('--');
  });

  // get the sums for each component
  let sums = finishedBridges.map(bridge => {
    return bridge.getSum();
  });

  // find the bridge with the highest value
  let strongestBridgeStrength =  sums.reduce((memo, sum) => {
    return Math.max(memo, sum);
  }, 0);

  // answer: 1511, 37s
  console.log('Part 1:', strongestBridgeStrength);

  // lets find the list of longest bridges from the finished bridges
  let longestBridges = finishedBridges.reduce((memo, bridge) => {
    if (bridge.components.length > memo.length) {
      memo = {
        bridges: [bridge],
        length: bridge.components.length,
      };
    } else if (bridge.components.length == memo.length) {
      memo.bridges.push(bridge);
    }

    return memo;
  }, {
    bridges: [],
    length: 0,
  });

  // lets get the strongest bridge from the set of longest bridges
  let strongestLongestBridge = longestBridges.bridges.reduce((memo, bridge) => {
    let bridgeStrength = bridge.getSum();
    if (bridgeStrength > memo.strength) {
      memo.bridge = bridge;
      memo.strength = bridgeStrength;
    }

    return memo;
  }, {
    bridge: null,
    strength: 0,
  });

  console.log('Part 2:', strongestLongestBridge.strength);
  return strongestLongestBridge.strength;
};
