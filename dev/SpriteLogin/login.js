class Login {
    constructor() {
        this.speed = 5;
        this.open = false;
        this.action = false;
        this.loginDOM = document.querySelector(".login-background");
        this.currentTopValue = 110;
        this.maxValueTop = 13;
        this.maxValueDown = 110;
    }

    openCloseMenu() {
        if (!this.action) {
            this.action = true;
            if (this.open)
                this.direction = 1 * this.speed;
            else
                this.direction = -1 * this.speed;
        }
    }

    tick() {
        if (this.action) {
            this.currentTopValue += this.direction;
            this.loginDOM.style.top = this.currentTopValue + "%";
            if (this.open) {
                if (this.currentTopValue >= this.maxValueDown) {
                    this.action = false;
                    this.open = false;
                }
            } else {
                if (this.currentTopValue <= this.maxValueTop) {
                    this.action = false;
                    this.open = true;
                }
            }
        }
    }
}