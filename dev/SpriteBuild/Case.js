class Case {
    constructor(x, y) {
        this.id = [x, y];
        this.state = null;
        this.category = null;
        this.case = document.createElement("div");
        this.case.classList.add("case");
        this.case.setAttribute("id", x + "," + y);
        document.querySelector(".grid").appendChild(this.case);

        this.setZero();
    }

    setZero() {
        if (this.id[0] == 0 && this.id[1] == 0) {
            this.case.classList.add("caseZero");
        }
    }

    setCaseSet() {
        switch (this.category) {
            case "couloir":
                this.case.classList.add("caseCouloir")
                this.case.innerHTML = "";
                break;
            case "salle":
                this.case.classList.add("caseSalle")
                this.case.innerHTML = "";
                break;
            default:
                break;
        }
    }

    setCaseAdd() {
        this.case.classList.add("caseAdd");
        this.case.innerHTML = "+";
    }

    tick() {}
}