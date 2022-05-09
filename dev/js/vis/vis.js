let spriteList = [];
let grille;
let currentFrame;
let sleepTimePlay = 5;
let timeOutVar;

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");

    spriteList.push(new Scene(canvas));
    spriteList.push(new IndAnimation());
    grille = new Grille(getGrille(), spriteList[0].getPackImport(), spriteList[1]);
    grille.start()
        .then(currentFrame = getFirstFrame());

    document.getElementById('canvas').addEventListener('click', function(e) {
        // currentFrame = getNextFrame();
        playFrame(true);
    });

    tick();
});

function getFirstFrame() {
    return grille.getFirstFrame();
}

function getNextFrame() {
    let nextFrame = grille.getNextFrame(currentFrame);
    if (nextFrame) {
        currentFrame = nextFrame;
        return currentFrame;
    } else {
        // fin de la simulation
        return false;
    }
}

function getPrevFrame() {
    let prevFrame = grille.getPrevFrame(currentFrame);
    if (prevFrame) {
        currentFrame = nextFrame;
        return currentFrame;
    } else {
        // Début de la simulation
        return false;
    }
}

function playFrame(play = false) {
    nextFrame = getNextFrame();

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
};