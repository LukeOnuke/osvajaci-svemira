import {KEYCODE_A, KEYCODE_D, KEYCODE_ESCAPE, KEYCODE_S, KEYCODE_SPACE} from "./keys.mjs";
import {addElementToGameField, createBullet, createInvader} from "./objects.mjs";
import {convertRemToPixels, getPxNumber, isColliding, moveX, moveY} from "./physics.mjs";
import {EXPLOSION, LASER_SHOOT, playSound, playSoundRepeating} from "./audio.mjs";
import {getHighScore, incrementHighScore, resetTempHighScore, solidifyHighScore} from "./state.mjs";

let keyPressedArray = [];
const player = document.getElementById("player");
const highScoreDisplay = document.getElementById("highScore");
const currentLevelDisplay = document.getElementById("currentLevel");

const gameField = document.getElementById("gameField");
const gameFieldLeft = gameField.offsetLeft;
const gameFiledWidth = gameField.offsetWidth;

const playerMoveDelta = 10;
const bulletMoveDelta = 1;
const bulletTimeOut = 500;

let lastBulletFiredTimestamp = Date.now();
const bulletWidth = convertRemToPixels(1.5);

let blockyMoveCycleCounter = 0;

//Default url parameters ?1-500
const splitUrlParameters = window.location.href.split("?")[1].split("-");
const invaderSpawnAmount = Number(splitUrlParameters[0]);
const fireSpeed = Number(splitUrlParameters[1]);
console.log("Url parameters" + window.location.href + " invaderSpawnAmount=" + invaderSpawnAmount + " fireSpeed=" + fireSpeed);

let heatDamage = 0;

(() => {
    currentLevelDisplay.innerText = `Level ${invaderSpawnAmount}`;
    incrementAndDisplayHighScore(0);

    player.style.left = (gameFieldLeft + gameFiledWidth / 2) + "px";

    for (let i = 0; i < invaderSpawnAmount; i++) {
        createInvaderRow(-i);
    }

    window.onkeyup = function (e) {
        keyPressedArray.splice(keyPressedArray.indexOf(e.code));
    };

    window.onkeydown = function (e) {
        if (!keyPressedArray.includes(e.code)) keyPressedArray.push(e.code);

        if (e.code === KEYCODE_ESCAPE) die();
    };

    let moveBlocky = setInterval(function () {
        //Game loop
        if (blockyMoveCycleCounter < 10) {
            blockyMoveCycleCounter++;
            return;
        } else {
            blockyMoveCycleCounter = 0;
        }
        for (const element of document.getElementsByClassName("movable")) {
            const top = moveY(element, element.offsetHeight);

            if (!element.classList.contains("invader")) continue;
            if (top > window.innerHeight * 0.7) die();
        }

        damageHeat(-heatDamage / 20 - (1 / (1000 / bulletTimeOut)));
    }, 100);

    let gameLoop = setInterval(function () {
        let localPlayerDelta = playerMoveDelta;
        if (keyPressedArray.includes(KEYCODE_S)) localPlayerDelta = playerMoveDelta * 0.5;

        if (keyPressedArray.includes(KEYCODE_A)
            && player.offsetLeft > gameFieldLeft) moveX(player, -localPlayerDelta);
        if (keyPressedArray.includes(KEYCODE_D)
            && player.offsetLeft + player.offsetWidth < gameFieldLeft + gameFiledWidth) moveX(player, localPlayerDelta);

        if (keyPressedArray.includes(KEYCODE_SPACE)) {
            if (lastBulletFiredTimestamp + fireSpeed < Date.now()) {
                lastBulletFiredTimestamp = Date.now();
                let playerLeftOffset = getPxNumber(player.style.left);
                addElementToGameField(createBullet(playerLeftOffset + player.offsetWidth / 2 - bulletWidth / 2));
                damageHeat(1);
                playSound(LASER_SHOOT);
            }
        }

        for (const bullet of document.getElementsByClassName("bullet")) {
            let top = moveY(bullet, -bulletMoveDelta);
            if (top < -100) bullet.remove();

            const movables = document.getElementsByClassName("movable");
            for (const invader of document.getElementsByClassName("movable")) {
                if (!isColliding(invader, bullet)) continue;
                bullet.remove();
                invader.remove();
                playSound(EXPLOSION);
                incrementAndDisplayHighScore(1);
                if (movables.length <= 2) victory();
                //Dva jer racunamo pre nego sto je poslednjeg izvadio
            }
        }

        if (heatDamage > invaderSpawnAmount * 6) die();
    }, 32);

    playSoundRepeating("/aud/game.mp3", 0.4);
})();

function die() {
    window.location.replace("/dead");
    solidifyHighScore();
    resetTempHighScore();
}

function victory() {
    window.location.replace(`/game/?${invaderSpawnAmount + 1}-${fireSpeed * 2 / 3}`);
}

function incrementAndDisplayHighScore(delta){
    incrementHighScore(delta);
    highScoreDisplay.innerText = `High score : ${getHighScore()}`;
}

function damageHeat(damage) {
    heatDamage += damage;
    if (heatDamage < 0) heatDamage = 0;
    player.style.filter = `brightness(${heatDamage / (1500 / fireSpeed) * 200 + 100}%)`;
}

function createInvaderRow(height) {
    const invaderWidth = convertRemToPixels(10);
    const calculatedHeight = invaderWidth * 1.2;
    const count = Math.floor(gameFiledWidth / invaderWidth);

    for (let i = 0; i < count; i++) {
        addElementToGameField(createInvader(i * invaderWidth + gameFieldLeft + (invaderWidth * 0.5) / 2, calculatedHeight * height));
    }
}
