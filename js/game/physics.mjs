export function isColliding(obj, obj2) {
    const rect1 = obj.getBoundingClientRect();

    const rect2 = obj2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)
}

export function moveY(element, delta){
    const top = getPxNumber(element.style.top) + delta;
    element.style.top = top + "px";
    return top;
}

export function moveX(element, delta){
    const left = getPxNumber(element.style.left) + delta;
    element.style.left = left + "px";
    console.log(left, element, delta);
    return left;
}

export function getPxNumber(px){
    return Number(px.split("px")[0]);
}