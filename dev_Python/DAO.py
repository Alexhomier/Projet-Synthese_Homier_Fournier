from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS
from State import *  

app = Flask(__name__)
CORS(app)

@app.route('/post', methods = ['POST'])
def post():
    grille = request.get_json()
    # state = new State(grille)
    # grille = state.run()

    return jsonify(grille)

if __name__ == '__main__':
    app.run()

"""
    run is the main of the algo.

    :param grille: json dict
     - { "grille", "IndParSalle", "minX", "minY", "maxX", "maxY" }

    :return: json dict                       ?
     - {"grille": [OBJECT Grille], "walls": [Array of Walls], "ind": [Array of Individus], "visualisation": [Array of visualisation Frame]}
""" 