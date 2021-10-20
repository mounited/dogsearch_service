from os import environ

from flask import g
from pymongo import MongoClient


def get_db():
    if not hasattr(g, "db"):
        host = environ["DB_HOST"]
        dbname = environ["DB_NAME"]
        g.db = MongoClient("mongodb://{}".format(host))[dbname]
    return g.db
