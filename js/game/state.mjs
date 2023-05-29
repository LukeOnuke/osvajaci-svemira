const HIGH_SCORE_KEY = "highScore";
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

export function incrementHighScore(delta){
    setHighScore(getHighScore() + delta);
}