from os import environ

from dogsearch.worker import Worker

host = environ["DB_HOST"]
dbname = environ["DB_NAME"]

worker = Worker(host, dbname)
worker.run()
