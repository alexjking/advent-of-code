'use strict';

const _ = require('lodash');

const getRegisters = (instructions) => {
    return _.reduce(instructions, (memo, instruction) => {
        memo[instruction.register] = 0;
        return memo;
    }, {});
}

const getInstructions = (input) => {
    return _.map(input, (inputRow) => {
        inputRow = _.trim(inputRow);
        let inputArr = inputRow.split(' ');
        
        let instruction = {};
        instruction.register = inputArr[0];
        
        let increment = Number(inputArr[2]);
        if (inputArr[1] === 'dec') {
            increment = increment * -1;
        }
        instruction.increment = increment;
        
        instruction.conditionRegister = inputArr[4];
        instruction.condition = inputArr[5];
        instruction.conditionValue = Number(inputArr[6]);

        return instruction;
    });
};

const passCondition = (instruction, registers) => {
    let registerValue = registers[instruction.conditionRegister];

    if (_.isUndefined(registerValue)) {
        console.log('UNDEFINED REGISTEER');
    }

    switch (instruction.condition) {
        case '==':
            return registerValue === instruction.conditionValue;
        case '>':
            return registerValue > instruction.conditionValue;
        case '<':
            return registerValue < instruction.conditionValue;
        case '>=':
            return registerValue >= instruction.conditionValue;
        case '<=':
            return registerValue <= instruction.conditionValue;
        case '!=':
            return registerValue !== instruction.conditionValue;
    }

    console.log('ERRORRRR', instruction, registers);
};

module.exports = (input) => {
    let instructions = getInstructions(input);
    let registers = getRegisters(instructions);

    let highestValue = -Infinity;

    _.forEach(instructions, (instruction) => {
        if (passCondition(instruction, registers)) {
            registers[instruction.register] += instruction.increment;
        }

        highestValue = Math.max(highestValue, _.max(_.values(registers)));
    });

    console.log('Highest value: ' + highestValue);

    return _.max(_.values(registers));
};
