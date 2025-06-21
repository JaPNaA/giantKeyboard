/** @type {HTMLInputElement} */ // @ts-ignore
const input = document.getElementById("input");

let v = "";

document.querySelectorAll(".keyboard > div").forEach(x => {
    x.classList.add("keyboardKey");
    x.setAttribute("tabindex", "0");
});

document.querySelector(".keyboard")?.addEventListener("click", (e) => {
    // @ts-ignore
    const key = findParentKey(e.target);
    if (!key) { return; }
    if (key.id === "space") {
        v += " ";
    } else if (key.id === "backspace") {
        v = v.slice(0, -1);
    } else {
        v += key.innerText;
    }
    updateV();
});

// detect right swipe gesture
let startTouchY = 0;
let startTouchX = 0;

document.body.addEventListener("touchstart", (e) => {
    startTouchY = e.changedTouches[0].clientY;
    startTouchX = e.changedTouches[0].clientX;
});

document.body.addEventListener("touchend", (e) => {
    const changedTouch = e.changedTouches[0];
    if (Math.abs(changedTouch.clientY - startTouchY) < 40) {
        if (
            changedTouch.clientX > startTouchX + 50
        ) {
            v += " ";
        } else if (
            changedTouch.clientX < startTouchX - 50
        ) {
            v = v.slice(0, -1);
        }
        updateV();
    }
});

function updateV() {
    input.innerText = v + "|";
}


/**
 * @param {EventTarget} elm 
 */
function findParentKey(elm) {
    /** @type {HTMLElement | null} */ // @ts-ignore
    let curr = elm;
    while (curr && !curr.classList.contains("keyboardKey")) {
        curr = curr.parentElement;
    }
    return curr;
}