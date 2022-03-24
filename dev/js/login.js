let spriteList = [];

window.addEventListener("load", () => {
    spriteList.push(new Login());

    loginClickedView();


    tick();
});

function loginButton() {
    loginClickedView() // set login to login
    spriteList[0].openCloseMenu();
}

function signupButton() {
    signupClickedView() // set login to signup
    spriteList[0].openCloseMenu();
}

function loginClickedView() {
    let inputContainer = document.querySelector(".login-container-form-input");
    let button = document.querySelector(".login-form-button");
    let loginTitle = document.querySelector(".login-form-title-item-login");
    let signupTitle = document.querySelector(".login-form-title-item-signup");

    while (inputContainer.firstChild) {
        inputContainer.removeChild(inputContainer.firstChild);
    }
    let newInputUsername = document.createElement("input");
    let newInputPassword = document.createElement("input");

    newInputUsername.classList.add("login-form-input-decoration");
    newInputPassword.classList.add("login-form-input-decoration");

    newInputUsername.placeholder = "Nom d'utilisateur";
    newInputPassword.placeholder = "Mot de passe";

    newInputUsername.required = true;
    newInputPassword.required = true;

    inputContainer.appendChild(newInputUsername);
    inputContainer.appendChild(newInputPassword);

    signupTitle.style.color = "rgb(92, 92, 92)";
    signupTitle.style.borderBottom = "rgb(92, 92, 92) solid 1px";
    loginTitle.style.color = "white";
    loginTitle.style.borderBottom = "white solid 1px";

    button.innerHTML = "Se connecter";
}

function signupClickedView() {
    let inputContainer = document.querySelector(".login-container-form-input");
    let button = document.querySelector(".login-form-button");
    let loginTitle = document.querySelector(".login-form-title-item-login");
    let signupTitle = document.querySelector(".login-form-title-item-signup");

    while (inputContainer.firstChild) {
        inputContainer.removeChild(inputContainer.firstChild);
    }
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
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }

    window.requestAnimationFrame(tick);
}