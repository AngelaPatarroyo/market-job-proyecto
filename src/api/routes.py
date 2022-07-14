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
        "rol": usuario_query.rol,
        "accessToken": access_token,
        "nombre": usuario_query.nombre

    }

    return jsonify(response_body), 200

@api.route('/get_tipos_freelancer', methods=['GET'])
def get_tipos():
    all_tipos_freelancer_query = TipoFreelancer.query.all()
    all_tipos_freelancer = list(map(lambda x: x.serialize(), all_tipos_freelancer_query))
    return jsonify(all_tipos_freelancer), 200

@api.route('/get_idiomas', methods=['GET'])
def get_idiomas():
    all_idiomas_query = Idiomas.query.all()
    all_idiomas = list(map(lambda x: x.serialize(), all_idiomas_query))
    return jsonify(all_idiomas), 200

@api.route('/get_experiencias', methods=['GET'])
@jwt_required()
def get_experiencias():
    all_experiencias_query = Experiencia.query.all()
    all_experiencias = list(map(lambda x: x.serialize(), all_experiencias_query))
    return jsonify(all_experiencias), 200

@api.route('/completarperfil', methods=['POST'])
@jwt_required()
def completa_perfil():
    email_user = get_jwt_identity()
    usuario_id = Usuario.query.filter_by(correo=email_user).first().id
    tipo_freelancer = request.json.get("tipo_freelancer", None)
    descripcion = request.json.get("descripcion", None)
    imagen = request.json.get("imagen", None)
    linkedin = request.json.get("linkedin", None)
    portafolio = request.json.get("portafolio", None)
    # idioma = request.json.get("idioma", None)
    tarifa = request.json.get("tarifa", None)
    experiencia_id = request.json.get("experiencia_id", None)

    perfil_nuevo = PerfilFreelancer(tipo_freelancer=int(tipo_freelancer), usuario_id=int(usuario_id), descripcion=descripcion, imagen=imagen, linkedin=linkedin, portafolio=portafolio, tarifa=tarifa, experiencia_id=int(experiencia_id)  )
    db.session.add(perfil_nuevo)
    db.session.commit()
    respuesta = {
        "msg" : "perfil completado exitosamente"
    }
    return jsonify(respuesta), 200

# @api.route('/test', methods=['GET'])
# def test():
#     q = request.args.get("nombreparametro")
#     print(q)
#     busqueda = "%{}%".format(q)
#     posts = Usuarios.query.filter(Usuario.correo.like(busqueda)).all()
#     return jsonify([]),200

    

   