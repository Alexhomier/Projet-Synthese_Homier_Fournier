class PlaneFormWalls {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.wallHeight = grid.wallHeight;
        this.doorWidth = grid.doorWidth;
        this.doorHeight = grid.doorHeight;
    }

    addWall() {
        // this.createPlaneWithPosition()
    }

    // Porte a get en params
    setExtWalls() {
        this.createPlaneWithPosition(true, this.grid.sizeY, this.wallHeight, false);
        this.createPlaneWithPosition(true, -this.grid.sizeY, this.wallHeight, false);
        this.createPlaneWithPosition(false, this.grid.sizeX, this.wallHeight, true);
        this.createPlaneWithPosition(false, -this.grid.sizeX, this.wallHeight, true);
    }

    // (Sur l'axe des X ou Y?: BOOL, size Longeur axe X ou Y?: int, wallHeight: int, rotationX ou Y: BOOL, doorPosition: int if null no door)
    createPlaneWithPosition(isX = true, XorZ, y, rotateX, doorPos = null) {
        let geometry = null;
        if (isX) {
            geometry = new THREE.BoxGeometry(this.grid.sizeX * this.grid.conversionToDDD, this.wallHeight, 1);
        } else {
            geometry = new THREE.BoxGeometry(this.grid.sizeY * this.grid.conversionToDDD, this.wallHeight, 1);
        }
        const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        if (rotateX) {
            plane.rotateY(-Math.PI / 2);
            plane.position.set(XorZ / 2 * this.grid.conversionToDDD, y / 2, 0);
        } else {
            plane.rotateY(Math.PI);
            plane.position.set(0, y / 2, XorZ / 2 * this.grid.conversionToDDD);
        }
        if (doorPos)
            this.addDoor(plane, doorPos, XorZ / 2 * this.grid.conversionToDDD, rotateX);
        else
            this.scene.add(plane);
    }

    addDoor(wall, pos, XorZ, rotateX) {

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