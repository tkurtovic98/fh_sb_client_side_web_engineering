const { it, expect } = require("@jest/globals");

const bowling = require('./bowling');

it('When given 1 and 9 return 10', () => {
    const result =bowling.frameResultAfterTwoRolls('19');
    expect(result).toEqual(10);
})

it('When given 1- 1- 1- 1- 1- 1- 1- 1- 1- 1- return 10', () => {
    const result = bowling.gameResult('1- '.repeat(10));
    expect(result).toEqual(10);
})

it('When given X 1- 1- 1- 1- 1- 1- 1- 1- 1- return 20', () => {
    const result = bowling.gameResult('X ' + '1- '.repeat(9));
    expect(result).toEqual(20);
})

it('When given / 2- 2- 2- 2- 2- 2- 2- 2- 2- return 30', () => {
    const result = bowling.gameResult('/ ' + '2- '.repeat(9))
    expect(result).toEqual(30);
})

const sequenceWithMinusFromOneTo = (upperLimit) => {
    let sequence = ''
    for(let i = 1; i < upperLimit + 1; i++){
        sequence += `${i}- `
    }
    return sequence;
}

it('When given X X 1- 2- 3- 4- 5- 6- 7- 8- return 68', () => {
    const bowlingGame = 'X '.repeat(2) + sequenceWithMinusFromOneTo(8);
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(68);
})