class Scene {
    constructor(canvas, grille) {
        this.canvas = canvas;

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

        var grid = {
            sizeX: 500,
            sizeY: 500
        }

        this.planeFormBase = new PlaneFormBase(packImports, grid);
        this.planeFormWallsExt = new PlaneFormWallsExt(packImports, grid);

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