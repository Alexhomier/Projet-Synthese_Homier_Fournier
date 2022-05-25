/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Création de la grille par l'utilisateur                   //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class Grille {
    constructor(gridSize) {
        this.gridDOM = document.querySelector(".grid");
        this.gridsize = gridSize;
        this.gridisFullscreen = false;
        this.grille = [];
        this.indBySalle = 0;
    }

    setGrille(grille) {
        for (let x = 0; x < this.grille.length; x++) {
            for (let y = 0; y < this.grille[x].length; y++) {
                this.grille[x][y].state = grille[x][y].state;
                this.grille[x][y].checkStateCase();
                this.getminMax(x, y);
            }
        }
    }

    setHeight() {
        let pourcentage = this.gridDOM.offsetWidth / screen.height * 100;
        this.gridDOM.style.height = pourcentage + "%";
    }

    createGrid() {
        let sideCalc = (Math.sqrt(this.gridsize));
        this.size = sideCalc;
        this.reinitMinMax();
        for (let x = 0; x <= sideCalc; x++) {
            this.grille[x] = [];
            for (let y = 0; y <= sideCalc; y++) {
                this.grille[x][y] = new Case(x, y);
            }
        }
    }

    reinitMinMax() {
        this.minX = this.minY = (Math.sqrt(this.gridsize));
        this.maxX = this.maxY = 0;
    }

    resizeGridStart() {
        this.gridDOM.style.height = "40%";
        this.setHeight();
    }

    resizeUp() {
        let pourcWidth = this.gridDOM.offsetWidth / screen.width * 100;
        this.gridDOM.style.transform = `translateY(${pourcWidth/4.5}%)`;
        this.gridDOM.style.width = (pourcWidth + 10) + "%";
        this.resizeGridStart();
    }

    resizeDown() {
        let pourcWidth = this.gridDOM.offsetWidth / screen.width * 100;
        if (pourcWidth >= 40) {
            this.gridDOM.style.width = (pourcWidth - 10) + "%";
            this.resizeGridStart();
        }
    }

    gridFullScreen() {
        this.gridisFullscreen = true;
        this.gridDOM.requestFullscreen();
    }

    setCase(x, y, currentSelection) {
        this.grille[x][y].setCase(currentSelection);
    }

    setIndBySalle(ind) {
        this.indBySalle = ind;
    }

    checkState() {
        for (let x = 0; x < this.grille.length; x++) {
            for (let y = 0; y < this.grille[x].length; y++) {
                this.grille[x][y].checkStateCase();
                this.getminMax(x, y);
            }
        }
    }

    fillEmptyCase() {
        this.checkState();
        for (let x = this.minX; x <= this.maxX; x++) {
            for (let y = this.minY; y <= this.maxY; y++) {
                this.grille[x][y].checkStateCaseFill();
            }
        }
    }

    getminMax(x, y) {
        if (this.grille[x][y].state == "Salle" || this.grille[x][y].state == "Couloir") {
            if (this.minX > x)
                this.minX = x;
            if (this.minY > y)
                this.minY = y;
            if (this.maxX < x)
                this.maxX = x;
            if (this.maxY < y)
                this.maxY = y;
        }
    }

    setDoorValid(x, y) {
        let valid = false;
        let lookVoisinXDown = 1;
        let lookVoisinYDown = 1;
        let lookVoisinXUp = 1;
        let lookVoisinYUp = 1;

        if (y == 0)
            lookVoisinYDown = 0;
        if (y == this.size)
            lookVoisinYUp = 0;
        if (x == 0)
            lookVoisinXDown = 0;
        if (x == this.size)
            lookVoisinXUp = 0;

        const conditionsArray = [
            this.grille[x][y + lookVoisinYUp].state == "Couloir",
            this.grille[x][y - lookVoisinYDown].state == "Couloir",
            this.grille[x + lookVoisinXUp][y].state == "Couloir",
            this.grille[x - lookVoisinXDown][y].state == "Couloir"
        ];

        conditionsArray.forEach(element => {
            if (element) {
                valid = true;
            }
        });

        if (this.grille[x][y].state == "Salle" && valid) {
            valid = true;
            this.grille[x][y].state = "Porte";
        } else
            valid = false;

        if (x == this.minX || x == this.maxX || y == this.minY || y == this.maxY) {
            valid = true;
            this.grille[x][y].state = "Porte";
        }

        return valid;
    }

    getCase(x, y) {
        return this.grille[parseInt(x)][parseInt(y)];
    }

    getGrille() {
        let daoGrille = new DAOGrille(this);
        daoGrille.sendToPy(true);
    }

    sendGrilleToPy(save) {
        this.fillEmptyCase();
        let daoGrille = new DAOGrille(this);
        daoGrille.sendToPy(save);
    }
}