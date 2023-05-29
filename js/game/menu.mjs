import {getHighScore} from "./state.mjs";
import {playSound, playSoundRepeating} from "./audio.mjs";
import {KEYCODE_SPACE} from "./keys.mjs";

(() => {
    const highScore = document.getElementById("highScore");
    highScore.innerText = `High Score : ${getHighScore()}`;

    window.onkeydown = (k) => {
        playSoundRepeating("/aud/mainMenu.mp3", 1);
        if(k.code === KEYCODE_SPACE) window.location.href = "/game/?1-500"
    }
})();