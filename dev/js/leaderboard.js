/////////////////////////////////////////////////////////////////////////////
//  Auteur: Alexandre Homier                                               //
//  Description: Main JS pour la page leaderboard.php                      //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
let spriteList = [];
let currentBoardSelection = "moi";
let currentPage = 1;
let maxPage = null;
let statePageArrowRight = null;
let statePageArrowLeft = null;
let layoutTab = [];
let template = null;

window.addEventListener("load", () => {
    spriteList.push(new DateSelection());
    spriteList.push(new ErrorMSG());

    getLeaderBoard();

    tick();
});

function addVote(element) {

    let parentNode = element.parentNode.parentNode;
    let username = parentNode.children[0].children[1].textContent.toString();
    let vote = parseInt(parentNode.children[1].children[2].textContent);
    let userid = localStorage.getItem("id");
    if (userid == null) {
        window.location.href = "index.php";
    }

    let formData = new FormData();

    formData.append("usernameVote", username);
    formData.append("vote", vote);
    formData.append("idVoter", userid);

    fetch("AjaxLB.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                element.src = "./media/img/leaderboard/liked.png";
                parentNode.children[1].children[2].innerHTML = vote + 1;
            } else {
                spriteList[1].run();
            }
        });
}

function changeBoardSelect() {
    spriteList[0].change();
    if (currentBoardSelection == "moi") {
        currentBoardSelection = "all";
    } else {
        currentBoardSelection = "moi";
    }
    updateBoardInfo();
}

function updateBoardInfo() {
    deleteCurrentLB();
    getLeaderBoard();
    setPageArrow();
}

function deleteCurrentLB() {
    let parent = document.querySelector(".lb-score");
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function getLeaderBoard() {
    let formData = new FormData();
    let userid = localStorage.getItem("id");
    if (userid == null) {
        window.location.href = "index.php";
    }

    formData.append("page", currentPage);
    formData.append("currentSelection", currentBoardSelection);
    formData.append("iduser", userid);

    fetch("AjaxLB.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            maxPage = Math.ceil(response.pageCount[0].count / 5);
            setPageArrow();
            for (let i = 0; i < response.lb.length; i++) {
                addElementLB(i + 1 + ((currentPage - 1) * 5), response.lb[i].username, response.lb[i].vote);
                layoutTab.push(response.lb[i].layout);
            }
        });
}

function setPageArrow() {
    let arrowLeft = document.querySelector(".page-arrow-left").style;
    let arrowRight = document.querySelector(".page-arrow-right").style;
    if (currentPage == 1) {
        arrowLeft.backgroundImage = "url('../media/img/leaderboard/arrow-left-hover.png')";
        arrowRight.backgroundImage = "url('../media/img/leaderboard/arrow-right.png')";
        statePageArrowLeft = false;
        statePageArrowRight = true;
    }
    if (currentPage == maxPage) {
        arrowRight.backgroundImage = "url('../media/img/leaderboard/arrow-right-hover.png')";
        statePageArrowRight = false;
    }
    if (currentPage == maxPage && currentPage != 1) {
        arrowLeft.backgroundImage = "url('../media/img/leaderboard/arrow-left.png')";
        statePageArrowLeft = true;
    }
    if (currentPage != 1 && currentPage != maxPage) {
        arrowLeft.backgroundImage = "url('../media/img/leaderboard/arrow-left.png')";
        arrowRight.backgroundImage = "url('../media/img/leaderboard/arrow-right.png')";
        statePageArrowLeft = true;
        statePageArrowRight = true;
    }
}

function turnPage(button) {
    if (button.className == "page-arrow-left") {
        if (statePageArrowLeft) {
            currentPage -= 1;
            deleteCurrentLB();
            getLeaderBoard();
            setPageArrow();
        }
    }
    if (button.className == "page-arrow-right") {
        if (statePageArrowRight) {
            currentPage += 1;
            deleteCurrentLB();
            getLeaderBoard();
            setPageArrow();
        }
    }
}

function addElementLB(posArr, username, nbVote) {
    if (template == null) {
        template = document.querySelector(".lb-score-item");
    }
    let parent = document.querySelector(".lb-score");
    let clone = template.cloneNode(true);
    clone.children[0].children[0].innerHTML = `${posArr}.`;
    clone.children[0].children[1].innerHTML = `${username}`;
    clone.children[1].children[2].innerHTML = `${nbVote}`;
    clone.style.display = "inline-flex";
    parent.appendChild(clone);
}

function goToVis(element) {
    let pos = element.parentElement.parentElement.children[0].children[0].textContent.toString().slice(0, -1);
    localStorage.setItem("grille", layoutTab[parseInt(pos - 1)]);
    window.location.href = "visualisation.php";
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
};