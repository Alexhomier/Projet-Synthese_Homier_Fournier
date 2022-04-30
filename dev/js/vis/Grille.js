class Grille {
    constructor(grille) {
        this.grille = grille;

        this.getWalls();
        console.log(this.grille);
    }

    getWalls() {
        for (let x = this.grille.minX; x <= this.grille.maxX; x++) {
            for (let y = this.grille.minY; y <= this.grille.maxY; y++) {
                let chekerInfo = this.checkWallDirectionHorizontal(x, y);
                if (chekerInfo[0] && !chekerInfo[1] && chekerInfo[2]) {
                    this.grille.grille[x][y].category = "horizontal";
                }
                if (!chekerInfo[0] && !chekerInfo[1] && chekerInfo[2]) {
                    this.grille.grille[x][y].category = "vertical";
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

        if (y == 0)
            lookVoisinYDown = 0;
        if (y == this.size)
            lookVoisinYUp = 0;
        if (x == 0)
            lookVoisinXDown = 0
        if (x == this.size)
            lookVoisinXUp = 0

        this.checkWallconditionArray = [
            this.grille.grille[x][y + lookVoisinYUp].state == null || this.grille.grille[x][y + lookVoisinYUp].state == "Couloir",
            this.grille.grille[x][y - lookVoisinYDown].state == null || this.grille.grille[x][y - lookVoisinYDown].state == "Couloir",
            this.grille.grille[x + lookVoisinXUp][y].state == null || this.grille.grille[x + lookVoisinXUp][y].state == "Couloir",
            this.grille.grille[x - lookVoisinXDown][y].state == null || this.grille.grille[x - lookVoisinXDown][y].state == "Couloir"
        ];

        this.checkWallconditionArray.forEach(element => {
            if (this.grille.grille[x][y].state == "Salle" && element) {
                isAWall = true;
                countSideCorner++;
            }
        });

        if (countSideCorner > 1) {
            isACorner = true;
            console.log("corner")
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
}