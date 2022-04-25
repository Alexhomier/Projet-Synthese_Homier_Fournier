class PlaneFormBase {
    constructor(packImports, grid) {
        this.THREE = packImports.THREE;
        this.scene = packImports.scene;
        this.grid = grid;

        this.createPlane();
    }

    createPlane() {
        const geometry = new this.THREE.PlaneGeometry(this.grid.sizeX, this.grid.sizeY);
        const material = new this.THREE.MeshBasicMaterial({ color: 0x4d4d4d, side: this.THREE.DoubleSide });
        const plane = new this.THREE.Mesh(geometry, material);
        plane.rotateX(-Math.PI / 2)
        this.scene.add(plane);
    }
}