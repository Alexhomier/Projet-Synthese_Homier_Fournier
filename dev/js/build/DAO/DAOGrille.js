class DAOGrille {
    constructor(valuesToSend) {
        this.dictValues = { "grille": valuesToSend.grille, "IndParSalle": valuesToSend.indBySalle, "minX": valuesToSend.minX, "minY": valuesToSend.minY, "maxX": valuesToSend.maxX, "maxY": valuesToSend.maxY };
    }

    sendToPy() {
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
                console.log(response)
                return response;
            })
    }
}