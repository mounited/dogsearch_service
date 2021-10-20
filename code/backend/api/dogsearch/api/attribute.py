from flask_restful import Resource, abort
from dogsearch.api.db import get_db


class AttributeList(Resource):
    def get(self):
        try:
            db = get_db()
            collection = db.attributes.find({}, {'_id': False})
            return [attr for attr in collection], 200
        except Exception:
            abort(500, description="Internal Server Error")
