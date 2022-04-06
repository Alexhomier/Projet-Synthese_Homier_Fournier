class Case {
    constructor(x, y) {
        this.id = [x, y];
        this.state = null;
        this.category = null;
        this.case = document.createElement("div");
        this.case.classList.add("case");
        this.case.setAttribute("id", x + "," + y);
        this.case.setAttribute("title", "Vide");
        document.querySelector(".grid").appendChild(this.case);
    }

    setCase(state) {
        switch (state) {
            case "Couloir":
                this.case.style.backgroundColor = "grey";
                this.case.setAttribute("title", "Couloir");
                this.state = "Couloir";
                break;
            case "Salle":
                this.case.style.backgroundColor = "white";
                this.state = "Salle";
                this.case.setAttribute("title", "Salle");
                break;
            case null:
                this.case.style.backgroundColor = "transparent";
                this.state = "Vide";
                this.case.setAttribute("title", "Vide");
            default:
                break;
        }
    }

    checkStateCase() {
        if (this.state == "Couloir") {
            this.case.style.backgroundColor = "grey";
            this.case.setAttribute("title", "Couloir");
        }
        if (this.state == "Salle") {
            this.case.style.backgroundColor = "white";
            this.case.setAttribute("title", "Salle");
        }
    }

    checkStateCaseFill() {
        if (this.state == null) {
            this.state = "Couloir";
            this.checkStateCase();
        }
    }
}