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