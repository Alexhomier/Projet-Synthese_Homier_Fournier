/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Individus de la visualisation 3D                          //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class Individus {
    constructor(packImports, grid, object) {
        this.packImports = packImports;
        this.grid = grid;
        this.object = object;
        this.convertionTo3D = new ConversionTo3D(this.grid);
    }

    createIndividus(ind) {
        this.object.scale.set(this.grid.individusScale, this.grid.individusScale, this.grid.individusScale);

        let pos = this.convertionTo3D.get3DPositions(ind.x, ind.y);
        let posX = pos.x;
        let posY = pos.y;

        this.object.position.set(posX, this.object.scale.y / 2, posY);
        this.packImports.scene.add(this.object);
    }

    moveIndividus(id, x, y, animation) {
        let pos = this.convertionTo3D.get3DPositions(x, y);
        let posX = pos.x;
        let posY = pos.y;

        animation.addAnimation(id, posX, posY, this.object);
        // this.object.position.set(posX, this.object.scale.y / 2, posY);
    }

    removeInd() {
        this.packImports.scene.remove(this.object);
    }


}