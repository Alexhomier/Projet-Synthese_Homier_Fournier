class Grille {
    constructor(gridSize) {
        this.gridDOM = document.querySelector(".grid");
        this.gridsize = gridSize;
        this.gridisFullscreen = false;
        this.grille = [];
        this.indBySalle = 0;
        this.minX = 25;
        this.minY = 25;
        this.maxX = -25;
        this.maxY = -25;
    }

    setHeight() {
        let pourcentage = this.gridDOM.offsetWidth / screen.height * 100;
        this.gridDOM.style.height = pourcentage + "%";
    }

    createGrid() {
        let sideCalc = (Math.sqrt(this.gridsize) / 2);
        for (let x = -sideCalc; x <= sideCalc; x++) {
            this.grille[x] = [];
            for (let y = -sideCalc; y <= sideCalc; y++) {
                this.grille[x][y] = new Case(x, y);
            }
        }
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
        for (let x = -25; x < this.grille.length; x++) {
            for (let y = -25; y < this.grille[x].length; y++) {
                this.grille[x][y].checkStateCase();
                this.getminMax(x, y);
            }
        }
    }

    fillEmptyCase() {
        for (let x = this.minX; x <= this.maxX; x++) {
            for (let y = this.minY; y <= this.maxY; y++) {
                this.grille[x][y].checkStateCaseFill();
            }
        }
    }

    getminMax(x, y) {
        if (this.grille[x][y].state) {
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
        const conditionsArray = [
            this.grille[x][y + 1].state == "Couloir",
            this.grille[x][y - 1].state == "Couloir",
            this.grille[x + 1][y].state == "Couloir",
            this.grille[x - 1][y].state == "Couloir"
        ];

        conditionsArray.forEach(element => {
            if (element) {
                valid = true;
            }
        });

        if (this.grille[x][y].state == "Salle" && valid) {
            valid = true;
            this.grille[x][y].state = "Porte";
            this.grille[x][y]
        } else
            valid = false;

        return valid;
    }

    getCase(x, y) {
        return this.grille[parseInt(x)][parseInt(y)];
    }

    getGrille() {
        let daoGrille = new DAOGrille(this)
        daoGrille.sendToPy(true);
    }

    sendGrilleToPy() {
        let daoGrille = new DAOGrille(this)
        daoGrille.sendToPy()
    }
}