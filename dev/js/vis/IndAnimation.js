class IndAnimation {
    constructor() {}

    addAnimation(id, x, y, object) {
        object.position.x = x;
        object.position.z = y;
    }

    tick() {}
}