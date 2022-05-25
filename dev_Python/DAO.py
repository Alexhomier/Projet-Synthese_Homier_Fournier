###################################################################################
##  Auteur: Mathieu Fournier & Alexandre Homier                                  ##
##  Description: DAO Permettant la communication entre le serveur et python      ##
##  Date: 27 mai 2022                                                            ##
###################################################################################

from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS
from Manipulateur import * 

app = Flask(__name__)
CORS(app)

@app.route('/post', methods = ['POST'])
def post():
    grille = request.get_json()
    manipulateur = Manipulateur(grille)
    jsonIndividu = manipulateur._get_individus_json()
    succes = manipulateur._do_individus_frames()
    jsonGrille = ''
    jsonFrames = ''
    jsonBlocked = ''
    if succes:
        result = manipulateur._get_json()
        jsonGrille = result[0]
        jsonFrames = result[1]
        jsonBlocked = result[2]
        print(jsonGrille)
        print(jsonFrames)
        print(jsonIndividu)
        print(jsonBlocked)
        return jsonGrille, jsonFrames, jsonIndividu, jsonBlocked
    else:
        print("No doors are on the building")
        return False  

if __name__ == '__main__':
    app.run()