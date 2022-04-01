let spriteList = [];
let grille = [];
let isfullscreen = false;
let gridisFullscreen = false;
let currentSelection = "Salle";
const GRIDSIZE = 2500;


window.addEventListener("load", () => {
    setHeightOfGrid();
    createGrid();
    resizeGridStart();
    setCurrentSelectionText();
    updateScrollBar();
    setUpMultipleSelection();
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
        document.exitFullscreen()
            .catch((err) => null);
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

function setSelectionSalle() {
    currentSelection = "Salle";
    setCurrentSelectionText();
}

function setSelectionCouloir() {
    currentSelection = "Couloir";
    setCurrentSelectionText();
}

function setCurrentSelectionText() {
    let text = document.querySelector(".left-panel-info-value-selection");
    let btnCouloir = document.querySelector(".left-panel-button-item-couloir");
    let btnSalle = document.querySelector(".left-panel-button-item-salle");
    text.innerHTML = `Sélection courante : ${currentSelection}`;
    if (currentSelection == "Couloir") {
        btnSalle.style.boxShadow = "none";
        btnCouloir.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    } else if (currentSelection == "Salle") {
        btnCouloir.style.boxShadow = "none";
        btnSalle.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    }
}

function updateScrollBar() {
    let textIndSalle = document.querySelector(".left-panel-info-value-selection-sb");
    let scrollbarValue = document.querySelector(".left-panel-info-scrollbar").value;

    textIndSalle.innerHTML = `Individus par salle : ${scrollbarValue}`;
}


// Multiple Selection library : https://github.com/Simonwep/selection/tree/master/packages/vanilla
// Exemple : https://github.com/Simonwep/selection/blob/master/packages/vanilla/demo/index.ts
function setUpMultipleSelection() {
    let arrayLastSelection = [];

    import ("https://cdn.jsdelivr.net/npm/@viselect/vanilla/lib/viselect.esm.js")
    .then(obj => obj = SelectionArea)
        .catch(err => console.error(err));

    const selection = new SelectionArea({
        selectables: ["body > div > grid > div"],
        boundaries: ['body > div > grid'],
    });

    selection.on('start', evt => {
        selection.clearSelection(true);
        arrayLastSelection = []
    }).on('move', evt => {
        arrayLastSelection.forEach(select => {
            if (!evt.store.selected.includes(select)) {
                document.getElementById(select.id).style.backgroundColor = "transparent";
            }
        })
        evt.store.selected.forEach(element => {
            document.getElementById(element.id).style.backgroundColor = "#444444";
        });
        arrayLastSelection = evt.store.selected;
    }).on('stop', evt => {
        evt.store.selected.forEach(element => {
            document.getElementById(element.id).style.backgroundColor = "transparent";
            let tempPos = element.id.split(",");
            grille[tempPos[0]][tempPos[1]].setCase(currentSelection);
        });

        for (let x = -25; x < grille.length; x++) {
            for (let y = -25; y < grille[x].length; y++) {
                grille[x][y].checkState();
            }
        }
    });
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}