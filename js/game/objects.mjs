export function createDivElement(){
    return document.createElement("div");
}

export function createInvader(){
    const invader = createDivElement();
    invader.classList().add("moveable");
    invader.classList().add("invader");
    invader.classList().add("collider");
    return invader;
}

export function createPlayer(){
    const player = createDivElement();
    player.id = "player";
    player.classList().add("collider");
    return player;
}

export function createBullet(left){
    const player = createDivElement();
    player.classList.add("bullet");
    player.classList.add("collider");
    console.log(left);
    player.style.left = left + "px";
    player.style.top = window.innerHeight * 0.8 + "px";
    return player;
}

const gameField = document.getElementById("gameField");
export function addElementToGameField(element){
    gameField.appendChild(element);
}