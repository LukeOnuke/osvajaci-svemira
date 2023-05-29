import { KEYCODE_A, KEYCODE_D, KEYCODE_SPACE } from "./keys.mjs";
import { addElementToGameField, createBullet } from "./objects.mjs";
import { getPxNumber, isColliding, moveX, moveY } from "./physics.mjs";

let keyPressedArray = [];
const player = document.getElementById("player");

const playerMoveDelta = 10;
const bulletMoveDelta = 1;
const bulletTimeOut = 500;

let lastBulletFiredTimestamp = Date.now();

(() => {
    for(const element of document.getElementsByClassName("bullet")){
        element.style.top = window.innerHeight * 0.8 + "px";   
    }

    window.onkeyup = function(e){
        keyPressedArray.splice(keyPressedArray.indexOf(e.keyCode));
    };

    window.onkeydown = function(e){
        if(!keyPressedArray.includes(e.keyCode)) keyPressedArray.push(e.keyCode);

        
        if(lastBulletFiredTimestamp > Date.now()){
            console.log(Date.now(), lastBulletFiredTimestamp)
            let playerLeftOffset = getPxNumber(player.style.left);
            addElementToGameField(createBullet(playerLeftOffset));
        }
    };

    let moveBlocky = setInterval(function (){
        //Game loop
        for(const element of document.getElementsByClassName("moveable")){
            const top = moveY(element, element.offsetHeight);

            if(!element.classList.contains("invader")) continue;
            if(top > window.innerHeight * 0.8) die();
        }
    }, 500);

    let gameLoop = setInterval(function (){
        if(keyPressedArray.includes(KEYCODE_A)) moveX(player, -playerMoveDelta);
        if(keyPressedArray.includes(KEYCODE_D)) moveX(player, playerMoveDelta);
        if(keyPressedArray.includes(KEYCODE_SPACE)) {
            
        }

        for(const bullet of document.getElementsByClassName("bullet")){
            let top = moveY(bullet, -bulletMoveDelta);
            if (top < -100) bullet.remove();

            for(const invader of document.getElementsByClassName("moveable")){
                if(!isColliding(invader, bullet)) continue;
                bullet.remove();
                invader.remove();
            }
        }
    }, 32);
})();

function die(){
    window.location.replace("/dead");
}
