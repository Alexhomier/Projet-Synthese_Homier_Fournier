function sendMail() {
    document.querySelector(".mdp-container").style.display = "none";
    document.querySelector(".sent-container").style.display = "flex";

    const username = document.querySelector(".mdp-input").value;

    fetch("https://api.smtp2go.com/v3/email/send", {
            method: "POST",
            credentials: "omit",
            body: createJSONForMail(username)
        })
        .then(response => {
            console.log(response)
        })
}

function createJSONForMail(username) {
    return JSON.stringify({
        'api_key': "api-0CACA2F6B50F11EC8134F23C91C88F4E",
        'sender': "e.ahomier@etu.cvm.qc.ca",
        'to': [
            "a.homier@hotmail.com"
        ],
        'template_id': "4872134",
        'template_data': {
            'username': `${username}`,
            'url': `https://wwww.masimulation.ca`
        }
    })
}