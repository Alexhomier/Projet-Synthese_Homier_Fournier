###################################################################################
##  Nom du fichier : DAO                    									 ##
##  Auteur: Mathieu Fournier & Alexandre Homier                                  ##
##  Description: DAO Permettant la communication entre le serveur et python      ##
##  Date: 27 mai 2022                                                            ##
###################################################################################

from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Manipulateur import *

app = Flask(__name__)
CORS(app)

@app.route('/algo', methods = ['POST'])
@cross_origin()
def post():
    try:
        grille = request.get_json()
        manipulateur = Manipulateur(grille)
        jsonIndividu = manipulateur._get_individus_json()
        succes = manipulateur._do_individus_frames()
        jsonFrames = ''
        jsonBlocked = ''
        if succes:
            result = manipulateur._get_json()
            jsonFrames = result[0]
            jsonBlocked = result[1]
            print("Starting...")
            return jsonify(
                Grille = grille,
                Frames = jsonFrames,
                Individu = jsonIndividu,
                Blocked = jsonBlocked
            )
        else:
            print("No doors are on the building")
            return False
    except:
        print("Erreur Algorithme")
        return False

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8500)
