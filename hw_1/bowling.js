
const frameResultAfterTwoRolls = () => {
    return 10
}

const cleanUpGameFrame = (gameFrame) => {
    var gameFrame = gameFrame.replace('-', '');
    return gameFrame;
}

const multipleStrikesScore = (gameFrames, gameFrame) => {
    let score = 10
    let i = gameFrames.lastIndexOf(gameFrame) + 1;
    let nextGameFrame = cleanUpGameFrame(gameFrames[i]);
    console.log(nextGameFrame)
    nextGameFrame.split().forEach((roll) => {
        score += parseInt(roll);
    })
    return score;
}

const normalScore = (gameFrame) => {
    let score = 0
    gameFrame.split().forEach((roll) => {
        score += parseInt(roll);
    })
    return score;
}

const STRIKE = 'X'
const SPARE = '/'

const gameResult = (game) => {
    const gameFrames = game.trim().split(" ")
    var score = 0;
    var lastFrame = '';
    gameFrames.forEach((gameFrame) => {

        cleanUpGameFrame(gameFrame)

        if (lastFrame === STRIKE || lastFrame === SPARE) {
            score += 10;

            if (gameFrame === STRIKE) {
                score += multipleStrikesScore(gameFrames, gameFrame)
            } else {
                if (lastFrame === SPARE) {
                    score += normalScore(gameFrame[0])
                } else {
                    score += normalScore(gameFrame)
                }
            }
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