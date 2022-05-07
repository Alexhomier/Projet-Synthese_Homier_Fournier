class PlaneFormWalls {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.wallHeight = grid.wallHeight;
        this.doorWidth = grid.doorWidth;
        this.doorHeight = grid.doorHeight;

        this.allWalls = new THREE.Geometry();
        this.extWalls = new THREE.Geometry();
        this.allDoors = new THREE.Geometry();
        this.extDoors = new THREE.Geometry();
        this.doorFrame = new THREE.Geometry();
        this.doorHoleForFrame = new THREE.Geometry();
        this.doorCount = 0;
        this.extDoorCount = 0;
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

        let pos = new ConversionTo3D(this.grid);
        pos = pos.get3DPositions(wall.id[0], wall.id[1]);
        let posX = pos.x;
        let posY = pos.y;

        if (asDoor) {
            if (wall.id[0] == this.grid.minX || wall.id[0] == this.grid.maxX ||
                wall.id[1] == this.grid.minY || wall.id[1] == this.grid.maxY) {
                this.createPlaneWithPosition(isVertical, null, null, true, posX, posY, isALimit);
            } else {
                this.createPlaneWithPosition(isVertical, null, true, null, posX, posY, isALimit);
            }
        } else
            this.createPlaneWithPosition(isVertical, null, null, null, posX, posY, isALimit);
    }

    setExtWalls() {
        this.createPlaneWithPosition(true, this.grid.sizeY); // vert haut
        this.createPlaneWithPosition(true, -this.grid.sizeY); // vert bas
        this.createPlaneWithPosition(false, this.grid.sizeX); // hori haut
        this.createPlaneWithPosition(false, -this.grid.sizeX); // hori bas
    }

    createPlaneWithPosition(isX, posWallExt, asDoor = false, asDoorExt = false, positionX = null, positionY = null, isALimit = null) {
        let geometry = null;

        if (positionX != null || positionY != null) {
            if (isALimit)
                geometry = new THREE.BoxGeometry(1 * this.grid.conversionTo3D, this.wallHeight, 1);
            else
                geometry = new THREE.BoxGeometry(2 * this.grid.conversionTo3D, this.wallHeight, 1);

            const material = new THREE.MeshBasicMaterial({ color: this.grid.wallsColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            if (!isX) {
                plane.rotateY(Math.PI);
            } else {
                plane.rotateY(-Math.PI / 2)
            }
            plane.position.set(positionX, this.wallHeight / 2, positionY);

            let wallMesh = new THREE.Mesh(plane);
            wallMesh.updateMatrix();
            this.allWalls.mergeMesh(wallMesh.geometry, wallMesh.matrix);

            if (asDoor) {
                this.addDoor(positionX, positionY, isX);
                this.doorCount++;
            }
            if (asDoorExt) {
                this.addDoor(positionX, positionY, isX);
                this.extDoorCount++;
            }
        } else {
            if (isX) {
                geometry = new THREE.BoxGeometry(this.grid.sizeX * this.grid.conversionTo3D + 0.5, this.wallHeight + 0.1, 1.1);
            } else {
                geometry = new THREE.BoxGeometry(this.grid.sizeY * this.grid.conversionTo3D + 0.5, this.wallHeight + 0.1, 1.1);
            }
            const material = new THREE.MeshBasicMaterial({ color: this.grid.extWallsColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            if (!isX) {
                plane.rotateY(-Math.PI / 2);
                plane.position.set(posWallExt / 2 * this.grid.conversionTo3D, this.wallHeight / 2, 0);
            } else {
                plane.rotateY(Math.PI);
                plane.position.set(0, this.wallHeight / 2, posWallExt / 2 * this.grid.conversionTo3D);
            }
            let wallMesh = new THREE.Mesh(plane);
            wallMesh.updateMatrix();
            this.extWalls.mergeMesh(wallMesh.geometry, wallMesh.matrix);
        }
    }

    addDoor(x, y, isX) {
        let geometry = new THREE.BoxGeometry(this.doorWidth, this.doorHeight, this.doorWidth);
        let material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
        let plane = new THREE.Mesh(geometry, material);

        plane.position.set(x, this.grid.doorHeight / 2, y);

        let doorMesh = new THREE.Mesh(plane);
        doorMesh.updateMatrix();
        this.allDoors.mergeMesh(doorMesh.geometry, doorMesh.matrix);

        geometry = new THREE.BoxGeometry(this.doorWidth - 0.1, this.doorHeight, this.doorWidth - 0.1);
        material = new THREE.MeshBasicMaterial({ color: 0x6d6d6d, side: THREE.DoubleSide });
        plane = new THREE.Mesh(geometry, material);

        plane.position.set(x, this.grid.doorHeight / 2, y);

        let doorHoleForFrame = new THREE.Mesh(plane);
        doorHoleForFrame.updateMatrix();
        this.doorHoleForFrame.mergeMesh(doorHoleForFrame.geometry, doorHoleForFrame.matrix);

        if (isX != undefined) {
            if (!isX) {
                geometry = new THREE.BoxGeometry(this.doorWidth + 0.1, this.wallHeight - 0.2, this.doorWidth - 1);
                plane.rotateY(Math.PI);
            } else {
                geometry = new THREE.BoxGeometry(this.doorWidth - 1, this.wallHeight - 0.2, this.doorWidth + 0.1);
                plane.rotateY(-Math.PI / 2)
            }
            material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
            plane = new THREE.Mesh(geometry, material);

            plane.position.set(x, this.grid.wallHeight / 2, y);

            let wallMesh = new THREE.Mesh(plane);
            wallMesh.updateMatrix();
            this.doorFrame.mergeMesh(wallMesh.geometry, wallMesh.matrix);
        }
    }

    // Librairie pour soustraire un cube d'un autre cube: THREEBSP
    removeDoorsfromWalls() {
        var intWalls = new ThreeBSP(this.allWalls);
        var extWalls = new ThreeBSP(this.extWalls);
        var allDoors = new ThreeBSP(this.allDoors);
        var doorFrame = new ThreeBSP(this.doorFrame);
        var doorHoleForFrame = new ThreeBSP(this.doorHoleForFrame);

        if (this.doorCount != 0 || this.extDoorCount != 0) {
            var interior = intWalls.subtract(allDoors);
            var interior_mesh = interior.toMesh();
            interior_mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.wallsColor, side: THREE.DoubleSide });

            var exterior = extWalls.subtract(allDoors);
            var exterior_mesh = exterior.toMesh();
            exterior_mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.extWallsColor, side: THREE.DoubleSide });

            var doorFrame = doorFrame.subtract(doorHoleForFrame);
            var doorFrame_mesh = doorFrame.toMesh();
            doorFrame_mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.doorFrameColor, side: THREE.DoubleSide });

            this.scene.add(interior_mesh);
            this.scene.add(exterior_mesh);
            this.scene.add(doorFrame_mesh);
        } else {
            let interior_mesh = intWalls.toMesh();
            interior_mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.wallsColor, side: THREE.DoubleSide });
            let exterior_mesh = extWalls.toMesh();
            exterior_mesh.material = new THREE.MeshBasicMaterial({ color: this.grid.extWallsColor, side: THREE.DoubleSide });
            this.scene.add(interior_mesh);
            this.scene.add(exterior_mesh);
        }
    }
}