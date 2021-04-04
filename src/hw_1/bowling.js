
const STRIKE = 'X'
const SPARE = '/'

const STRIKE_VALUE = 10
const MAX_FRAMES_PER_GAME = 10

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

const spareScore = (gameFrame) => {
    let score = STRIKE_VALUE

    if (gameFrame === STRIKE) {
        score += STRIKE_VALUE
    } else {
        score += normalScore(gameFrame[0])
    }

    return score
}

const strikeScore = (gameFrames, gameFrameIndex) => {

    const maxFrames = gameFrames.length

    if(gameFrameIndex + 1 === maxFrames){
        return 0;
    }

    const gameFrame = cleanUpGameFrame(gameFrames[gameFrameIndex]);
    let score = STRIKE_VALUE;

    if (gameFrame === STRIKE) {
        score += STRIKE_VALUE
        let nextGameFrame = gameFrames[gameFrameIndex + 1]

        if (nextGameFrame === STRIKE) {
            score += STRIKE_VALUE
        } else {
            score += normalScore(nextGameFrame[0])
        }

    } else {
        if(gameFrame.includes(SPARE)){
            score+= STRIKE_VALUE;
        } else {
            score += normalScore(gameFrame)
        }
    }

    return score
}


const isLastFrame = (gameFrameIndex) => {
    return gameFrameIndex + 1 === MAX_FRAMES_PER_GAME
}

const lastFrameType = (lastFrame) => {

    if(lastFrame === STRIKE) {
        return STRIKE;
    }

    if(lastFrame.includes(SPARE)){
        return SPARE
    }

    return 'NUM'

}

const lastFrameScore = (lastFrame) => {
    let score = 0;

    const frameType = lastFrameType(lastFrame[0])

    if(frameType === STRIKE) {

        if(lastFrame[1] !== STRIKE && lastFrame[2] !== STRIKE) {
            score += STRIKE_VALUE
            lastFrame.slice(1).forEach(gameFrame => {
                score += normalScore(gameFrame)
            })
        } else {
            score += strikeScore(lastFrame, 0)
        }

    }

    if(frameType === SPARE){
        score += spareScore(cleanUpGameFrame(lastFrame[1]))
    }

    if(frameType !== STRIKE && frameType !== SPARE) {
        score += normalScore(cleanUpGameFrame(lastFrame[0]))
    }

    return score;
}

const gameResult = (game) => {
    const gameFrames = game.trim().split(" ")
    var score = 0;
    var lastFrame = '';

    let gameFrameIndex = 0;

    while(true) {

        var gameFrame = cleanUpGameFrame(gameFrames[gameFrameIndex])

        if(isLastFrame(gameFrameIndex)) {

            if (lastFrame === STRIKE) {
                score += strikeScore(gameFrames, gameFrameIndex)
            }

            if (lastFrame === SPARE) {
                score += spareScore(gameFrame)
            }

            score += lastFrameScore(gameFrames.slice(gameFrameIndex))
            break;
        }
        
        if (lastFrame === STRIKE) {
            score += strikeScore(gameFrames, gameFrameIndex)
        }

        if (lastFrame === SPARE) {
            score += spareScore(gameFrame)
        }

        if (gameFrame.includes(SPARE)) {
            lastFrame = SPARE
            gameFrameIndex++
            continue;
        }

        if (gameFrame !== STRIKE && gameFrame !== SPARE) {
            score += normalScore(gameFrame)
        }

        lastFrame = gameFrame;
        gameFrameIndex++;
    }
    return score
}

module.exports = {
    frameResultAfterTwoRolls,
    gameResult,
    spareScore,
    strikeScore,
    lastFrameScore
}