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

    returnValue = grille
    return jsonify(returnValue)

if __name__ == '__main__':
    app.run()

# py -m pip install virtualenv (Only @ first use)
# py -m venv projetSynthese
# projetSynthese\Scripts\activate
# pip install flask
# pip install flask-cors
# F5 Python Run
# Don't forget to delete the folder projetSynthese WE DON'T WANT VIRTUAL ENV IN GITHUB