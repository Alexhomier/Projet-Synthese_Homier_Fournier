let spriteList = [];
let currentTimeSelection = "day";
let currentpage = 1;
let layoutTab = [];

window.addEventListener("load", () => {
    spriteList.push(new DateSelection());

    getLeaderBoard();

    tick();
});

function addVote(element) {
    element.src = "./media/img/leaderboard/liked.png";
    let parentNode = element.parentNode.parentNode;
    let score = parentNode.children[0].children[0].textContent.slice(0, -1);

    let formData = new FormData();

    formData.append("usernameVote", getUsername());
    formData.append("scoreToUp", score);

    fetch("AjaxIndex.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            parentNode.children[1].children[2].innerHTML = `${response}.`;
        })
}

function changeTimeBoard() {
    spriteList[0].change();
    if (currentTimeSelection == "day") {
        currentTimeSelection = "all";
    } else {
        currentTimeSelection = "day";
    }
}

function getLeaderBoard(){
    let formData = new FormData();

    formData.append("page", currentpage);

    fetch("AjaxLB.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            for(let i = 0; i < response.lb.length; i++){
                addElementLB(i+1, response.lb[i].username, response.lb[i].vote);
                layoutTab.push(response.lb[i].layout);    
            }
        })
}

function addElementLB(posArr, username, nbVote){
    let template = document.querySelector(".lb-score-item");
    let parent = document.querySelector(".lb-score");
    let clone = template.cloneNode(true);
    clone.children[0].children[0].innerHTML = `${posArr}.`;
    clone.children[0].children[1].innerHTML = `${username}`;
    clone.children[1].children[2].innerHTML = `${nbVote}`;
    clone.style.display = "inline-flex";
    parent.appendChild(clone)
}

function goToVis(element){
    let pos = element.parentElement.parentElement.children[0].children[0].textContent.toString().slice(0, -1);
    localStorage.setItem("grille", layoutTab[parseInt(pos-1)]);
    window.location.href = "visualisation.php";
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}