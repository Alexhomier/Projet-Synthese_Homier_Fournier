/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Création du sol en 3D                                     //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class PlaneFormBase {
    constructor(packImports, grid) {
        this.scene = packImports.scene;
        this.grid = grid;

        this.createPlane();
    }

    createPlane() {
        const geometry = new THREE.PlaneGeometry(this.grid.sizeX * this.grid.conversionTo3D, this.grid.sizeY * this.grid.conversionTo3D);
        const material = new THREE.MeshBasicMaterial({ color: 0x4d4d4d, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotateX(-Math.PI / 2)
        this.scene.add(plane);
    }
}