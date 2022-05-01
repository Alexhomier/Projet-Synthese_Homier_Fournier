class PlaneFormWalls {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.wallHeight = grid.wallHeight;
        this.doorWidth = grid.doorWidth;
        this.doorHeight = grid.doorHeight;

        this.allWalls = new THREE.Geometry();
        this.allDoors = new THREE.Geometry();
        this.doorCount = 0;
    }

    addWall(wall, asDoor = false) {
        let isVertical = false;
        let isALimit = false;

        if (wall.category == "vertical") {
            if (wall.id[0] == this.grid.minX || wall.id[0] == this.grid.maxX || wall.id[1] == this.grid.minY || wall.id[1] == this.grid.maxY) {
                isVertical = true;
                isALimit = true;
            } else {
                isVertical = true;
                isALimit = false;
            }
        } else {
            if (wall.id[0] == this.grid.minX || wall.id[0] == this.grid.maxX || wall.id[1] == this.grid.minY || wall.id[1] == this.grid.maxY) {
                isVertical = false;
                isALimit = true;
            } else {
                isVertical = false;
                isALimit = false;
            }
        }

        let posX = (wall.id[0] - this.grid.sizeX / 2) - this.grid.minX;
        let posY = (wall.id[1] - this.grid.sizeY / 2) - this.grid.minY;

        if (asDoor)
            this.createPlaneWithPosition(isVertical, null, true, posX, posY, isALimit);
        else
            this.createPlaneWithPosition(isVertical, null, null, posX, posY, isALimit);
    }

    // Porte a get en params
    setExtWalls() {
        this.createPlaneWithPosition(true, this.grid.sizeY); // vert haut
        this.createPlaneWithPosition(true, -this.grid.sizeY); // vert bas
        this.createPlaneWithPosition(false, this.grid.sizeX); // hori haut
        this.createPlaneWithPosition(false, -this.grid.sizeX); // hori bas
    }

    createPlaneWithPosition(isX, posWallExt, asDoor = false, positionX = null, positionY = null, isALimit = null) {
        let geometry = null;

        if (positionX != null || positionY != null) {
            if (isALimit)
                geometry = new THREE.BoxGeometry(1 * this.grid.conversionToDDD, this.wallHeight, 1);
            else
                geometry = new THREE.BoxGeometry(2 * this.grid.conversionToDDD, this.wallHeight, 1);

            const material = new THREE.MeshBasicMaterial({ color: this.grid.wallsColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            if (!isX) {
                plane.rotateY(Math.PI);
            } else {
                plane.rotateY(-Math.PI / 2)
            }
            plane.position.set(positionX * this.grid.conversionToDDD, this.wallHeight / 2, positionY * this.grid.conversionToDDD);

            let wallMesh = new THREE.Mesh(plane);
            wallMesh.updateMatrix();
            this.allWalls.mergeMesh(wallMesh.geometry, wallMesh.matrix);

            if (asDoor) {
                this.addDoor(positionX, positionY);
                this.doorCount++;
            }
        } else {
            if (isX) {
                geometry = new THREE.BoxGeometry(this.grid.sizeX * this.grid.conversionToDDD + 0.5, this.wallHeight + 0.1, 1.1);
            } else {
                geometry = new THREE.BoxGeometry(this.grid.sizeY * this.grid.conversionToDDD + 0.5, this.wallHeight + 0.1, 1.1);
            }
            const material = new THREE.MeshBasicMaterial({ color: this.grid.extWallsColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            if (!isX) {
                plane.rotateY(-Math.PI / 2);
                plane.position.set(posWallExt / 2 * this.grid.conversionToDDD, this.wallHeight / 2, 0);
            } else {
                plane.rotateY(Math.PI);
                plane.position.set(0, this.wallHeight / 2, posWallExt / 2 * this.grid.conversionToDDD);
            }

            this.scene.add(plane);
        }
    }

    addDoorExt(wall, pos, XorZ, rotateX) {

        const geometry = new THREE.BoxGeometry(this.doorWidth, this.doorHeight, this.doorWidth);
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

    addDoor(x, y) {
        const geometry = new THREE.BoxGeometry(this.doorWidth, this.doorHeight, this.doorWidth);
        const material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);

        plane.position.set(x * this.grid.conversionToDDD, this.grid.doorHeight / 2, y * this.grid.conversionToDDD);

        let doorMesh = new THREE.Mesh(plane);
        doorMesh.updateMatrix();
        this.allDoors.mergeMesh(doorMesh.geometry, doorMesh.matrix);
    }

    // Librairie pour soustraire un cube d'un autre cube: THREEBSP
    removeDoorsfromWalls() {
        var bsp_A = new ThreeBSP(this.allWalls);
        if (this.doorCount != 0) {
            var bsp_Y = new ThreeBSP(this.allDoors);

            var bsp_YsubA = bsp_A.subtract(bsp_Y);
            var bsp_mesh = bsp_YsubA.toMesh();
            bsp_mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.wallsColor, side: THREE.DoubleSide });

            this.scene.add(bsp_mesh);
        } else {
            let mesh = bsp_A.toMesh();
            mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.wallsColor, side: THREE.DoubleSide });
            this.scene.add(mesh);
        }
    }
}