from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Manipulateur import *

app = Flask(__name__)
CORS(app)

@app.route('/algo', methods = ['POST'])
@cross_origin()
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
        return False  #Jsp sque tu veux la

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8500)

# """
#     run is the main of the algo.

#     :param grille: json dict                                  size grille
#      - { "grille", "IndParSalle", "minX", "minY", "maxX", "maxY", "size",  }

#     :return: json dict                       ?
#      - {"grille": [OBJECT Grille], "individus": [Array of Individus], "frame": [Array of visualisation Frame]}
#      individus[
#        ind: {
#             id : int
#             x : float
#             y : float
#        }    
#      ]
#       Frame[
#           ind[
#               ind: {
#                   newPosX : float
#                   newPosY : float
#                   isOut : bool
#               },
#           ], [
#               ind: {
#                   id: int
#                   newPosX : float
#                   newPosY : float
#                   isOut : Bool
#               }
#           ]
#       ]
# 
#       NE PAS MODIFIER LA GRILLE SVP
# """ 
