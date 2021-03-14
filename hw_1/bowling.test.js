const { it, expect } = require("@jest/globals");

const bowling = require('./bowling');

const sequenceWithMinusFromOneTo = (upperLimit) => {
    let sequence = ''
    for(let i = 1; i < upperLimit + 1; i++){
        sequence += `${i}- `
    }
    return sequence;
}

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

it('When given 5/ 2- 2- 2- 2- 2- 2- 2- 2- 2- return 30', () => {
    const result = bowling.gameResult('/ ' + '2- '.repeat(9))
    expect(result).toEqual(30);
})

it('When given X 1- 2- 3- 4- 5- 6- 7- 8- 9- return 56', () => {
    const result = bowling.gameResult('X ' + sequenceWithMinusFromOneTo(9));
    expect(result).toEqual(56);
})

it('When given X X 1- 2- 3- 4- 5- 6- 7- 8- return 68', () => {
    const bowlingGame = 'X '.repeat(2) + sequenceWithMinusFromOneTo(8);
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(68);
})

it('When given 5/ 5/ 1- 2- 3- 4- 5- 6- 7- 8- return 67', () => {
    const bowlingGame = '5/ '.repeat(2) + sequenceWithMinusFromOneTo(8);
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(62);
})

it('When given X X X 1- 2- 3- 4- 5- 6- 7- return 90', () => {
    const bowlingGame = 'X '.repeat(3) + sequenceWithMinusFromOneTo(7);
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(90);
})

it('When given X X X X 1- 2- 3- 4- 5- 6- return 113', () => {
    const bowlingGame = 'X '.repeat(4) + sequenceWithMinusFromOneTo(6);
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(113);
})

it('When given X X X X X X X X X X X X return 300', () => {
    const bowlingGame = 'X '.repeat(12);
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(300);
})

it('When given 12 X 34 X 11 11 11 11 11 11 11 11 return 51', () => {
    const bowlingGame = "12 X 34 X 11 11 11 11 11 11";
    const result = bowling.gameResult(bowlingGame);
    expect(result).toEqual(51);
})
