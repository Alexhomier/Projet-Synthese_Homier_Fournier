class Individus {
    constructor(grille, packImports, grid) {
        this.packImports = packImports;
        this.grid = grid;
        this.arrayInd = [];
        this.arrayInd[0] = {
            x: 5,
            y: 5
        }
    }

    setAllIndividus() {
        this.arrayInd.forEach(ind => {
            console.log(ind);
            this.addIndividus(ind)
        });
    }

    addIndividus(individu) {
        const loader = new THREE.ObjectLoader();
        this.individu = individu;
        let optionsThis = this;

        loader.load(
            // resource URL
            "../../../media/3dObject/Individu.json",

            // onLoad callback
            function(obj) {
                optionsThis.createIndividus(obj, optionsThis.individu);
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
        return optionsThis;
    }

    createIndividus(object, ind) {
        object.scale.set(3, 3, 3);
        object.position.set(ind.x * this.grid.conversionToDDD - this.grid.sizeX / 2, object.scale.y / 2, ind.y * this.grid.conversionToDDD - this.grid.sizeY / 2 - this.grid.minY);
        this.packImports.scene.add(object);
    }
}