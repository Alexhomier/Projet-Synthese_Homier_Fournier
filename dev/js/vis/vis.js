let spriteList = [];
let currentFrameIndex = 0;

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");

    spriteList.push(new Scene(canvas));
    let grille = new Grille(getGrille(), spriteList[0].getPackImport());
    grille.start();

    tick();
});

function getGrille() {
    if (localStorage.getItem("grille") != null) {
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