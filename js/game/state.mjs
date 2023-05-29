const HIGH_SCORE_KEY = "tempHighScore";
export function setHighScore(highScore){
    localStorage.setItem(HIGH_SCORE_KEY, highScore);
}

export function getHighScore(){
    const highScore = localStorage.getItem(HIGH_SCORE_KEY);
    if(highScore == null){
        return 0;
    }else{
        return Number(highScore);
    }
}

export function resetTempHighScore(){
    setHighScore(0);
}

export function incrementHighScore(delta){
    setHighScore(getHighScore() + delta);
}

export function solidifyHighScore(){
    let highScore = localStorage.getItem("hs");
    if(highScore == null){
        highScore = 0;
    }else{
        return Number(highScore);
    }

    if(getHighScore() > highScore) localStorage.setItem("hs", getHighScore());
}