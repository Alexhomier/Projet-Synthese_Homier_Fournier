window.addEventListener("load", () => {
    getRecovery();
});

function sendMail() {
    document.querySelector(".mdp-container").style.display = "none";
    document.querySelector(".sent-container").style.display = "flex";
    document.querySelector(".rec-container").style.display = "none";

    const username = document.querySelector(".mdp-input").value;

    getInfo(username);
}

function getInfo(username) {
    let formData = new FormData();

    formData.append("username", username);

    fetch("AjaxForgotpwd.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            sendToSMTP(username, response);
        })
}

function sendToSMTP(username, info) {
    console.log(createJSONForMail(username, info))
    fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        credentials: "omit",
        body: createJSONForMail(username, info)
    })
}

function createJSONForMail(username, response) {
    return JSON.stringify({
        'api_key': "api-0CACA2F6B50F11EC8134F23C91C88F4E",
        'sender': "e.ahomier@etu.cvm.qc.ca",
        'to': [
            `${response.email}`
        ],
        'template_id': "4872134",
        'template_data': {
            'username': `${username}`,
            // 'url': `https://wwww.masimulation.ca/recoverypwd.php?${response.url}`
            'reset_url': `http://projetsynthèse/forgotpwd.php?${response.url}?${username}`
        }
    })
}

function getRecovery() {
    const url = window.location.search;
    let splitUrl = url.split("?");
    if (splitUrl.length == 3) {
        document.querySelector(".mdp-container").style.display = "none";
        document.querySelector(".sent-container").style.display = "none";
        document.querySelector(".rec-container").style.display = "flex";
        document.querySelector(".rec-text").innerHTML = `${splitUrl[2]}, Veuillez changer votre mot de passe.`

        let formData = new FormData();

        formData.append("url", splitUrl[1]);
        formData.append("usernameRecovery", splitUrl[2])

        fetch("AjaxForgotpwd.php", {
                method: "POST",
                credentials: "include",
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                if (!response) {
                    document.querySelector(".mdp-container").style.display = "flex";
                    document.querySelector(".sent-container").style.display = "none";
                    document.querySelector(".rec-container").style.display = "none";
                }
            })
    }
}

function checkpwd() {
    let pwd1 = document.querySelector("#pwd1").value;
    let pwd2 = document.querySelector("#pwd2").value;

    if (pwd1 == pwd2) {
        changePwd();
    } else {
        errorMsg();
    }
}

function errorMsg() {
    let text = document.querySelector(".rec-text");
    text.innerHTML = "Les mots de passe ne correspondes pas, veuillez réessayer.";
    text.style.border = "1px red solid";
    text.style.color = "red";
    text.style.padding = "5% 0%";
    text.style.width = "80%";
}

function changePwd() {
    let pwd = document.querySelector("#pwd1").value;
    let user = window.location.search.split("?")[2];

    let formData = new FormData();

    formData.append("userRec", user);
    formData.append("pwdRec", pwd);

    fetch("AjaxForgotpwd.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                window.location.href = "index.php";
            }
        })
}