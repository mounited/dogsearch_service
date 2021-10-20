from os import environ

from dogsearch.api import app

app.run(host=environ["HOST"], port=environ["PORT"], debug=True)
