let spriteList = [];

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    let grille = new Grille(getGrille());

    spriteList.push(new Scene(canvas, grille));

    tick();
});

function getGrille() {
    let grille = localStorage.getItem("grille");
    return JSON.parse(grille);
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }
    requestAnimationFrame(tick);
}