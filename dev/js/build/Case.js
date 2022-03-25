class Case {
    constructor(x, y) {
        this.id = [x, y];
        let newCase = document.createElement("div");
        newCase.classList.add("case");
        newCase.setAttribute("id", x + "," + y);
        document.querySelector(".grid").appendChild(newCase);
    }
}