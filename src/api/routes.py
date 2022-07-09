"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Rol, Favoritos, FreelancerIdiomas, Idiomas, TipoFreelancer, Experiencia, PerfilFreelancer
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    correo = request.json.get("correo", None)
    contrasena = request.json.get("contrasena", None)
    rol = request.json.get("rol", None)

    if not correo or not contrasena or not rol:
        return jsonify({'msg': 'Necesitas un correo, una contraseña y un rol para ingresar'}), 404

    usuario_nuevo = Usuario(correo=correo, contrasena=contrasena, is_active=True, rol=int(rol))
    db.session.add(usuario_nuevo)
    db.session.commit()
    respuesta = {
        "msg" : "usuario registrado"
    }
    return jsonify(respuesta), 200