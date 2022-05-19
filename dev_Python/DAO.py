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
    manipulateur._do_individus_frames()
    jsonGrille = ''
    jsonFrames = ''
    jsonBlocked = ''
    result = manipulateur._get_json()
    jsonGrille = result[0]
    jsonFrames = result[1]
    jsonBlocked = result[2]
    print(jsonGrille)
    print(jsonFrames)
    print(jsonIndividu)
    print(jsonBlocked)
    return jsonGrille, jsonFrames, jsonIndividu, jsonBlocked

if __name__ == '__main__':
    app.run()

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
