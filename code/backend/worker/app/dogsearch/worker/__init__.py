import sys
import time

from pymongo import MongoClient

from dogsearch.model import Model


class Worker:
    def __init__(self, host, dbname):
        self.db = MongoClient("mongodb://{}".format(host))[dbname]
        self.model = Model.create("random")
        self.attributes = [a for a in self.db.attributes.find({}, {"_id": False})]

    def run(self):
        images = self.db.images.find({"status": "PENDING"})
        for image in images:
            self.process(image["_id"])
        pipeline = [{"$match": {"operationType": "insert"}}]
        with self.db.images.watch(pipeline) as stream:
            for change in stream:
                id = change["fullDocument"]["_id"]
                self.process(id)

    def process(self, id):
        image = self.db.images.find_one_and_update(
            {"_id": id, "status": "PENDING"}, {"$set": {"status": "PROCESSING"}}
        )
        if image is None:
            return
        start = time.time()
        res = self.model.process(image["data"], image["ext"])
        end = time.time()
        elapsed_time = end - start
        attribute_values = {
            a["name"]: a["values"][res[a["name"]]] for a in self.attributes
        }
        self.db.images.update_one(
            {"_id": id},
            {
                "$set": {
                    "status": "PROCESSED",
                    "elapsed_time": elapsed_time,
                    "attribute_values": attribute_values,
                }
            },
        )
        print(
            "id: {}, elapsed_time: {}, result: {}".format(
                str(id), elapsed_time, attribute_values
            )
        )
        sys.stdout.flush()
