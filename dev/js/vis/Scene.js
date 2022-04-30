class Scene {
    constructor(canvas, grille) {
        this.canvas = canvas;

        const WALLHEIGHT = 5;
        const CONVERSIONTODDD = 5

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(canvas);
        this.camera = this.buildCamera();
        this.orbitcontrol = this.setOrbitControls();

        let scene = this.scene;
        let renderer = this.renderer;
        let camera = this.camera;

        var packImports = {
            scene,
            renderer,
            camera,
        }

        let sizeX = grille.grille.maxX - grille.grille.minX;
        let sizeY = grille.grille.maxY - grille.grille.minY;
        let doorWidth = 0.5 * WALLHEIGHT;
        let doorHeight = 0.8 * WALLHEIGHT;

        var grid = {
            sizeX: sizeX,
            sizeY: sizeY,
            wallHeight: WALLHEIGHT,
            doorWidth: doorWidth,
            doorHeight: doorHeight,
            conversionToDDD: CONVERSIONTODDD
        }

        this.planeFormBase = new PlaneFormBase(packImports, grid);
        this.planeFormWallsExt = new PlaneFormWalls(packImports, grid);

        // temp
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);



        const size = 400;
        const divisions = 75;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        // end temp

        window.addEventListener('resize', this.resizeWindow.bind(this));
    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1e1e1e);
        return scene;
    }

    buildRenderer(canvas) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 0.5);
        canvas.appendChild(renderer.domElement);
        return renderer;
    }

    buildCamera() {
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.set(240, 240, 800);
        return camera;
    }

    resizeWindow() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setOrbitControls() {
        const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set(0, 10, 0);
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();
        return controls;
    }

    setLights() {
        const light = new THREE.AmbientLight(0x404040);
        this.scene.add(light);
    }

    tick() {
        this.renderer.render(this.scene, this.camera);
    }

}