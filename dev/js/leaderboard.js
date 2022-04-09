let spriteList = [];
let currentTimeSelection = "day";

window.addEventListener("load", () => {
    spriteList.push(new DateSelection());

    getListOf

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

function getUsername() {
    let formData = new FormData();

    formData.append("getUsername", true);

    fetch("AjaxIndex.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            return response;
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

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}