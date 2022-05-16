let spriteList = [];
let grille;
let currentFrame;
let currentFrameCount = 0;
let sleepTimePlay = 1;
let timeOutVar;

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");

    spriteList.push(new Scene(canvas));
    spriteList.push(new IndAnimation());
    grille = new Grille(getGrille(), spriteList[0].getPackImport(), spriteList[1]);
    grille.start()
        .then(currentFrame = getFirstFrame());

    setOnClick();

    tick();
});

function getCompatibility() {
    if (window.innerWidth <= 1555 || window.innerHeight <= 818) {
        alert("Votre système n'est malheureusement pas compatible avec nos services, veuillez réessayer avec un autre appareil.");
    }
}

function setOnClick() {
    document.querySelector('.control-command-backward').addEventListener('click', function(e) {
        currentFrame = getPrevFrame();
    });
    setOnClickPlay();
    document.querySelector('.control-command-forward').addEventListener('click', function(e) {
        currentFrame = getNextFrame();
    });
}

function setOnClickPlay() {
    document.querySelector('.control-command-play').addEventListener('click', function(e) {
        if (!!document.querySelector('.control-command-play')) {
            document.querySelector('.control-command-play').className = "control-command-pause";
            setOnClickPause();
            currentFrame = playFrame(true);
        }
    });
}

function setOnClickPause() {
    document.querySelector('.control-command-pause').addEventListener('click', function(e) {
        if (!!document.querySelector('.control-command-pause')) {
            document.querySelector('.control-command-pause').className = "control-command-play";
            setOnClickPlay();
            currentFrame = playFrame(false);
        }
    });
}

function getFirstFrame() {
    currentFrameCount = 0;
    return grille.getFirstFrame();
}

function getNextFrame() {
    let nextFrame = grille.getNextFrame(currentFrame);
    if (nextFrame) {
        currentFrame = nextFrame;
        ++currentFrameCount;
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
        --currentFrameCount;
        return currentFrame;
    } else {
        // Début de la simulation
        return false;
    }
}

function playFrame(play = false) {
    nextFrame = getNextFrame();

    if (play && nextFrame) {
        ++currentFrameCount;
        timeOutVar = setTimeout(function() { playFrame(true); }, sleepTimePlay * 1000);
    } else {
        if (!!document.querySelector('.control-command-pause')) {
            document.querySelector('.control-command-pause').className = "control-command-play";
            setOnClickPlay();
        }
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

    getCompatibility();
    document.querySelector("#currentFrameCount").innerHTML = `Position de la simulation : ${currentFrameCount}`;
    requestAnimationFrame(tick);
};