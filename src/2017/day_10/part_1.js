'use strict';

const _ = require('lodash');
const KnotHash = require('./knot_hash');

module.exports = (input) => {
    let lengths = _.map(_.split(input[0], ','), (str) => {
        return Number(str);
    });

    let knotHash = KnotHash(_.times(256), lengths, 0, 0).hashArr;
    return knotHash[0] * knotHash[1];
};
