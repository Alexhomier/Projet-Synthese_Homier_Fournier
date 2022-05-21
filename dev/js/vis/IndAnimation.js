class IndAnimation {
    constructor() {
        this.speed = 1;
        this.arrAnimation = [];
    }

    addAnimation(id, x, y, object) {
        this.arrAnimation.push({
            id: id,
            x: x,
            y: y,
            object: object
        });
    }

    tick() {
        for (let i = 0; i < this.arrAnimation.length; i++) {
            let ind = this.arrAnimation[i];
            let xFinished = false;
            let yFinished = false;
            let x = ind.x;
            let y = ind.y;
            let directionX = 0;
            let directionY = 0;

            if (ind.object.position.x >= x - 1 && ind.object.position.x <= x + 1) {
                ind.object.position.x = x;
                xFinished = true;
            }
            if (ind.object.position.z >= y - 1 && ind.object.position.z <= y + 1) {
                ind.object.position.z = y;
                yFinished = true;
            }

            // console.log(`x : ${ind.object.position.x}`, `y : ${ind.object.position.z}`);

            if (xFinished && yFinished) {
                this.arrAnimation.slice(i, 1);
            } else {
                if (ind.object.position.x < x) {
                    directionX = this.speed;
                } else {
                    directionX = -this.speed;
                }
                if (ind.object.position.z < y) {
                    directionY = this.speed;
                } else {
                    directionY = -this.speed;
                }

                ind.object.position.set(ind.object.position.x += directionX, ind.object.position.y, ind.object.position.z += directionY);
            }
        }
    }
}