/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: Conversion.js                                             //
//  Auteur: Alexandre Homier                                               //
//  Description: Conversion d'une mesure logique vers une mesure graphique //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class ConversionTo3D {
    constructor(gridInfo) {
        this.gridInfo = gridInfo;
    }

    get3DPositions(x, y) {
        x = ((x - this.gridInfo.sizeX / 2) - this.gridInfo.minX) * this.gridInfo.conversionTo3D;
        y = ((y - this.gridInfo.sizeY / 2) - this.gridInfo.minY) * this.gridInfo.conversionTo3D;
        return {
            x: x,
            y: y
        };
    }
}