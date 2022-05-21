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
        let formData = new FormData();

        formData.append("infos", JSON.stringify(this.dictValues));

        fetch("AjaxBuild.php", {
                method: "POST",
                credentials: "include",
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                let jsonLoad = JSON.parse(response);
                let grille = jsonLoad.Grille;
                let individus = JSON.parse(jsonLoad.Individu);
                let blocked = JSON.parse(jsonLoad.Blocked);
                let frames = JSON.parse(jsonLoad.Frames);
                console.log(grille);
                console.log(individus);
                console.log(blocked);
                console.log(frames);

                localStorage.setItem('grille', response);
                if (isSave) {
                    this.saveGridBD(response);
                    window.location.href = "leaderboard";
                } else {
                    window.location.href = "visualisation";
                }
            });
    }


    saveGridBD(grille) {
        let formData = new FormData();

        let iduser = localStorage.getItem("id");
        if (iduser == null) {
            window.location.href = "index";
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
            });
    }
}