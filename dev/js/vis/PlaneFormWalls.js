class PlaneFormWalls {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.wallHeight = grid.wallHeight;
        this.doorWidth = grid.doorWidth;
        this.doorHeight = grid.doorHeight;
    }

    addWall(wall) {
        if (wall.category == "vertical") {
            if (wall.id[0] == this.grid.minX || wall.id[0] == this.grid.maxX || wall.id[1] == this.grid.minY || wall.id[1] == this.grid.maxY)
                this.createPlaneWithPosition(true, null, null, wall.id[0] - this.grid.sizeX / 2, wall.id[1] - this.grid.sizeY / 2, true);
            else
                this.createPlaneWithPosition(true, null, null, wall.id[0] - this.grid.sizeX / 2, wall.id[1] - this.grid.sizeY / 2, false);
        } else {
            if (wall.id[0] == this.grid.minX || wall.id[0] == this.grid.maxX || wall.id[1] == this.grid.minY || wall.id[1] == this.grid.maxY)
                this.createPlaneWithPosition(false, null, null, wall.id[0] - this.grid.sizeX / 2, wall.id[1] - this.grid.sizeY / 2, true);
            else
                this.createPlaneWithPosition(false, null, null, wall.id[0] - this.grid.sizeX / 2, wall.id[1] - this.grid.sizeY / 2, false);
        }
    }

    // Porte a get en params
    setExtWalls() {
        this.createPlaneWithPosition(true, this.grid.sizeY); // vert haut
        this.createPlaneWithPosition(true, -this.grid.sizeY); // vert bas
        this.createPlaneWithPosition(false, this.grid.sizeX); // hori haut
        this.createPlaneWithPosition(false, -this.grid.sizeX); // hori bas
    }

    // (Rotation Vertical?: BOOL, LongeurWallExt?: int, doorPosition: int if null no door, PositionX: int, PositionY: int)
    createPlaneWithPosition(isX, posWallExt, doorPos = null, positionX = null, positionY = null, isALimit = null) {
        let geometry = null;

        if (positionX != null || positionY != null) {
            if (isALimit)
                geometry = new THREE.BoxGeometry(1 * this.grid.conversionToDDD, this.wallHeight, 1);
            else
                geometry = new THREE.BoxGeometry(2 * this.grid.conversionToDDD, this.wallHeight, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            if (!isX) {
                plane.rotateY(Math.PI);
            } else {
                plane.rotateY(-Math.PI / 2)
            }
            plane.position.set(positionX * this.grid.conversionToDDD, this.wallHeight / 2, positionY * this.grid.conversionToDDD);
            this.scene.add(plane);
        } else {
            if (isX) {
                geometry = new THREE.BoxGeometry(this.grid.sizeX * this.grid.conversionToDDD, this.wallHeight, 1);
            } else {
                geometry = new THREE.BoxGeometry(this.grid.sizeY * this.grid.conversionToDDD, this.wallHeight, 1);
            }
            const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            if (!isX) {
                plane.rotateY(-Math.PI / 2);
                plane.position.set(posWallExt / 2 * this.grid.conversionToDDD, this.wallHeight / 2, 0);
            } else {
                plane.rotateY(Math.PI);
                plane.position.set(0, this.wallHeight / 2, posWallExt / 2 * this.grid.conversionToDDD);
            }
            if (doorPos)
                this.addDoor(plane, doorPos, posWallExt / 2 * this.grid.conversionToDDD, rotateX);
            else
                this.scene.add(plane);
        }
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