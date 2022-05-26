/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: header.js                                                 //
//  Auteur: Alexandre Homier                                               //
//  Description: Animation header login                                    //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class Header {
    constructor() {
        this.speed = 2;
        this.open = false;
        this.action = false;
        this.headerDOM = document.querySelector(".header");
        this.currentTopValue = -15;
        this.maxValueTop = -15;
        this.maxValueDown = 0;
    }

    openHeader() {
        if (!this.action) {
            if (!this.open) {
                this.action = true;
                this.direction = 0.5 * this.speed;
            }
        }
    }

    closeHeader() {
        if (!this.action) {
            if (this.open) {
                this.action = true;
                this.direction = -0.5 * this.speed;
            }
        }
    }

    tick() {
        if (this.action) {
            this.currentTopValue += this.direction;
            this.headerDOM.style.top = this.currentTopValue + "%";
            if (this.open) {
                if (this.currentTopValue <= this.maxValueTop) {
                    this.action = false;
                    this.open = false;
                }
            } else {
                if (this.currentTopValue >= this.maxValueDown) {
                    this.action = false;
                    this.open = true;
                }
            }
        }
    }
}