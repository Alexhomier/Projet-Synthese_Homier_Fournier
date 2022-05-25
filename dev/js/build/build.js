/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Main JS pour la page build.php                            //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
let grille;
let isfullscreen = false;
let currentSelection = "Salle";
let controlPanelIsOpen = true;
let keysPressed = {};
let isPresent = false;

const GRIDSIZE = 2500;

window.addEventListener("load", () => {
    getIfIDValid();
    grille = new Grille(GRIDSIZE);
    grille.setHeight();
    grille.createGrid();
    grille.resizeGridStart();
    setCurrentSelectionText();
    updateScrollBar();
    setUpMultipleSelection();
    keylistener();
    document.querySelector(".loading").style.display = "none";
    tick();
});

function getIfIDValid() {
    if (!localStorage.getItem("id")) {
        location.href = "/";
    }
}

function getCompatibility() {
    if (window.innerWidth <= 977 || window.innerHeight <= 709) {
        alert("Votre système n'est malheureusement pas compatible avec nos services, veuillez réessayer avec un autre appareil.");
    }
}

function keylistener() {
    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;

        if (keysPressed['Alt'] && event.key == 'z') {
            setSelectionCouloir();
        }
        if (keysPressed['Alt'] && event.key == 'x') {
            setSelectionSalle();
        }
        if (keysPressed['Alt'] && event.key == 'c') {
            setSelectionDoor();
        }
        if (keysPressed['Alt'] && event.key == 'v') {
            setSelectionEfface();
        }
    });

    document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
    });
}

function fullScreen() {
    if (isfullscreen || grille.gridisFullscreen) {
        document.exitFullscreen()
            .catch((err) => null);
        isfullscreen = false;
        gridisFullscreen = false;
    }
    grille.gridDOM.style.transform = `translateY(0%)`;
    isfullscreen = true;
    document.body.requestFullscreen();
}

function openCloseControlPanel() {
    if (controlPanelIsOpen) {
        document.querySelector(".left-panel").style.display = "none";
        document.querySelector(".open-menu-button").style.display = "flex";
        controlPanelIsOpen = false;
    } else {
        document.querySelector(".left-panel").style.display = "flex";
        document.querySelector(".open-menu-button").style.display = "none";
        controlPanelIsOpen = true;
    }
}

function setSelectionSalle() {
    currentSelection = "Salle";
    setCurrentSelectionText();
}

function setSelectionCouloir() {
    currentSelection = "Couloir";
    setCurrentSelectionText();
}

function setSelectionDoor() {
    currentSelection = "Porte";
    setCurrentSelectionText();
    grille.fillEmptyCase();
}

function setSelectionEfface() {
    currentSelection = "Efface";
    grille.reinitMinMax();
    setCurrentSelectionText();
}

function setCurrentSelectionText() {
    let text = document.querySelector(".left-panel-info-value-selection");
    let btnCouloir = document.querySelector(".left-panel-button-item-couloir");
    let btnSalle = document.querySelector(".left-panel-button-item-salle");
    let btnDoor = document.querySelector(".left-panel-button-item-door");
    let btnEfface = document.querySelector(".left-panel-button-item-efface");
    text.innerHTML = `Sélection courante : ${currentSelection}`;
    if (currentSelection == "Couloir") {
        btnSalle.style.boxShadow = "none";
        btnEfface.style.boxShadow = "none";
        btnDoor.style.boxShadow = "none";
        btnCouloir.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    } else if (currentSelection == "Salle") {
        btnCouloir.style.boxShadow = "none";
        btnEfface.style.boxShadow = "none";
        btnDoor.style.boxShadow = "none";
        btnSalle.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    } else if (currentSelection == "Porte") {
        btnEfface.style.boxShadow = "none";
        btnCouloir.style.boxShadow = "none";
        btnSalle.style.boxShadow = "none";
        btnDoor.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    } else if (currentSelection == "Efface") {
        btnEfface.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
        btnCouloir.style.boxShadow = "none";
        btnSalle.style.boxShadow = "none";
        btnDoor.style.boxShadow = "none";
    }
}

function updateScrollBar() {
    let textIndSalle = document.querySelector(".left-panel-info-value-selection-sb");
    let scrollbarValue = document.querySelector(".left-panel-info-scrollbar").value;

    grille.setIndBySalle(scrollbarValue);
    textIndSalle.innerHTML = `Individus par salle : ${scrollbarValue}`;
}

function seeLeaderboard() {
    window.location.href = "leaderboard";
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
        arrayLastSelection = [];
    }).on('move', evt => {
        arrayLastSelection.forEach(select => {
            if (!evt.store.selected.includes(select)) {
                document.getElementById(select.id).style.backgroundColor = "transparent";
            }
        });
        evt.store.selected.forEach(element => {
            document.getElementById(element.id).style.backgroundColor = "#444444";
        });
        arrayLastSelection = evt.store.selected;
    }).on('stop', evt => {
        evt.store.selected.forEach(element => {
            document.getElementById(element.id).style.backgroundColor = "transparent";
            let tempPos = element.id.split(",");
            if (currentSelection == "Efface") {
                grille.setCase(tempPos[0], [tempPos[1]], null);
            } else {
                grille.setCase(tempPos[0], [tempPos[1]], currentSelection);
            }
        });

        if (currentSelection == "Porte") {
            let lastPoint = evt.store.selected.pop().id.split(",");
            let x = lastPoint[0];
            let y = lastPoint[1];
            if (grille.setDoorValid(parseInt(x), parseInt(y))) {
                document.getElementById(grille.getCase(x, y).id).style.backgroundColor = "red";
            } else {
                alert("Vous ne pouvez pas placer de porte à cet endroit.");
            }
        }
        grille.checkState();
    });
}

const tick = () => {
    getCompatibility();
    getIfIDValid();
    requestAnimationFrame(tick);
};