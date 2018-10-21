
from flask import Blueprint, jsonify




mod = Blueprint('template', __name__, url_prefix='/api/template')


@mod.route('/')
def collection():
    return jsonify({'hello':"world"})