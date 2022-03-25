let spriteList = [];
let grille = [];
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

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}