/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: DAOGrille.js                                              // 
//  Auteur: Alexandre Homier                                               //
//  Description: Envoie du JS à l'algorithme Python                        //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class DAOGrille {
    constructor(valuesToSend) {
        this.dictValues = { "grille": valuesToSend.grille, "IndParSalle": valuesToSend.indBySalle, "minX": valuesToSend.minX, "minY": valuesToSend.minY, "maxX": valuesToSend.maxX, "maxY": valuesToSend.maxY };
        this.isSave = false;
    }

    sendToPy(isSave = false) {
        this.isSave = isSave;
        document.querySelector(".loading").style.display = "flex";
        let loading = document.querySelector(".loading-title");
        if (this.isSave) {
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
                localStorage.setItem('grille', response);
                if (this.isSave) {
                    this.saveGridBD(response);
                    window.location.href = "leaderboard";
                } else {
                    // window.location.href = "visualisation";
                }
            });
    }


    saveGridBD(grille) {
        let formData = new FormData();

        let iduser = localStorage.getItem("id");
        if (iduser == null) {
            window.location.href = "/";
        }

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