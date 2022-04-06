from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get', methods = ['GET'])
def gett():
    return "llo"

@app.route('/post', methods = ['POST'])
def post():
    grille = request.get_json()
    print(grille)

    returnValue = "All good"
    return jsonify(returnValue)

if __name__ == '__main__':
    app.run()
    
# py -m pip install virtualenv
# py -m venv projetSynthese
# projetSynthese\Scripts\activate
# pip install flask
# pip install flask-cors
# rename main file as app.py
# python DAO.py
# Don't forget to delete the folder projetSynthese WE DON'T WANT VIRTUAL ENV IN GITHUB