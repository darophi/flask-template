from flask import Flask
from flask_restful import Api
from flask_caching import Cache

app = Flask(__name__)
api = Api(app)



from application.api import template

from application.views import index

app.register_blueprint(index.mod)
app.register_blueprint(template.mod)


