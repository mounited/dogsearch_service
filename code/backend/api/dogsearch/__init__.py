from flask import Flask, g
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api = Api(app)
