'use strict';

const {genRequirementsSpec} = require('./part_1');

const spares = {};

function getRequiredOreExact(mineral, amount, spec, level) {
  if (mineral === 'ORE') {
    return amount;
  }

  const spareAvailable = spares.hasOwnProperty(mineral) ? spares[mineral] : 0;
  if (spareAvailable > amount) {
    spares[mineral] -= amount;
    return 0;
  }

  const stillNeed = amount - spareAvailable;
  // use exact amounts here (the only thing different to part 1)
  const reactions = stillNeed / spec[mineral].amountProvided;
  const produced = reactions * spec[mineral].amountProvided;
  const spareRemaining = spareAvailable + produced - amount;

  spares[mineral] = spareRemaining;

  // requirements
  const coalRequired = spec[mineral].requirements
    .map(requirement => {
      return getRequiredOreExact(requirement.mineral, requirement.amountNeeded * reactions, spec, level + 1);
    })
    .reduce((acc, temp) => acc + temp);

  return coalRequired;
}

// 7659732
module.exports = input => {
  const requirementsSpec = genRequirementsSpec(input);
  // get the exact ore required for a single fuel
  const result = getRequiredOreExact('FUEL', 1, requirementsSpec, 0);

  // find number of times we can fit this into 1 trillion ores
  return Math.floor(1000000000000 / result);
}
