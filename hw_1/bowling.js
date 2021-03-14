
const frameResultAfterTwoRolls = () => {
    return 10
}

const cleanUpGameFrame = (gameFrame) => {
    var gameFrame = gameFrame.replace('-', '');
    return gameFrame;
}

const normalScore = (gameFrame) => {
    let score = 0
    gameFrame.split('').forEach((roll) => {
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

    if (gameFrameIndex + 1 >= 12) {
        return 0;
    }

    const gameFrame = cleanUpGameFrame(gameFrames[gameFrameIndex]);
    score = STRIKE_VALUE;

    if (gameFrame === STRIKE) {
        score += STRIKE_VALUE
        let nextGameFrame = gameFrames[gameFrameIndex + 1]

        if (nextGameFrame === STRIKE) {
            score += STRIKE_VALUE
        } else {
            score += normalScore(nextGameFrame[0])
        }

    } else {
        score += normalScore(gameFrame)
    }

    return score
}

const STRIKE = 'X'
const SPARE = '/'

const STRIKE_VALUE = 10
const MAX_FRAMES_PER_GAME = 10

const isLastFrame = (gameFrame) => {
    return gameFrame.split('').length > 2
}

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
            
            if(isLastFrame(gameFrame)){
                score += STRIKE_VALUE
                score += normalScore(gameFrame.substr(2))
            }

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