class Individus {
    constructor(packImports, grid, object) {
        this.packImports = packImports;
        this.grid = grid;
        this.object = object;
        this.arrayInd = [];
        this.arrayInd[0] = {
            x: this.grid.maxX / 2 + 1,
            y: this.grid.maxY / 2 + 1
        }
    }

    addIndividu(ind) {
        this.createIndividus(this.object, ind);
    }

    createIndividus(object, ind) {
        object.scale.set(this.grid.individusScale, this.grid.individusScale, this.grid.individusScale);
        object.position.set((ind.x - this.grid.sizeX / 2 - this.grid.minX) * this.grid.conversionToDDD, object.scale.y / 2, (ind.y - this.grid.sizeY / 2 - this.grid.minY) * this.grid.conversionToDDD);
        this.packImports.scene.add(object);
    }

    moveIndividus(newPosX, newPosY) {
        object.position.set((newPosX - this.grid.sizeX / 2 - this.grid.minX) * this.grid.conversionToDDD, object.scale.y / 2, (newPosY - this.grid.sizeY / 2 - this.grid.minY) * this.grid.conversionToDDD);
    }
}