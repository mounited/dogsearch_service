from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from dogsearch.attribute import AttributeList

app = Flask(__name__)
CORS(app)

api = Api(app)
api.add_resource(AttributeList, "/attributes")
