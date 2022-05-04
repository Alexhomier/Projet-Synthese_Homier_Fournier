from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS
from Manipulator import *

app = Flask(__name__)
CORS(app)

@app.route('/post', methods = ['POST'])
def post():
    grille = request.get_json()
    # manipulator = Manipulator(grille)
    # manipulator.reset()
    # manipulator.run()
    #grille = manipulateur.run() si possible?
    # print(grille)
    return jsonify(grille)

if __name__ == '__main__':
    app.run()

# """
#     run is the main of the algo.

#     :param grille: json dict                                  size grille
#      - { "grille", "IndParSalle", "minX", "minY", "maxX", "maxY", "size",  }

#     :return: json dict                       ?
#      - {"grille": [OBJECT Grille], "individus": [Array of Individus], "visualisation": [Array of visualisation Frame]}
#      individus[
#        ind: {
#             id
#             x
#             y  
#        }    
#      ]
#       visualisation[
#           ind: {
#               newPos = (x, y)
#               isOut
#           }
#       ]
# 
#       NE PAS MODIFIER LA GRILLE SVP
# """ 
