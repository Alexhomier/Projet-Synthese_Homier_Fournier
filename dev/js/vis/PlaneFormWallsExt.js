class PlaneFormWallsExt {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.wallHeight = 10;
        this.doorWidth = 5;
        this.doorHeight = 8;

        this.createPlaneWithPosition(grid.sizeX / 2, this.wallHeight / 2, false);
        this.createPlaneWithPosition(-grid.sizeY / 2, this.wallHeight / 2, false);
        this.createPlaneWithPosition(grid.sizeY / 2, this.wallHeight / 2, true);
        this.createPlaneWithPosition(-grid.sizeX / 2, this.wallHeight / 2, true, 40);
    }

    createPlaneWithPosition(XorZ, y, rotateX, doorPos = null) {
        const geometry = new THREE.BoxGeometry(this.grid.sizeX, this.wallHeight, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        if (rotateX) {
            plane.rotateY(-Math.PI / 2);
            plane.position.set(XorZ, y, 0);
        } else {
            plane.rotateY(Math.PI);
            plane.position.set(0, y, XorZ);
        }
        if (doorPos)
            this.addDoor(plane, doorPos, XorZ, y, rotateX);
        else
            this.scene.add(plane);
    }

    addDoor(wall, pos, XorZ, y, rotateX) {

        const geometry = new THREE.BoxGeometry(this.doorWidth, this.doorHeight, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);

        if (rotateX) {
            plane.rotateY(-Math.PI / 2);
            plane.position.set(XorZ, this.doorHeight / 2, pos);
        } else {
            plane.rotateY(Math.PI);
            plane.position.set(pos, this.doorHeight / 2, XorZ);
        }

        var bsp_A = new ThreeBSP(wall);
        var bsp_Y = new ThreeBSP(plane);

        var bsp_YsubA = bsp_A.subtract(bsp_Y);
        var bsp_mesh = bsp_YsubA.toMesh();
        bsp_mesh.material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });

        this.scene.remove(wall);
        this.scene.add(bsp_mesh);
    }
}