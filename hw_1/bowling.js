
const frameResultAfterTwoRolls = () => {
    return 10
}

const gameResult = (game) => {
    const gameFrames = game.trim().split(" ")
    console.log(gameFrames)
    var score = 0;
    var lastFrame = '';
    gameFrames.forEach((gameFrame) => {
    
        if(lastFrame === 'X'){
            score += 10;
            gameFrame.split().forEach((roll) => {
                score += parseInt(roll);
            })
        }

        if(gameFrame !== 'X')
            gameFrame.split().forEach((roll)=> {
                if(roll !== '-') 
                    score += parseInt(roll);
            })

        lastFrame = gameFrame;
    })

    return score
}

module.exports = {
    frameResultAfterTwoRolls,
    gameResult
}