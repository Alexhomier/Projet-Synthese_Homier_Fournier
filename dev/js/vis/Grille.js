class Grille {
    constructor(grille, packImports, gridInfo) {
        const WALLHEIGHT = 5.;
        const CONVERSIONTO3D = 5.;
        const WALLSCOLOR = 0x919191;
        const EXTWALLSCOLOR = 0x6d6d6d;
        const DOORFRAMECOLOR = 0xff0000;
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
            conversionTo3D: CONVERSIONTO3D,
            wallsColor: WALLSCOLOR,
            extWallsColor: EXTWALLSCOLOR,
            doorFrameColor: DOORFRAMECOLOR,
            individusScale: INDIVIDUSSCALE
        }

        this.arrayWalls = [];
        this.dictInd = [];
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

        let ind = [];
        this.frameArray = [];

        // newPosX: this.gridInfo.maxX / 2 + 4,
        // newPosY: this.gridInfo.maxY / 2 + 5,

        ind[0] = {
            id: 0,
            newPosX: this.gridInfo.maxX / 2 + 1,
            newPosY: this.gridInfo.maxY / 2 + 1,
            isOut: false
        }
        ind[1] = {
            id: 1,
            newPosX: this.gridInfo.maxX / 2 + 3,
            newPosY: this.gridInfo.maxY / 2 + 3,
            isOut: false
        }

        this.frameArray[0] = ind;

        ind[0] = {
            id: 0,
            newPosX: this.gridInfo.maxX / 2 + 2,
            newPosY: this.gridInfo.maxY / 2 + 2,
            isOut: false
        }
        ind[1] = {
            id: 1,
            newPosX: this.gridInfo.maxX / 2 + 2.5,
            newPosY: this.gridInfo.maxY / 2 + 2.5,
            isOut: false
        }

        this.frameArray[1] = ind

        ind[0] = {
            id: 0,
            newPosX: this.gridInfo.maxX / 2 + 3,
            newPosY: this.gridInfo.maxY / 2 + 3,
            isOut: false
        }
        ind[1] = {
            id: 1,
            newPosX: this.gridInfo.maxX / 2 + 3.5,
            newPosY: this.gridInfo.maxY / 2 + 3.5,
            isOut: false
        }
        this.frameArray[2] = ind;
    }

    start() {
        this.getWalls();

        this.planeFormBase = new PlaneFormBase(this.packImports, this.gridInfo);
        this.planeFormWalls = new PlaneFormWalls(this.packImports, this.gridInfo);
        this.planeFormWalls.setExtWalls();

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

                this.arrayIndividus.forEach(ind => {
                    this.dictInd[ind.id] = new Individus(this.packImports, this.gridInfo, this.packImports.individusJSON.clone());
                    this.dictInd[ind.id].addIndividu(ind);
                });

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
        // this.grille.frame.forEach(frame => {
        //     this.frame.add(frame);
        // });
        this.frameArray.forEach(frame => {
            this.frame.add(frame);
        });

        return this.frame.getFirstNode();
    }

    getNextFrame(currentNode) {
        console.log(this.dictInd)
        let nextFrame = this.frame.getNextNode(currentNode);
        nextFrame.value.forEach(ind => {
            console.log(ind.id)
            this.dictInd[ind.id].moveTo(ind.x, ind.y);
        });
        return nextFrame;
    }

    getPrevFrame(currentNode) {
        let prevFrame = this.frame.getNextNode(currentNode);
        prevFrame.value.forEach(ind => {
            this.dictInd[ind.id].moveTo(ind.x, ind.y);
        });
        return prevFrame;
    }
}