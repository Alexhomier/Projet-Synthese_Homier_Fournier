let spriteList = [];

window.addEventListener("load", () => {
    spriteList.push(new Login());
    spriteList.push(new Header());

    loginClickedView();
    scrollEvent();

    tick();
});

function loginButton() {
    loginClickedView(); // set login to login
    spriteList[0].openCloseMenu();
}

function signupButton() {
    signupClickedView(); // set login to signup
    spriteList[0].openCloseMenu();
}

function loginClickedView() {
    let inputContainer = document.querySelector(".login-container-form-input");
    let button = document.querySelector(".login-form-button");
    let loginTitle = document.querySelector(".login-form-title-item-login");
    let signupTitle = document.querySelector(".login-form-title-item-signup");

    if (inputContainer) {
        while (inputContainer.firstChild) {
            inputContainer.removeChild(inputContainer.firstChild);
        }
    }
    document.querySelector(".login-error-container").style.display = "none";
    document.querySelector(".login-working-container").style.display = "none";
    document.querySelector(".login-form-forgetmdp").style.display = "block";

    let newInputUsername = document.createElement("input");
    let newInputPassword = document.createElement("input");

    newInputUsername.classList.add("login-form-input-decoration");
    newInputPassword.classList.add("login-form-input-decoration");

    newInputUsername.placeholder = "Nom d'utilisateur";
    newInputPassword.placeholder = "Mot de passe";

    newInputUsername.setAttribute("name", "username");
    newInputUsername.setAttribute("id", "usernameLogin");
    newInputPassword.setAttribute("name", "password");
    newInputPassword.setAttribute("type", "password");
    newInputPassword.setAttribute("id", "passwordLogin");

    newInputUsername.required = true;
    newInputPassword.required = true;

    inputContainer.appendChild(newInputUsername);
    inputContainer.appendChild(newInputPassword);

    signupTitle.style.color = "rgb(92, 92, 92)";
    signupTitle.style.borderBottom = "rgb(92, 92, 92) solid 1px";
    loginTitle.style.color = "white";
    loginTitle.style.borderBottom = "white solid 1px";

    button.innerHTML = "Se connecter";
    button.setAttribute("onclick", "login()");
}

function signupClickedView() {
    let inputContainer = document.querySelector(".login-container-form-input");
    let button = document.querySelector(".login-form-button");
    let loginTitle = document.querySelector(".login-form-title-item-login");
    let signupTitle = document.querySelector(".login-form-title-item-signup");

    if (inputContainer) {
        while (inputContainer.firstChild) {
            inputContainer.removeChild(inputContainer.firstChild);
        }
    }
    document.querySelector(".login-error-container").style.display = "none";
    document.querySelector(".login-working-container").style.display = "none";
    document.querySelector(".login-form-forgetmdp").style.display = "none";

    let newInputUsername = document.createElement("input");
    let newInputMail = document.createElement("input");
    let newInputPassword = document.createElement("input");
    let newInputPasswordConf = document.createElement("input");

    newInputUsername.classList.add("login-form-input-decoration");
    newInputMail.classList.add("login-form-input-decoration");
    newInputPassword.classList.add("login-form-input-decoration");
    newInputPasswordConf.classList.add("login-form-input-decoration");

    newInputUsername.placeholder = "Nom d'utilisateur";
    newInputMail.placeholder = "Courriel";
    newInputPassword.placeholder = "Mot de passe";
    newInputPasswordConf.placeholder = "Confirmez le mot de passe";

    newInputUsername.setAttribute("name", "username");
    newInputUsername.setAttribute("id", "usernameSignup");
    newInputMail.setAttribute("name", "mail");
    newInputMail.setAttribute("type", "email");
    newInputMail.setAttribute("id", "mail");
    newInputPassword.setAttribute("name", "password");
    newInputPassword.setAttribute("type", "password");
    newInputPassword.setAttribute("id", "passwordSignup");
    newInputPasswordConf.setAttribute("name", "passwordConf");
    newInputPasswordConf.setAttribute("type", "password");
    newInputPasswordConf.setAttribute("id", "passwordConfSignup");

    newInputUsername.required = true;
    newInputMail.required = true;
    newInputPassword.required = true;
    newInputPasswordConf.required = true;

    inputContainer.appendChild(newInputUsername);
    inputContainer.appendChild(newInputMail);
    inputContainer.appendChild(newInputPassword);
    inputContainer.appendChild(newInputPasswordConf);

    loginTitle.style.color = "rgb(92, 92, 92)";
    loginTitle.style.borderBottom = "rgb(92, 92, 92) solid 1px";
    signupTitle.style.color = "white";
    signupTitle.style.borderBottom = "white solid 1px";

    button.innerHTML = "Inscription";
    button.setAttribute("onclick", "signup()");
}

function login() {
    const usernameLogin = document.querySelector("#usernameLogin").value;
    const passwordLogin = document.querySelector("#passwordLogin").value;
    let formData = new FormData();

    formData.append("action", "login");
    formData.append("username", usernameLogin);
    formData.append("password", passwordLogin);

    fetch("AjaxIndex.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            if (response[1]) {
                document.querySelector(".login-error-container").style.display = "inline-flex";
                document.querySelector(".login-error-text").innerHTML = response[0];
            } else {
                localStorage.setItem("id", response[0]);
                window.location.href = "build";
            }
        });
}

function signup() {
    const username = document.querySelector("#usernameSignup").value;
    const password = document.querySelector("#passwordSignup").value;
    const mail = document.querySelector("#mail").value;
    const passwordConf = document.querySelector("#passwordConfSignup").value;

    if (password == passwordConf) {
        let formData = new FormData();

        formData.append("action", "signup");
        formData.append("username", username);
        formData.append("password", password);
        formData.append("mail", mail);

        fetch("AjaxIndex.php", {
                method: "POST",
                credentials: "include",
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    document.querySelector(".login-error-container").style.display = "inline-flex";
                    document.querySelector(".login-error-text").innerHTML = response;
                } else {
                    loginClickedView();
                    document.querySelector(".login-working-container").style.display = "inline-flex";
                    document.querySelector(".login-working-text").innerHTML = "Inscription terminée, veuillez-vous connecter.";
                }
            });
    } else {
        document.querySelector(".login-error-container").style.display = "inline-flex";
        document.querySelector(".login-error-text").innerHTML = "Les mots de passe ne correspondes pas, veuillez réessayer.";
    }
}

function scrollEvent() {
    document.addEventListener("scroll", event => {
        if (window.scrollY > 100) {
            spriteList[1].openHeader();
        } else {
            spriteList[1].closeHeader();
        }

    }, { passive: true });
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
};