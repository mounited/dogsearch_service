from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from dogsearch.attribute import AttributeList
from dogsearch.image import ImageList, Image

app = Flask(__name__)
CORS(app)

api = Api(app)
api.add_resource(AttributeList, "/attributes")
api.add_resource(ImageList, "/images")
api.add_resource(Image, "/images/<id_str>")
