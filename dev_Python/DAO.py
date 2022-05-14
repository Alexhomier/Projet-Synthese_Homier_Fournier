from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS
from Manipulator import *

app = Flask(__name__)
CORS(app)

@app.route('/algo', methods = ['POST', 'GET'])
def post():
    grille = request.get_json()
    # manipulator = Manipulator(grille)
    # manipulator.reset()
    # manipulator.run()
    #grille = manipulateur.run() si possible?
    # print(grille)
    return jsonify(grille)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

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
