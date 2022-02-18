class Login{
    constructor(){
        this.speed = 1;
        this.open = false;
        this.action = false;
        this.loginDOM = document.querySelector(".login-background");
        this.currentTopValue = 110;
        this.maxValueTop = 10;
        this.maxValueDown = 120; 
    }

    openCloseMenu(){
        if(this.action){
            this.action = true;
            if(this.open)
                this.directionAndSpeed = -1 * this.speed;
            else
                this.directionAndSpeed = 1 * this.speed;
        }
    }

    tick(){
        if(this.action){
            if(this.open){
                if(this.currentTopValue >= this.maxValueDown){
                    this.action = false;
                    this.open = false;
                }
            } else {
                if(this.currentTopValue <= this.maxValueTop){
                    this.action = false;
                    this.open = true;
                }
            }
            this.currentTopValue += this.directionAndSpeed;
            this.loginDOM.style.top = this.currentTopValue + "%";
        }
    }
}