class PlaneFormBase {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.createPlane();
    }

    createPlane() {
        const geometry = new THREE.PlaneGeometry(this.grid.sizeX, this.grid.sizeY);
        const material = new THREE.MeshBasicMaterial({ color: 0x4d4d4d, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotateX(-Math.PI / 2)
        this.scene.add(plane);
    }
}