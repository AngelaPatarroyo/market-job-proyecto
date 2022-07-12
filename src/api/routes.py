"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Rol, Favoritos, FreelancerIdiomas, Idiomas, TipoFreelancer, Experiencia, PerfilFreelancer
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


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
    nombre = request.json.get("nombre", None)
    telefono = request.json.get("telefono", None)
    latitud = request.json.get("latitud", None)
    longitud = request.json.get("longitud", None)


    if not correo or not contrasena or not rol:
        return jsonify({'msg': 'Necesitas un correo, una contraseña y un rol para ingresar'}), 404

    usuario_nuevo = Usuario(correo=correo, contrasena=contrasena, is_active=True, rol=int(rol), nombre=nombre, telefono=telefono, latitud=latitud, longitud=longitud)
    db.session.add(usuario_nuevo)
    db.session.commit()
    respuesta = {
        "msg" : "usuario registrado"
    }
    return jsonify(respuesta), 200

@api.route('/get_rols', methods=['GET'])
def get_rols():
    all_rols_query = Rol.query.all()
    all_rols = list(map(lambda x: x.serialize(), all_rols_query))
    return jsonify(all_rols), 200

@api.route('/login', methods=['POST'])
def handle_login():
    correo = request.json.get("correo", None)
    contrasena = request.json.get("contrasena", None)

    usuario_query = Usuario.query.filter_by(correo=correo, contrasena=contrasena).first()
    if not usuario_query:
        return jsonify({"msg": "usuario o contraseña incorrecto"}), 404
    
    print(usuario_query.correo)
    access_token = create_access_token(identity=usuario_query.correo)
    
    response_body = {
        "msg": "bienvenido",
        "Rol": usuario_query.rol,
        "accessToken": access_token
    }

    return jsonify(response_body), 200