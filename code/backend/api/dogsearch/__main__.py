from os import environ

from dogsearch import app

app.run(host=environ["HOST"], port=environ["PORT"], debug=True)
