let grille;
let isfullscreen = false;
let currentSelection = "Salle";

const GRIDSIZE = 2500;

window.addEventListener("load", () => {
    grille = new Grille(GRIDSIZE);
    grille.setHeight();
    grille.createGrid();
    grille.resizeGridStart();
    setCurrentSelectionText();
    updateScrollBar();
    setUpMultipleSelection();
});

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

function setSelectionDoor() {
    currentSelection = "Porte";
    setCurrentSelectionText();
    grille.fillEmptyCase();
}

function setCurrentSelectionText() {
    let text = document.querySelector(".left-panel-info-value-selection");
    let btnCouloir = document.querySelector(".left-panel-button-item-couloir");
    let btnSalle = document.querySelector(".left-panel-button-item-salle");
    let btnDoor = document.querySelector(".left-panel-button-item-door");
    text.innerHTML = `Sélection courante : ${currentSelection}`;
    if (currentSelection == "Couloir") {
        btnSalle.style.boxShadow = "none";
        btnDoor.style.boxShadow = "none";
        btnCouloir.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    } else if (currentSelection == "Salle") {
        btnCouloir.style.boxShadow = "none";
        btnDoor.style.boxShadow = "none";
        btnSalle.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
    } else if (currentSelection == "Porte") {
        btnCouloir.style.boxShadow = "none";
        btnSalle.style.boxShadow = "none";
        btnDoor.style.boxShadow = "0px 0px 8px 4px #FFFFFF";
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
            grille.setCase(tempPos[0], [tempPos[1]], currentSelection);
        });

        grille.checkState();
    });
}