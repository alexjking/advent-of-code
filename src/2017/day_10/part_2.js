'use strict';

const _ = require('lodash');

const Part1 = require('./part_1');

const getDenseHash = function(sparseHash) {
    let denseHashArray = [];

    let i = 0;

    while (i < sparseHash.length) {
        let xor = sparseHash[i];
        for (let j = 1; j < 16; j++) {
            xor = xor ^ sparseHash[j];
        }

        denseHashArray.push(xor);
        i += 16;
    }

    return denseHashArray;
}


module.exports = (input) => {
    // NOTE: this works according to basic test
    let lengths = _(input)
        .split('')
        .map(character => {
            return character.charCodeAt(0);
        })
        .value();
    lengths = lengths.concat([17, 31, 73, 47, 23]);
    console.log('lengths: ', lengths);

    //////////////////////////
    // TODO: make sure I trim any leading or trailing whitespace
    //

    // NOTE: haven't tested this - not sure how to test this bit!!!
    //       Have I got all the incrementing stuff done right???
    let sparseHash = Part1(_.join(lengths), ',');
    
    // NOTE: this works according ot basic test
    // let test = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22];
    let denseHashArray = getDenseHash(sparseHash);
    console.log(denseHashArray);

    // NOTE: this works according to basic test
    // denseHashArray = [64, 7, 255];
    //convert from dense hash to hex
    return _.reduce(denseHashArray, (memo, number) => {
        let hex = number.toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        return memo + hex;
    }, '');
};
