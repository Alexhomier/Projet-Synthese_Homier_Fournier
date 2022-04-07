function sendMail() {
    document.querySelector(".mdp-container").style.display = "none";
    document.querySelector(".sent-container").style.display = "flex";

    const username = document.querySelector(".mdp-input").value;

    getMail(username);
}

function getMail(username) {
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

function sendToSMTP(username, mail) {
    fetch("https://api.smtp2go.com/v3/email/send", {
            method: "POST",
            credentials: "omit",
            body: createJSONForMail(username, mail)
        })
        .then(response => {
            console.log(response)
        })
}

function createJSONForMail(username, mail) {
    console.log(mail)
    return JSON.stringify({
        'api_key': "api-0CACA2F6B50F11EC8134F23C91C88F4E",
        'sender': "e.ahomier@etu.cvm.qc.ca",
        'to': [
            `${mail}`
        ],
        'template_id': "4872134",
        'template_data': {
            'username': `${username}`,
            'url': `https://wwww.masimulation.ca/recoverypwd.php/#${username}`
        }
    })
}