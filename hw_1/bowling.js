
const frameResultAfterTwoRolls = () => {
    return 10
}

const cleanUpGameFrame = (gameFrame) => {
    var gameFrame = gameFrame.replace('-', '');
    return gameFrame;
}

const normalScore = (gameFrame) => {
    let score = 0
    gameFrame.split().forEach((roll) => {
        score += parseInt(roll);
    })
    return score;
}

const spareScore = (gameFrames, gameFrame) => {
    let score = STRIKE_VALUE

    if (gameFrame === STRIKE) {
        score += multipleStrikesScore(gameFrames, gameFrame)
    } else {
        score += normalScore(gameFrame[0])
    }

    return score
}

const strikeScore = (gameFrames, gameFrameIndex) => {
    const gameFrame = cleanUpGameFrame(gameFrames[gameFrameIndex]);
    score = STRIKE_VALUE;

    if (gameFrame === STRIKE) {
        score += strikeScore(gameFrames, gameFrameIndex + 1)
    } else {
        score += normalScore(gameFrame)
    }

    return score
}

const STRIKE = 'X'
const SPARE = '/'

const STRIKE_VALUE = 10

const gameResult = (game) => {
    const gameFrames = game.trim().split(" ")
    var score = 0;
    var lastFrame = '';
    gameFrames.forEach((gameFrame, gameFrameIndex) => {

        gameFrame = cleanUpGameFrame(gameFrame)

        if (lastFrame === STRIKE) {
            score += strikeScore(gameFrames, gameFrameIndex)
        }

        if (lastFrame === SPARE) {
            score += spareScore(gameFrames, gameFrame)
        }

        if (gameFrame.includes(SPARE)) {
            lastFrame = SPARE
            return
        }

        if (gameFrame !== STRIKE && gameFrame !== SPARE) {
            score += normalScore(gameFrame)
        }

        lastFrame = gameFrame;
    })

    return score
}

module.exports = {
    frameResultAfterTwoRolls,
    gameResult
}