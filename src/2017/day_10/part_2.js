'use strict';

const _ = require('lodash');
const KnotHash = require('./knot_hash');
const Part1 = require('./part_1');

const getDenseHash = function(sparseHash) {
    let denseHashArray = [];

    for (let i = 0; i < 16; i++) {
        const o = sparseHash.slice(i * 16, i * 16 + 16).reduce((a, b) => a ^ b);
        denseHashArray.push(o);
    }

    return denseHashArray;
};

module.exports = (input) => {
    // convert our input using asci values
    let lengths = _(input)
        .split('')
        .map(character => {
            return character.charCodeAt(0);
        })
        .value();

    // add primes for randomness
    lengths = lengths.concat([17, 31, 73, 47, 23]);

    // run the knot hash 64 times, preseving the skip size and current position
    let sparseHashArr = _.times(256);
    let currentPosition = 0;
    let skipSize = 0;
    for (let i = 0; i < 64; i++) {
        let knotObject = KnotHash(sparseHashArr, lengths, currentPosition, skipSize);
        sparseHashArr = knotObject.hashArr;
        skipSize = knotObject.skipSize;
        currentPosition = knotObject.currentPosition;
    }

    // get dense hash
    let denseHashArray = getDenseHash(sparseHashArr);

    // convert from dense hash to hex string
    return _.reduce(denseHashArray, (memo, number) => {
        let hex = number.toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }

        return memo + hex;
    }, '');
};
