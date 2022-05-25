/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Sélection de date leaderboard                             //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class DateSelection {
    constructor() {
        this.min = 1;
        this.max = 51;
        this.current = 1;
        this.action = false;
        this.speed = 5;
        this.direction = "+";
    }

    change() {
        if (!this.action) {
            this.action = true;
        }
    }

    tick() {
        if (this.action) {
            if (this.direction == "+") {
                if (this.current < this.max) {
                    this.current += 1 * this.speed;
                } else {
                    this.action = false;
                    this.current = 51;
                    this.direction = "-";
                }
            } else {
                if (this.current > 1) {
                    this.current -= 1 * this.speed;
                } else {
                    this.action = false;
                    this.current = 1;
                    this.direction = "+";
                }
            }
            document.querySelector(".lb-period-moving-div").style.left = `${this.current}%`;
        }
    }
}