let spriteList = [];

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    let grille = new Grille(getGrille());

    spriteList.push(new Scene(canvas, grille));

    tick();
});

function getGrille() {
    if(localStorage.getItem("grille") != null){
        let grille = localStorage.getItem("grille");
        return JSON.parse(grille);
    } else {
        window.location.href = "build.php";
    }
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }
    requestAnimationFrame(tick);
}