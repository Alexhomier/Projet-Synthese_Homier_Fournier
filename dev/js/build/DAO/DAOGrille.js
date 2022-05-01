class DAOGrille {
    constructor(valuesToSend) {
        this.dictValues = { "grille": valuesToSend.grille, "IndParSalle": valuesToSend.indBySalle, "minX": valuesToSend.minX, "minY": valuesToSend.minY, "maxX": valuesToSend.maxX, "maxY": valuesToSend.maxY };
    }

    sendToPy(isSave = false) {
        document.querySelector(".loading").style.display = "flex";
        let loading = document.querySelector(".loading-title");
        if (isSave) {
            loading.innerHTML = "Sauvegarde en cours...";
        } else {
            loading.innerHTML = "Chargement de la simulation en cours...";
        }
        fetch(`http://127.0.0.1:5000/post`, {
                method: "post",
                credentials: "omit",
                body: JSON.stringify(this.dictValues),
                headers: new Headers({
                    "content-type": "application/json"
                })
            })
            .then(response => response.json())
            .then(response => {
                response = JSON.stringify(response);
                localStorage.setItem('grille', response);
                if (!isSave)
                    window.location.href = "visualisation.php";
                else {
                    this.saveGridBD(response);
                    // window.location.href = "leaderboard.php";
                }
            })
    }

    saveGridBD(grille) {
        let formData = new FormData();

        let iduser = localStorage.getItem("id");
        if (iduser == null) {
            window.location.href = "index.php";
        }

        console.log(grille);

        formData.append("grille", grille);
        formData.append("iduser", iduser);

        fetch("AjaxBuild.php", {
                method: "POST",
                credentials: "include",
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }
}