/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: Grille.js                                                 //
//  Auteur: Alexandre Homier                                               //
//  Description: Grille de la visualisation 3D                             //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////

class Grille {
    constructor(data, packImports, indAnimation) {
        const WALLHEIGHT = 5.0;
        const CONVERSIONTO3D = 5.0;
        const WALLSCOLOR = 0x919191;
        const EXTWALLSCOLOR = 0x6d6d6d;
        const DOORFRAMECOLOR = 0xff0000;
        const INDIVIDUSSCALE = 3.0;
        const BIGSIZE = 50;

        this.infos = data;
        this.packImports = packImports;
        this.indAnimation = indAnimation;

        this.indIsLoad = false;

        this.arrayWalls = [];
        this.dictInd = [];
        this.outIndiv = [];
        this.frame = new FrameList();
        this.grille = this.infos.grille;
        this.individus = this.infos.individus;
        this.blocked = this.infos.blocked;
        this.firstFrame = this.infos.frames;
        this.evacInd = 0;

        let sizeX = this.grille.maxX - this.grille.minX;
        let sizeY = this.grille.maxY - this.grille.minY;
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
        };
    }

    start() {
        return new Promise((resolve, error) => {
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

            let conversion = new ConversionTo3D(this.gridInfo);
            for (let x = this.gridInfo.minX; x <= this.gridInfo.maxX; x++) {
                if (this.grille.grille[x][this.gridInfo.minY].state == "Porte") {
                    let newPos = conversion.get3DPositions(x, this.gridInfo.minY);
                    this.planeFormWalls.addDoor(newPos.x, newPos.y, false);
                }
                if (this.grille.grille[x][this.gridInfo.maxY].state == "Porte") {
                    let newPos = conversion.get3DPositions(x, this.gridInfo.maxY);
                    this.planeFormWalls.addDoor(newPos.x, newPos.y, false);
                }
            }
            for (let y = this.gridInfo.minY; y <= this.gridInfo.maxY; y++) {
                if (this.grille.grille[this.gridInfo.minX][y].state == "Porte") {
                    let newPos = conversion.get3DPositions(this.gridInfo.minX, y);
                    this.planeFormWalls.addDoor(newPos.x, newPos.y, true);
                }
                if (this.grille.grille[this.gridInfo.maxX][y].state == "Porte") {
                    let newPos = conversion.get3DPositions(this.gridInfo.maxX, y);
                    this.planeFormWalls.addDoor(newPos.x, newPos.y, true);
                }
            }

            this.planeFormWalls.removeDoorsfromWalls();

            this.getIndividusJSON()
                .then(resolve => {
                    this.packImports.individusJSON = resolve;

                    this.individus.forEach(ind => {
                        let indisBlocked = false;
                        this.blocked.forEach(blockInd => {
                            if (ind.id == blockInd.id)
                                indisBlocked = true;
                        });
                        if (!indisBlocked) {
                            this.dictInd[ind.id] = new Individus(this.packImports, this.gridInfo, this.packImports.individusJSON.clone());
                            this.dictInd[ind.id].createIndividus(ind);
                        }
                    });
                });
        });
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
        });
    }

    setFrameArray() {
        this.firstFrame.forEach(frame => {
            let indisBlocked = false;
            this.blocked.forEach(indBlocked => {
                if (frame.id == indBlocked.id) {
                    indisBlocked = true;
                }
            });
            if (!indisBlocked)
                this.frame.add(frame);
        });

        this.indIsLoad = true;

        return this.frame.getFirstNode();
    }

    getFirstFrame() {
        if (!this.indIsLoad) {
            this.setFrameArray();
        }
        return this.frame.getFirstNode();
    }

    getNextFrame(currentNode) {
        if (this.indIsLoad) {
            if (currentNode) {
                let nextFrame = this.frame.getNextNode(currentNode);
                if (nextFrame) {
                    this.dictInd[nextFrame.value.id].moveIndividus(nextFrame.value.id, nextFrame.value.x, nextFrame.value.y, this.indAnimation);
                    if (nextFrame.value.isOut) {
                        this.outIndiv.push(nextFrame.value.id);
                        this.evacInd += 1;
                    }
                    return nextFrame;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getPrevFrame(currentNode) {
        if (this.indIsLoad) {
            if (currentNode) {
                let prevFrame = this.frame.getPrevNode(currentNode);
                if (prevFrame) {
                    this.dictInd[prevFrame.value.id].moveIndividus(prevFrame.value.id, prevFrame.value.x, prevFrame.value.y, this.indAnimation);
                    return prevFrame;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getEvacInd() {
        return this.evacInd;
    }
}