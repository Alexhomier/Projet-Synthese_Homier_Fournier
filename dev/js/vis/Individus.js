class Individus {
    constructor(packImports, grid, object) {
        this.packImports = packImports;
        this.grid = grid;
        this.object = object;
        this.convertionTo3D = new ConversionTo3D(this.grid);
    }

    addIndividu(ind) {
        this.createIndividus(this.object, ind);
    }

    createIndividus(object, ind) {
        object.scale.set(this.grid.individusScale, this.grid.individusScale, this.grid.individusScale);

        let pos = this.convertionTo3D.get3DPositions(ind.x, ind.y);
        let posX = pos.x;
        let posY = pos.y;

        object.position.set(posX, object.scale.y / 2, posY);
        this.packImports.scene.add(object);
    }

    moveIndividus(x, y) {
        let pos = this.convertionTo3D.get3DPositions(newPosX, newPosY);
        let posX = pos.x;
        let posY = pos.y;

        object.position.set(posX, object.scale.y / 2, posY);
    }
}