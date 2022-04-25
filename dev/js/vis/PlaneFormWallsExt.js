class PlaneFormWallsExt {
    constructor(packImports, grid) {
        this.THREE = packImports.THREE;
        this.scene = packImports.scene;
        this.grid = grid;
        this.wallHeight = 5;

        this.createPlaneWithPosition(grid.sizeX / 2, this.wallHeight / 2, false);
        this.createPlaneWithPosition(-grid.sizeY / 2, this.wallHeight / 2, false);
        this.createPlaneWithPosition(grid.sizeY / 2, this.wallHeight / 2, true);
        this.createPlaneWithPosition(-grid.sizeX / 2, this.wallHeight / 2, true);
    }

    createPlaneWithPosition(XorZ, y, rotatePos) {
        const geometry = new this.THREE.PlaneGeometry(this.grid.sizeX, this.wallHeight);
        const material = new this.THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: this.THREE.DoubleSide });
        const plane = new this.THREE.Mesh(geometry, material);
        if (rotatePos) {
            plane.rotateY(-Math.PI / 2);
            plane.position.set(XorZ, y, 0);
        } else {
            plane.rotateY(Math.PI);
            plane.position.set(0, y, XorZ);
        }
        this.scene.add(plane);
    }
}