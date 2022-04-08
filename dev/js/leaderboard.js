let spriteList = [];
let currentTimeSelection = "day";

window.addEventListener("load", () => {
    spriteList.push(new DateSelection());

    tick();
});

function changeTimeBoard() {
    spriteList[0].change();
    if (currentTimeSelection == "day") {
        currentTimeSelection = "all";
    } else {
        currentTimeSelection = "day";
    }
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}