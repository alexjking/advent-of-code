'use strict';

const _ = require('lodash');

module.exports = (input) => {
    let list = _.times(256);

    let lengths = _.map(_.split(input[0], ','), (str) => {
        return Number(str);
    });

    let skipSize = 0;
    let currentPosition = 0;

    for (let i = 0; i < 64; i++) {
        _.forEach(lengths, (length) => {
            // inore any invalid lengths
            if (length > list.length) {
                return;
            }
            
            // reverse the order of the current length of elements
            let leftIndex = currentPosition;
            let rightIndex = currentPosition + (length - 1);
            
            while (leftIndex < rightIndex) {
                // modified indexes to ensure that they are circular
                let modifiedLeftIndex = leftIndex % (list.length);
                let modifiedRightIndex = rightIndex % (list.length);
                
                // swap values
                let tempLeftValue = list[modifiedLeftIndex];
                list[modifiedLeftIndex] = list[modifiedRightIndex];
                list[modifiedRightIndex] = tempLeftValue;
                
                // increment/decrement pointers
                leftIndex++;
                rightIndex--;
            }
            
            // move current position forward by this length + skip size
            currentPosition = (currentPosition + length + skipSize) % (list.length);
            
            // increase skip size
            skipSize++;
        });
    }
        
    return list;
};
