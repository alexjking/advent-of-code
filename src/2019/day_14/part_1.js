'use strict';

const spares = {};

function getRequiredOre2(mineral, amount, spec, level) {
  if (mineral === 'ORE') {
    return amount;
  }
  const pad = "  ".repeat(level);

  console.log(`${pad}Require ${amount} ${mineral}`);
  const spareAvailable = spares.hasOwnProperty(mineral) ? spares[mineral] : 0;

  if (spareAvailable > amount) {
    console.log(`${pad}Just using spares for ${mineral}`);
    spares[mineral] -= amount;
    return 0;
  }


  const stillNeed = amount - spareAvailable;
  console.log(`${pad}Still need ${amount - spareAvailable} ${mineral}`);

  // use Math.ceil because we need whole numbers
  const reactions = Math.ceil(stillNeed / spec[mineral].amountProvided);
  const produced = reactions * spec[mineral].amountProvided;
  console.log(`${pad}${reactions} reactions will produce ${produced} ${mineral}`);
  const spareRemaining = spareAvailable + produced - amount;
  console.log(`${pad}Leaving ${spareRemaining} spare`);

  spares[mineral] = spareRemaining;

  // requirements
  const coalRequired = spec[mineral].requirements
    .map(requirement => {
      console.log(`${pad}Need ${requirement.amountNeeded} of ${requirement.mineral}`);
      return getRequiredOre2(requirement.mineral, requirement.amountNeeded * reactions, spec, level + 1);
    })
    .reduce((acc, temp) => acc + temp);

  return coalRequired;
}

function genRequirementsSpec(input) {
  return input
    .filter(line => line !== '')
    .reduce((acc, line) => {
      const [left, right] = line.split('=>');
      const [amountProvided, mineral] = right.trim().split(' ');

      const requirements = left.trim().split(',').map(entry => {
        const [amountNeeded, requiredMineral] = entry.trim().split(' ');
        return {
          amountNeeded: Number(amountNeeded.trim()),
          mineral: requiredMineral.trim(),
        };
      });

      return {
        ...acc,
        [mineral]: {
          amountProvided: Number(amountProvided.trim()),
          requirements,
        }
      };
    }, {});
}

module.exports = input => {
  const requirementsSpec = genRequirementsSpec(input);
  return getRequiredOre2('FUEL', 1, requirementsSpec, 0);
}

module.exports.genRequirementsSpec = genRequirementsSpec;
