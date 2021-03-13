const { it, expect } = require("@jest/globals");

const bowling = require('./bowling');


it('When given 1 and 9 return 10', () => {
    const result =bowling.frameResultAfterTwoRolls('19');
    expect(result).toEqual(10);
})

it('When given 1- 1- 1- 1- 1- 1- 1- 1- 1- 1- return 10', () => {
    const result = bowling.gameResult('1- ' * 10);
    expect(result).toEqual(10);
})