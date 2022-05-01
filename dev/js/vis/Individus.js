class Individus {
    constructor(grille, packImports, grid) {
        this.packImports = packImports;
    }

    addIndividus() {
        const loader = new THREE.ObjectLoader();
        let individu = this;

        loader.load(
            // resource URL
            "../../../media/3dObject/Individu.json",

            // onLoad callback
            function(obj) {
                individu.createIndividus(obj)
            },

            // onProgress callback
            function(xhr) {
                if (xhr.total * 100 == 100) {
                    console.info("Individus chargés.");
                }
            },

            // onError callback
            function(err) {
                console.error(err);
            }
        );
        return individu;
    }

    createIndividus(data) {
        data.scale.set(3, 3, 3);
        data.position.set(0, data.scale.y / 2, 0);
        // this.grille.individus.forEach(ind => {
        // this.dictInd[(ind.id)] = data.clone();
        // this.dictInd[(ind.id)].position.set(ind.x * this.gridInfo.conversionToDDD, data.scale.y / 2, ind.y * this.gridInfo.conversionToDDD)
        // this.packImports.scene.add(this.dictInd[(ind.id)]);
        // });
        this.packImports.scene.add(data);
    }
}