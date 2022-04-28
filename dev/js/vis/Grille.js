class Grille {
    constructor(grille) {
        this.grille = grille;
        this.getWalls();
    }

    getWalls() {
        let grille = this.grille.grille;
        for (let x = this.grille.minX; x < this.grille.maxX; x++) {
            for (let y = this.grille.minY; y < this.grille.maxY; y++) {
                if (this.checkWallDirectionHorizontal()) {
                    grille[x][y].direction = "horizontal";
                } else {
                    grille[x][y].direction = "vertical";
                }
            }
        }
    }
}