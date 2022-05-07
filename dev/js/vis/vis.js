let spriteList = [];
let grille;
let currentFrame;
let sleepTimePlay = 1;
let timeOutVar;

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");

    spriteList.push(new Scene(canvas));
    grille = new Grille(getGrille(), spriteList[0].getPackImport());
    grille.start();
    console.clear();

    currentFrame = grille.setFrameArray();

    getNextFrame();
    console.log(currentFrame)
        // playFrame(true);

    tick();
});

function getNextFrame() {
    let nextFrame = grille.getNextFrame(currentFrame);
    if (nextFrame) {
        currentFrame = nextFrame;
        grille.moveInd(currentFrame.value);
        return true;
    } else {
        // fin de la simulation
        return false;
    }
}

function getPrevFrame() {
    let prevFrame = grille.getPrevFrame(currentFrame);
    if (prevFrame) {
        currentFrame = nextFrame;
        grille.moveInd(currentFrame);
        return true;
    } else {
        // Début de la simulation
        return false;
    }
}

function playFrame(play = false) {
    let nextFrame = getNextFrame();

    if (play && nextFrame) {
        timeOutVar = setTimeout(function() { playFrame(true); }, sleepTimePlay * 1000);
    } else {
        clearTimeout(timeOutVar);
    }
}

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