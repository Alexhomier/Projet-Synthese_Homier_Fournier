/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: login.js                                                  //
//  Auteur: Alexandre Homier                                               //
//  Description: Animation login                                           //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class Login {
    constructor() {
        this.speed = 7;
        this.open = false;
        this.action = false;
        this.loginDOM = document.querySelector(".login-background");
        this.currentTopValue = 120;
        this.maxValueTop = 13;
        this.maxValueDown = 120;
    }

    openCloseMenu() {
        if (!this.action) {
            this.action = true;
            if (this.open) {
                this.direction = 0.5 * this.speed;
                document.querySelector(".background-blacken").style.display = "none";
                document.querySelector(".login-error-container").style.display = "none";
            } else {
                document.querySelector(".background-blacken").style.display = "inline-flex";
                this.direction = -0.5 * this.speed;
            }
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