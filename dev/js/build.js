let spriteList = [];
let grille = [];
let isfullscreen = false;
let gridisFullscreen = false;
const GRIDSIZE = 2500;

window.addEventListener("load", () => {
    setHeightOfGrid();
    createGrid();
    resizeGridStart();
    tick();
});

function setHeightOfGrid() {
    let grid = document.querySelector(".grid");
    let pourcentage = grid.offsetWidth / screen.height * 100;
    grid.style.height = pourcentage + "%";
}

function createGrid() {
    let sideCalc = (Math.sqrt(GRIDSIZE) / 2);
    for (let x = -sideCalc; x <= sideCalc; x++) {
        grille[x] = [];
        for (let y = -sideCalc; y <= sideCalc; y++) {
            grille[x][y] = new Case(x, y);
        }
    }
}

function resizeGridStart() {
    document.querySelector(".grid").style.height = "40%";
    setHeightOfGrid()
}

function resizeUp() {
    let grid = document.querySelector(".grid");
    let pourcWidth = grid.offsetWidth / screen.width * 100;
    grid.style.transform = `translateY(${pourcWidth/4.5}%)`;
    grid.style.width = (pourcWidth + 10) + "%";
    console.log(pourcWidth)
    grid.style.width
    resizeGridStart()
}

function resizeDown() {
    let grid = document.querySelector(".grid");
    let pourcWidth = grid.offsetWidth / screen.width * 100;
    if (pourcWidth >= 40) {
        grid.style.width = (pourcWidth - 10) + "%";
        resizeGridStart()
    }
}

function fullScreen() {
    if (isfullscreen || gridisFullscreen) {
        document.exitFullscreen();
        isfullscreen = false;
        gridisFullscreen = false;
    }
    document.querySelector(".grid").style.transform = `translateY(0%)`;
    isfullscreen = true;
    document.body.requestFullscreen();
}

function gridFullScreen() {
    gridisFullscreen = true;
    document.querySelector(".grid").requestFullscreen();
}

function closeMenu() {
    document.querySelector(".left-panel").style.display = "none";
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}