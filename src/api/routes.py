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
    codigo = request.json.get("codigo", None)
    telcompleto = codigo + telefono


    if not correo or not contrasena or not rol:
        return jsonify({'msg': 'Necesitas un correo, una contraseña y un rol para ingresar'}), 404

    usuario_nuevo = Usuario(correo=correo, contrasena=contrasena, is_active=True, rol=int(rol), nombre=nombre, telefono=telcompleto, latitud=latitud, longitud=longitud, complete=False)
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
        "nombre": usuario_query.nombre,
        "id": usuario_query.id
    }
    return jsonify(response_body), 200

@api.route('/get_tipos_freelancer', methods=['GET'])
@jwt_required()
def get_tipos():
    all_tipos_freelancer_query = TipoFreelancer.query.all()
    all_tipos_freelancer = list(map(lambda x: x.serialize(), all_tipos_freelancer_query))
    return jsonify(all_tipos_freelancer), 200

@api.route('/get_idiomas', methods=['GET'])
@jwt_required()
def get_idiomas():
    all_idiomas_query = Idiomas.query.all()
    all_idiomas = list(map(lambda x: x.serialize(), all_idiomas_query))
    return jsonify(all_idiomas), 200

@api.route('/add_idioma', methods=['POST'])
@jwt_required()
def add_idioma():
    email_user = get_jwt_identity()
    id_freelancer = Usuario.query.filter_by(correo=email_user).first().id
    idioma_id = request.json.get("idioma_id", None)

    idioma_nuevo = FreelancerIdiomas( idioma_id=int(idioma_id), id_freelancer=int(id_freelancer) )
    db.session.add(idioma_nuevo)
    db.session.commit()
    respuesta = {
        "msg" : "idioma registrado"
    }
    return jsonify(respuesta), 200

@api.route('/get_experiencias', methods=['GET'])
@jwt_required()
def get_experiencias():
    all_experiencias_query = Experiencia.query.all()
    all_experiencias = list(map(lambda x: x.serialize(), all_experiencias_query))
    return jsonify(all_experiencias), 200

@api.route('/completar_perfil', methods=['POST'])
@jwt_required()
def completa_perfil():
    email_user = get_jwt_identity()
    usuario_id = Usuario.query.filter_by(correo=email_user).first().id
    tipo_freelancer = request.json.get("tipo_freelancer", None)
    descripcion = request.json.get("descripcion", None)
    imagen = request.json.get("imagen", None)
    linkedin = request.json.get("linkedin", None)
    portafolio = request.json.get("portafolio", None)
    tarifa = request.json.get("tarifa", None)
    experiencia_id = request.json.get("experiencia_id", None)

    perfil_nuevo = PerfilFreelancer(tipo_freelancer=int(tipo_freelancer), usuario_id=int(usuario_id), descripcion=descripcion, imagen=imagen, linkedin=linkedin, portafolio=portafolio, tarifa=tarifa, experiencia_id=int(experiencia_id)  )
    db.session.add(perfil_nuevo)
    db.session.commit()
    respuesta = {
        "msg" : "perfil completado exitosamente"
    }
    return jsonify(respuesta), 200

@api.route('/get_idiomas_freelancer', methods=['GET'])
@jwt_required()
def get_idiomas_freelancer():
    email_user = get_jwt_identity()
    usuario_id = Usuario.query.filter_by(correo=email_user).first().id
    idiomas_usuario = FreelancerIdiomas.query.filter_by(id_freelancer=usuario_id)
    lista_idiomas = []
    for iu in idiomas_usuario: 
        # print(iu.idioma_id)
        idioma = Idiomas.query.get(iu.idioma_id)
        # print(idioma.idioma)
        lista_idiomas.append({"nombre":idioma.idioma, "id":idioma.id})

    return jsonify(lista_idiomas),200

@api.route('/completar_registro', methods=['PUT'])
@jwt_required()
def completar_registro():
    email_user = get_jwt_identity()
    usuario = Usuario.query.filter_by(correo=email_user).first()
    usuario.complete = True
    db.session.commit()

    respuesta = {
        "msg" : "Registro completado exitosamente"
    }
    return jsonify(respuesta), 200

@api.route('/add_favorito', methods=['POST'])
@jwt_required()
def add_favorito():
    email_user = get_jwt_identity()
    id_empresa = Usuario.query.filter_by(correo=email_user).first().id
    id_freelancer = request.json.get("id_freelancer", None)

    favorito_nuevo = Favoritos( id_empresa=int(id_empresa), id_freelancer=int(id_freelancer) )
    db.session.add(favorito_nuevo)
    db.session.commit()
    respuesta = {
        "msg" : "favorito agregado"
    }
    return jsonify(respuesta), 200

@api.route('/cargar_perfil/<int:id>/', methods=['GET'])
# @jwt_required()
def cargar_perfil(id):
    info_usuario = Usuario.query.filter_by(id=id).first()
    info_perfil = PerfilFreelancer.query.filter_by(usuario_id=id).first()
    info_completa = {
        "nombre": info_usuario.nombre,
        "telefono": info_usuario.telefono,
        "tipo_freelancer": info_perfil.tipo_freelancer, 
        "descripcion": info_perfil.descripcion,
        "imagen": info_perfil.imagen,
        "linkedin": info_perfil.linkedin,
        "portafolio": info_perfil.portafolio,
        "tarifa": info_perfil.tarifa


    }
    return jsonify(info_completa),200



# @api.route('/test', methods=['GET'])
# def test():
#     q = request.args.get("nombreparametro")
#     print(q)
#     busqueda = "%{}%".format(q)
#     posts = Usuarios.query.filter(Usuario.correo.like(busqueda)).all()
#     return jsonify([]),200

    

   