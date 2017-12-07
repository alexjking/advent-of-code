'use strict';

const _ = require('lodash');

module.exports = (input) => {
  let discs = _.map(input, (row) => {
    let items = row.split(' ');

    let object = {};
    object.name = items[0];

    object.weight = Number(items[1].substring(1, items[1].length - 1));

    let childrenNames = [];

    for (let i = 3; i < items.length; i++) {
      let str = items[i];
      str = str.replace(',', '');
      childrenNames.push(str);
    }

    object.childrenNames = childrenNames;

    return object;
  });

  // lets turn this into a map for easy access
  let discsMap = _.reduce(discs, (memo, disc) => {
    memo[disc.name] = disc;
    return memo;
  }, {});

  // loop through the children of each disc,
  // setting the parent of each child
  _.forEach(discsMap, (disc, name) => {
    _.forEach(disc.childrenNames, (childrenName) => {
      if (discsMap[childrenName].parent) {
        discsMap[childrenName].parent.push(name);
      } else {
        discsMap[childrenName].parent = [name];
      }
    });
  });

  // now we know the parents for each disc,
  // lets loop through to find which disc does not have a parent
  return _.first(_.filter(discsMap, (obj) => {
    return obj.parent === undefined;
  }));
};
