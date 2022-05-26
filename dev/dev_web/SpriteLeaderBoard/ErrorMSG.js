/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: ErrorMSG.js                                               //
//  Auteur: Alexandre Homier                                               //
//  Description: Message d'erreur leaderboard                              //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class ErrorMSG {
    constructor() {
        this.action = false;
        this.posUp = -13;
        this.posDown = 3;
        this.speed = 10;
        this.currentPos = this.posUp;
        this.isOpen = false;
        this.timeToWait = 3;
        this.direction = 0.1;
        this.isPause = false;
    }

    run() {
        this.action = true;
        if (this.isOpen) {
            this.direction = -0.1;
        } else {
            this.direction = 0.1;
        }
    }

    pause() {
        let tempThis = this;
        setTimeout(function() {
            this.isPause = false;
            tempThis.run();
        }, this.timeToWait * 1000);
    }

    tick() {
        if (this.action) {
            if (!this.isPause) {
                if (this.isOpen) {
                    if (this.currentPos <= this.posUp) {
                        this.currentPos = this.posUp;
                        this.action = false;
                        this.isPause = false;
                        this.isOpen = false;
                    } else {
                        this.currentPos += this.direction * this.speed;
                    }
                } else {
                    if (this.currentPos >= this.posDown) {
                        this.isOpen = true;
                        this.currentPos = this.posDown;
                        this.action = false;
                        this.isPause = false;
                        this.pause();
                    } else {
                        this.currentPos += this.direction * this.speed;
                    }
                }
                document.querySelector(".error-container").style.top = `${this.currentPos}%`;
            }
        }
    }
}