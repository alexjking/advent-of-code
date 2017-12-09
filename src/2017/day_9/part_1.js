'use strict';

const _ = require('lodash');

module.exports = (input) => {
    const stream = input[0].split('');

    let groups = 0;
    let isGarbage = false;

    let groupOpening = 0;

    let i = 0;
    while (i < stream.length) {
        if (stream[i] === '!') {
            i++;
        } else if (isGarbage && stream[i] !== '>') {
            // continue, we are currently in garbage territory
        } else if (isGarbage && stream[i] === '>') {
            isGarbage = false;
        } else if (stream[i] === '{') {
            groupOpening++;
        } else if (stream[i] === '}') {
            groups += groupOpening;
            groupOpening--;
        } else if (stream[i] === '<') {
            isGarbage = true;
        } else if (stream[i] === ',') {
            // lets just ignore this one
        } else {
            // we also ignore any other characters
        }
 
        i++;
    }

    return groups;
};