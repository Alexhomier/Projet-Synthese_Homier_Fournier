/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Main JS pour la page visualisation.php                    //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
let spriteList = [];
let grille;
let currentFrame;
let currentFrameCount = 0;
let play = false;

window.addEventListener("load", () => {
    getIfIDValid();
    const canvas = document.getElementById("canvas");

    spriteList.push(new Scene(canvas));
    spriteList.push(new IndAnimation());
    grille = new Grille(getGrille(), spriteList[0].getPackImport(), spriteList[1]);
    grille.start()
        .then(currentFrame = getFirstFrame());

    tick();
});

function getIfIDValid() {
    if (!localStorage.getItem("id")) {
        location.href = "/";
    }
}


function getCompatibility() {
    if (window.innerWidth <= 1555 || window.innerHeight <= 818) {
        alert("Votre système n'est malheureusement pas compatible avec nos services, veuillez réessayer avec un autre appareil.");
    }
}

function onClickPlay() {
    document.querySelector('.control-command-play').style.display = "none";
    document.querySelector('.control-command-pause').style.display = "inline-flex";
    play = true;
}

function onClickPause() {
    document.querySelector('.control-command-play').style.display = "inline-flex";
    document.querySelector('.control-command-pause').style.display = "none";
    play = false;
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
        currentFrame = prevFrame;
        --currentFrameCount;
        return currentFrame;
    } else {
        // Début de la simulation
        return false;
    }
}

function getGrille() {
    if (localStorage.getItem("grille") != null) {
        let infos = localStorage.getItem("grille");
        let jsonLoad = JSON.parse(infos);
        let grille = jsonLoad.Grille;
        let individus = JSON.parse(jsonLoad.Individu);
        let blocked = JSON.parse(jsonLoad.Blocked);
        let frames = JSON.parse(jsonLoad.Frames);
        infos = {
            grille: grille,
            individus: individus.individus,
            blocked: blocked.Blocked,
            frames: frames.Frames
        };
        return infos;
    } else {
        window.location.href = "build";
    }
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    if (play) {
        nextFrame = getNextFrame();
        if (!nextFrame) {
            onClickPause();
        }
    }
    getCompatibility();
    getIfIDValid();
    document.querySelector("#currentFrameCount").innerHTML = `Position de la simulation : ${currentFrameCount}`;
    requestAnimationFrame(tick);
};