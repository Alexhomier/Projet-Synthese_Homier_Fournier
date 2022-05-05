class Grille {
    constructor(grille, packImports, gridInfo) {
        const WALLHEIGHT = 5.;
        const CONVERSIONTODDD = 5.;
        const WALLSCOLOR = 0x919191;
        const EXTWALLSCOLOR = 0x6d6d6d;
        const INDIVIDUSSCALE = 3.;
        const BIGSIZE = 50;

        this.grille = grille;
        this.packImports = packImports;
        this.gridInfo = gridInfo;

        let sizeX = grille.maxX - grille.minX;
        let sizeY = grille.maxY - grille.minY;
        let doorWidth = 0.7 * WALLHEIGHT;
        let doorHeight = 0.9 * WALLHEIGHT;

        this.gridInfo = {
            bigSize: BIGSIZE,
            sizeX: sizeX,
            sizeY: sizeY,
            minX: this.grille.minX,
            minY: this.grille.minY,
            maxX: this.grille.maxX,
            maxY: this.grille.maxY,
            wallHeight: WALLHEIGHT,
            doorWidth: doorWidth,
            doorHeight: doorHeight,
            conversionToDDD: CONVERSIONTODDD,
            wallsColor: WALLSCOLOR,
            extWallsColor: EXTWALLSCOLOR,
            individusScale: INDIVIDUSSCALE
        }

        this.arrayWalls = [];
        this.dictInd = {};
        // this.arrayIndividus = this.grille.arrayIndividus;
        this.frame = new FrameList();

        // temp
        this.arrayIndividus = [];

        this.arrayIndividus[0] = {
            id: 0,
            x: this.gridInfo.maxX / 2 + 1,
            y: this.gridInfo.maxY / 2 + 1
        }
        this.arrayIndividus[1] = {
            id: 1,
            x: this.gridInfo.maxX / 2 + 3,
            y: this.gridInfo.maxY / 2 + 3
        }
    }

    start() {
        this.getWalls();

        this.planeFormBase = new PlaneFormBase(this.packImports, this.gridInfo);
        this.planeFormWalls = new PlaneFormWalls(this.packImports, this.gridInfo);
        this.planeFormWalls.setExtWalls(); // Porte a passer en params

        this.arrayWalls.forEach(wall => {
            if (wall.state != "Porte")
                this.planeFormWalls.addWall(wall);
            else {
                this.planeFormWalls.addWall(wall, true);
            }
        });

        for (let x = this.gridInfo.minX; x <= this.gridInfo.maxX; x++) {
            if (this.grille.grille[x][0].state == "Porte") {
                this.planeFormWalls.addDoor(x, 0);
            }
            if (this.grille.grille[x][this.gridInfo.sizeX - 1].state == "Porte") {
                this.planeFormWalls.addDoor(x, this.gridInfo.sizeX - 1);
            }
        }
        for (let y = this.gridInfo.minY; y <= this.gridInfo.maxY; y++) {
            if (this.grille.grille[0][y].state == "Porte") {
                this.planeFormWalls.addDoor(0, y);
            }
            if (this.grille.grille[this.gridInfo.sizeY - 1][y].state == "Porte") {
                this.planeFormWalls.addDoor(this.gridInfo.sizeY - 1, y);
            }
        }

        this.planeFormWalls.removeDoorsfromWalls();

        this.getIndividusJSON()
            .then(resolve => {
                this.packImports.individusJSON = resolve;
            })
            .then(() => {
                this.arrayIndividus.forEach(ind => {
                    console.log(ind)
                    this.dictInd[ind.id] = new Individus(this.packImports, this.gridInfo, this.packImports.individusJSON.clone());
                    this.dictInd[ind.id].addIndividu(ind);
                });
            })
            .then(() => {
                this.setFrameArray();
            })
    }

    getWalls() {
        for (let x = this.grille.minX; x <= this.grille.maxX; x++) {
            for (let y = this.grille.minY; y <= this.grille.maxY; y++) {
                let chekerInfo = this.checkWallDirectionHorizontal(x, y);
                if (chekerInfo[0] && !chekerInfo[1] && chekerInfo[2]) {
                    this.grille.grille[x][y].category = "horizontal";
                    this.arrayWalls.push(this.grille.grille[x][y]);
                }
                if (!chekerInfo[0] && !chekerInfo[1] && chekerInfo[2]) {
                    this.grille.grille[x][y].category = "vertical";
                    this.arrayWalls.push(this.grille.grille[x][y]);
                }
                if (chekerInfo[1] || x == 0 || x == 51 || y == 0 || y == 51)
                    this.grille.grille[x][y].category = null;
            }
        }
    }

    checkWallDirectionHorizontal(x, y) {
        let isAWall = false;
        let isACorner = false;
        let isHorizontal = false;
        let countSideCorner = 0;
        let countSide = 0;
        let lookVoisinXDown = 1;
        let lookVoisinYDown = 1;
        let lookVoisinXUp = 1;
        let lookVoisinYUp = 1;

        if (y == 0) {
            lookVoisinYDown = 0;
            isACorner = true;
        }
        if (y == this.gridInfo.bigSize) {
            lookVoisinYUp = 0;
            isACorner = true;
        }
        if (x == 0) {
            lookVoisinXDown = 0;
            isACorner = true;
        }
        if (x == this.gridInfo.bigSize) {
            lookVoisinXUp = 0;
            isACorner = true;
        }
        this.checkWallconditionArray = [
            this.grille.grille[x][y + lookVoisinYUp].state == null || this.grille.grille[x][y + lookVoisinYUp].state == "Couloir",
            this.grille.grille[x][y - lookVoisinYDown].state == null || this.grille.grille[x][y - lookVoisinYDown].state == "Couloir",
            this.grille.grille[x + lookVoisinXUp][y].state == null || this.grille.grille[x + lookVoisinXUp][y].state == "Couloir",
            this.grille.grille[x - lookVoisinXDown][y].state == null || this.grille.grille[x - lookVoisinXDown][y].state == "Couloir"
        ];

        this.checkWallconditionArray.forEach(element => {
            if ((this.grille.grille[x][y].state == "Salle" || this.grille.grille[x][y].state == "Porte") && element) {
                isAWall = true;
                countSideCorner++;
            }
        });

        if (countSideCorner > 1) {
            isACorner = true;
        }

        if (!isACorner) {
            for (let i = 0; i < this.checkWallconditionArray.length; i++) {
                if (this.checkWallconditionArray[i]) {
                    countSide++;
                }
                if (i == 1 && countSide > 0) {
                    isHorizontal = true;
                    break;
                }
            }
        }
        return [isHorizontal, isACorner, isAWall];
    }

    getIndividusJSON() {
        return new Promise((resolve, error) => {
            const loader = new THREE.ObjectLoader();

            loader.load(
                // resource URL
                "../../../media/3dObject/Individu.json",

                // onLoad callback
                function(obj) {
                    resolve(obj);
                },

                // onProgress callback
                function(xhr) {
                    if (xhr.total * 100 == 100) {
                        console.info("JSON individus chargé.");
                    }
                },

                // onError callback
                function(err) {
                    error(err);
                }
            );
        })
    }

    setFrameArray() {
        this.grille.frameArray.forEach(frame => {
            this.frame.add(frame);
        });
    }

    getFrame(index = null) {
        if (index) {
            return this.frame.getNodeAtIndex(index);
        }
    }
}