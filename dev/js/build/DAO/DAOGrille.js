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
        // https://reqbin.com/req/c-dwjszac0/curl-post-json-example
        var url = "http://masimulation.ca:8500/algo";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.readyState == 200) {
                    localStorage.setItem('grille', xhr.responseText);
                    console.log(xhr.responseText);
                    if (!isSave) {
                        console.log(xhr.responseText);
                        // window.location.href = "visualisation";
                    } else {
                        this.saveGridBD(xhr.responseText);
                        window.location.href = "leaderboard";
                    }
                } else {
                    console.error("L'algorithme n'a pas pu charger.");
                }
            }

            var data = JSON.stringify(this.dictValues);

            xhr.send(data);

        };
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