const gameField = document.getElementById("gameField");
export function createDivElement(){
    return document.createElement("div");
}

export function createInvader(left, top){
    const invader = createDivElement();
    invader.classList.add("movable");
    invader.classList.add("invader");
    invader.classList.add("collider");
    invader.style.left = left + "px";
    invader.style.top = top + "px";

    invader.style.backgroundImage = `url('/img/invader${Math.round(Math.random()*4)+1}.png')`;

    return invader;
}

export function createPlayer(){
    const player = createDivElement();
    player.id = "player";
    player.classList.add("collider");
    return player;
}

export function createBullet(left){
    const player = createDivElement();
    player.classList.add("bullet");
    player.classList.add("collider");
    player.style.left = left + "px";
    player.style.top = gameField.offsetHeight * 0.8 + "px";
    return player;
}


export function addElementToGameField(element){
    gameField.appendChild(element);
}