"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Rol, Favoritos, FreelancerIdiomas, Idiomas, TipoFreelancer, Experiencia, PerfilFreelancer
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json


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
    
    usuario_prueba = Usuario.query.filter_by(correo=correo).first()
    if not usuario_prueba:
    

        usuario_nuevo = Usuario(correo=correo, contrasena=contrasena, is_active=True, rol=int(rol), nombre=nombre, telefono=telcompleto, latitud=latitud, longitud=longitud, complete=False)
        db.session.add(usuario_nuevo)
        db.session.commit()
        respuesta = {
            "msg" : "usuario registrado"
        }
        return jsonify(respuesta), 200
    
    else:
        return jsonify({"msg": "el usuario ya esta registrado"}), 404
        
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

@api.route('/add_favorito/<int:id>/', methods=['POST'])
@jwt_required()
# def add_favorito(id):
#     email_user = get_jwt_identity()
#     id_empresa = Usuario.query.filter_by(correo=email_user).first().id
#     id_freelancer = id

#     favorito_nuevo = Favoritos( id_empresa=int(id_empresa), id_freelancer=int(id_freelancer) )
#     db.session.add(favorito_nuevo)
#     db.session.commit()
#     respuesta = {
#         "msg" : "favorito agregado"
#     }
#     return jsonify(respuesta), 200
def add_favorito(id):
    email_user = get_jwt_identity()
    id_empresa = Usuario.query.filter_by(correo=email_user).first().id
    id_freelancer = int(id)
    favorito_query = Favoritos.query.filter_by(id_freelancer = id_freelancer, id_empresa = id_empresa).first()
    print(favorito_query)
    if favorito_query is None:
        favorito_nuevo = Favoritos( id_empresa=int(id_empresa), id_freelancer=int(id_freelancer) )
        db.session.add(favorito_nuevo)
        db.session.commit()
        respuesta = {
            "msg" : "favorito agregado"
        }
    else:
        respuesta = {
            "msg" : "favorito ya existe"
        }
    return jsonify(respuesta), 200

@api.route('/delete_favorito/<int:id>/', methods=['DELETE'])
@jwt_required()
def delete_favorito(id):
    favorito = Favoritos.query.filter_by(id=id).first()


    # favorito_nuevo = Favoritos( id_empresa=int(id_empresa), id_freelancer=int(id_freelancer) )
    db.session.delete(favorito)
    db.session.commit()
    respuesta = {
        "msg" : "favorito eliminado"
    }
    return jsonify(respuesta), 200


@api.route('/ver_perfil_completo/<int:id>/', methods=['GET'])
# @jwt_required()
def cargar_perfil(id):
    info_usuario = Usuario.query.filter_by(id=id).first()
    info_perfil = PerfilFreelancer.query.filter_by(usuario_id=id).first()
    tipo_freelancer = TipoFreelancer.query.filter_by(id=info_perfil.tipo_freelancer).first().tipo
    freelancer_idiomas = FreelancerIdiomas.query.filter_by(id_freelancer=id)
    array_idiomas = []
    for i in freelancer_idiomas:
        idioma = Idiomas.query.filter_by(id=i.idioma_id).first()
        array_idiomas.append({"nombre":idioma.idioma, "id":idioma.id})
        experiencia = Experiencia.query.filter_by(id=info_perfil.experiencia_id).first().nombre
        
    info_completa = {
        "usuario_id": info_usuario.id,
        "nombre": info_usuario.nombre,
        "telefono": info_usuario.telefono,
        "tipo_freelancer": tipo_freelancer, 
        "descripcion": info_perfil.descripcion,
        "imagen": info_perfil.imagen,
        "linkedin": info_perfil.linkedin,
        "portafolio": info_perfil.portafolio,
        "tarifa": info_perfil.tarifa,
        "latitud": info_usuario.latitud,
        "longitud": info_usuario.longitud,
        "idiomas": array_idiomas,
        "experiencia": experiencia

    }
    return jsonify(info_completa),200

@api.route('/ver_favoritos/', methods=['GET'])
@jwt_required()
def ver_favoritos():
    email_user = get_jwt_identity()
    id_empresa = Usuario.query.filter_by(correo=email_user).first().id
    array_favoritos_empresa = Favoritos.query.filter_by(id_empresa = id_empresa)
    array_resumenes_favoritos = []
    for u in array_favoritos_empresa:
        perfil_freelancer = PerfilFreelancer.query.filter_by(usuario_id = u.id_freelancer).first()
        usuario_freelancer = Usuario.query.filter_by(id = u.id_freelancer).first()
        tipo_freelancer = TipoFreelancer.query.filter_by(id=perfil_freelancer.tipo_freelancer).first()
        experiencia = Experiencia.query.filter_by(id=perfil_freelancer.experiencia_id).first()

        info_resumen = {
            "id_favorito": u.id,
            "id": u.id_freelancer,
            "nombre": usuario_freelancer.nombre,
            "tipo_freelancer": tipo_freelancer.tipo,
            "experiencia": experiencia.nombre,
            "tarifa": int(perfil_freelancer.tarifa),
            "imagen": perfil_freelancer.imagen
        }
        array_resumenes_favoritos.append(info_resumen)
    
    return jsonify(array_resumenes_favoritos), 200

@api.route('/ver_perfiles/', methods=['GET'])
# @jwt_required()
def ver_perfiles():  
    id_rol_freelancer = Rol.query.filter_by(nombre="Freelancer").first().id
    id_tipo_freelancer = int(request.args.get("id_tipo", False))
    id_experiencia = int(request.args.get("id_experiencia", False))
    array_usuarios_freelancer = Usuario.query.filter_by(rol = id_rol_freelancer)
    array_resumenes_freelancer = []
    for u in array_usuarios_freelancer:
        perfil_freelancer = PerfilFreelancer.query.filter_by(usuario_id = u.id).first()
        tipo_freelancer = TipoFreelancer.query.filter_by(id=perfil_freelancer.tipo_freelancer).first()
        experiencia = Experiencia.query.filter_by(id=perfil_freelancer.experiencia_id).first()

        info_resumen = {
            "id": u.id,
            "nombre": u.nombre,
            "tipo_freelancer": tipo_freelancer.tipo,
            "experiencia": experiencia.nombre,
            "tarifa": int(perfil_freelancer.tarifa),
            "imagen": perfil_freelancer.imagen
        }
        if id_tipo_freelancer and not id_experiencia: 
            if tipo_freelancer.id == id_tipo_freelancer:
                array_resumenes_freelancer.append(info_resumen)
        elif id_experiencia and not id_tipo_freelancer:
            if experiencia.id == id_experiencia:
                array_resumenes_freelancer.append(info_resumen)
        elif id_tipo_freelancer and id_experiencia:
            if tipo_freelancer.id == id_tipo_freelancer and experiencia.id == id_experiencia:
                array_resumenes_freelancer.append(info_resumen)
        else:
            array_resumenes_freelancer.append(info_resumen)


    
    return jsonify(array_resumenes_freelancer), 200



@api.route('/cargar_datos/', methods=['GET'])  
def cargar_datos():
    rol = Rol.query.all()
    if not rol:
        new_rol_1 = Rol(id=1, nombre="Freelancer" )
        new_rol_2 = Rol(id=2, nombre="Empresa" )
        db.session.add(new_rol_1)
        db.session.add(new_rol_2)
   
    idiomas= Idiomas.query.all()
    if not idiomas:
        new_idioma_1 = Idiomas(id=1, idioma="Inglés" )
        new_idioma_2 = Idiomas(id=2, idioma="Español" )
        new_idioma_3 = Idiomas(id=3, idioma="Francés" )
        new_idioma_4 = Idiomas(id=4, idioma="Alemán" )
        new_idioma_5 = Idiomas(id=5, idioma="Portugués" )
        new_idioma_6 = Idiomas(id=6, idioma="Chino mandarín" )
        new_idioma_7 = Idiomas(id=7, idioma="Hindi" )
        new_idioma_8 = Idiomas(id=8, idioma="Ruso" )
        new_idioma_9 = Idiomas(id=9, idioma="Japonés" )
        new_idioma_10 = Idiomas(id=10, idioma="Coreano" )
        new_idioma_11 = Idiomas(id=11, idioma="Italiano" )
        new_idioma_12 = Idiomas(id=12, idioma="Árabe" )
        new_idioma_13 = Idiomas(id=13, idioma="Turco" )
        
        
        db.session.add(new_idioma_1)
        db.session.add(new_idioma_2)
        db.session.add(new_idioma_3)
        db.session.add(new_idioma_4)
        db.session.add(new_idioma_5)
        db.session.add(new_idioma_6)
        db.session.add(new_idioma_7)
        db.session.add(new_idioma_8)
        db.session.add(new_idioma_9)
        db.session.add(new_idioma_10)
        db.session.add(new_idioma_11)
        db.session.add(new_idioma_12)
        db.session.add(new_idioma_13)
    
    tipos_freelancer= TipoFreelancer.query.all()
    if not tipos_freelancer:
        new_tipo_freelancer_1 = TipoFreelancer(id=1, tipo="Programación y Tecnología", icono="fas fa-code" )
        new_tipo_freelancer_2 = TipoFreelancer(id=2, tipo="Diseño Gráfico", icono= "fas fa-laptop")
        new_tipo_freelancer_3 = TipoFreelancer(id=3, tipo="Digital Marketing", icono= "fab fa-facebook")
        new_tipo_freelancer_4 = TipoFreelancer(id=4, tipo="Producción de Video", icono= "fas fa-laptop")
        db.session.add(new_tipo_freelancer_1)
        db.session.add(new_tipo_freelancer_2)
        db.session.add(new_tipo_freelancer_3)
        db.session.add(new_tipo_freelancer_4)

    experiencias= Experiencia.query.all()
    if not experiencias:
        new_experiencias_1 = Experiencia(id=1, nombre="Junior", experiencia= "0 - 1 Año" )
        new_experiencias_2 = Experiencia(id=2, nombre="Mid Senior", experiencia= "1 - 3 Años" )
        new_experiencias_3 = Experiencia(id=3, nombre="Senior", experiencia= "3 - 5 Años" )
        new_experiencias_4 = Experiencia(id=4, nombre="Advance", experiencia= "5+ Años" )
        db.session.add(new_experiencias_1)
        db.session.add(new_experiencias_2)
        db.session.add(new_experiencias_3)
        db.session.add(new_experiencias_4)

    usuarios= Usuario.query.all()
    if not usuarios:
        new_usuario_1 = Usuario (id=1, correo= "prueba@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Karen Vergara", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_2 = Usuario (id=2, correo= "maria@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Maria Sanchéz", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_3 = Usuario (id=3, correo= "andres123@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Andres Pérez", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_4 = Usuario (id=4, correo= "pablorestrepo@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Pablo Restrepo", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_5 = Usuario (id=5, correo= "isacotes@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Isabel Cotes", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_6 = Usuario (id=6, correo= "paola@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Paola Sanchéz", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_7 = Usuario (id=7, correo= "mauricio@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Mauricio Pérez", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_8 = Usuario (id=8, correo= "joseperez@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Jose Perez", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_9 = Usuario (id=9, correo= "paolavas@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Paola vasquez", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_10 = Usuario (id=10, correo= "marcela@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Marcela Diaz", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_11 = Usuario (id=11, correo= "antoniopp@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Antonio Lara Pérez", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_12 = Usuario (id=12, correo= "majo123@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Maria Jose Gonzalez", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)
        new_usuario_13 = Usuario (id=13, correo= "ivan123@gmail.com", contrasena= '1234', is_active= True, rol= 1, nombre= "Ivan Saldarriaga", telefono= '+573006197027', complete= True, latitud= 6.1515344, longitud=-75.6153715)


        db.session.add(new_usuario_1)
        db.session.add(new_usuario_2)
        db.session.add(new_usuario_3)
        db.session.add(new_usuario_4)
        db.session.add(new_usuario_5)
        db.session.add(new_usuario_6)
        db.session.add(new_usuario_7)
        db.session.add(new_usuario_8)
        db.session.add(new_usuario_9)
        db.session.add(new_usuario_10)
        db.session.add(new_usuario_11)
        db.session.add(new_usuario_12)
        db.session.add(new_usuario_13)
        
   
    perfiles= PerfilFreelancer.query.all()
    if not perfiles:
        new_perfil_freelancer_1 = PerfilFreelancer (id=1, tipo_freelancer= 1, usuario_id= 1, descripcion= "Descripción de Prueba", imagen= " ", linkedin= "https://www.linkedin.com/in/karen-margarita-vergara-vicent-68193461/", portafolio= 'https://github.com/karenvicent', tarifa= 50, experiencia_id= 3)
        new_perfil_freelancer_2 = PerfilFreelancer (id=2, tipo_freelancer= 1, usuario_id= 2, descripcion= "Programador innovador y emprendedor de Internet que se empeña en hacer del mundo un lugar más unido y conectado. Dominio del desarrollo de software y del trabajo con diferentes estructuras de datos JavaScript, React, Python, etc.", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 33, experiencia_id= 2)
        new_perfil_freelancer_3 = PerfilFreelancer (id=3, tipo_freelancer= 2, usuario_id= 3, descripcion= "Diseñadora gráfica con experiencia, especializada en la creación de diseños visuales potentes utilizando ilustraciones digitales, imágenes y tipografía. Comprometida a ayudar a los clientes a dar forma a su identidad de marca mediante el uso de diseños gráficos convincentes. Acostumbrada a colaborar con otros profesionales creativos para alcanzar los objetivos del proyecto.", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 25, experiencia_id= 1)
        new_perfil_freelancer_4 = PerfilFreelancer (id=4, tipo_freelancer= 3, usuario_id= 4, descripcion= "Director de marketing experimentado y enérgico con más de siete años de experiencia en la gestión eficaz de proyectos de marketing desde la concepción hasta la finalización. Experto en el uso de plataformas de marketing digital para aumentar las ventas y la productividad general de la empresa. Experiencia en la preparación y supervisión de campañas de marketing online e impresas, lo que se refleja en un aumento de las relaciones con los socios de la empresa. Experto en monitorización y en informar de los objetivos de marketing, manteniendo las comunicaciones internas necesarias dentro de la empresa", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 33, experiencia_id= 1)
        new_perfil_freelancer_5 = PerfilFreelancer (id=5, tipo_freelancer= 4, usuario_id= 5, descripcion= "Productor Audiovisual, 13 años de experiencia en la creación Vídeos. Una las mayores especialidades es la realización de vídeos corporativos, también manejo deferentes técnicas de producción de vídeos, cómo grabación en alta definición, edición de vídeo, creación de contenido, fotografía, animación 2d y 3d.he participado en diferentes proyectos de comunicación audiovisual para empresas, multinacionales y entidades del Estado entendiendo así el concepto de comunicación de diferentes sectores industriales, comerciales e institucionales", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 40, experiencia_id= 4)
        new_perfil_freelancer_6 = PerfilFreelancer (id=6, tipo_freelancer= 1, usuario_id= 6, descripcion= "Programador innovador y emprendedor de Internet que se empeña en hacer del mundo un lugar más unido y conectado. Dominio del desarrollo de software y del trabajo con diferentes estructuras de datos JavaScript, React, Python, etc.", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 50, experiencia_id= 3)
        new_perfil_freelancer_7 = PerfilFreelancer (id=7, tipo_freelancer= 2, usuario_id= 7, descripcion= "Diseñadora gráfica con experiencia, especializada en la creación de diseños visuales potentes utilizando ilustraciones digitales, imágenes y tipografía. Comprometida a ayudar a los clientes a dar forma a su identidad de marca mediante el uso de diseños gráficos convincentes. Acostumbrada a colaborar con otros profesionales creativos para alcanzar los objetivos del proyecto.", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 40, experiencia_id= 2)
        new_perfil_freelancer_8 = PerfilFreelancer (id=8, tipo_freelancer= 3, usuario_id= 8, descripcion= "Director de marketing experimentado y enérgico con más de siete años de experiencia en la gestión eficaz de proyectos de marketing desde la concepción hasta la finalización. Experto en el uso de plataformas de marketing digital para aumentar las ventas y la productividad general de la empresa. Experiencia en la preparación y supervisión de campañas de marketing online e impresas, lo que se refleja en un aumento de las relaciones con los socios de la empresa. Experto en monitorización y en informar de los objetivos de marketing, manteniendo las comunicaciones internas necesarias dentro de la empresa", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 45, experiencia_id= 2)
        new_perfil_freelancer_9 = PerfilFreelancer (id=9, tipo_freelancer= 4, usuario_id= 9, descripcion= "Productor Audiovisual, 13 años de experiencia en la creación Vídeos. Una las mayores especialidades es la realización de vídeos corporativos, también manejo deferentes técnicas de producción de vídeos, cómo grabación en alta definición, edición de vídeo, creación de contenido, fotografía, animación 2d y 3d.he participado en diferentes proyectos de comunicación audiovisual para empresas, multinacionales y entidades del Estado entendiendo así el concepto de comunicación de diferentes sectores industriales, comerciales e institucionales", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 20, experiencia_id= 1)
        new_perfil_freelancer_10 = PerfilFreelancer (id=10, tipo_freelancer= 1, usuario_id= 10, descripcion= "Programador innovador y emprendedor de Internet que se empeña en hacer del mundo un lugar más unido y conectado. Dominio del desarrollo de software y del trabajo con diferentes estructuras de datos JavaScript, React, Python, etc.", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 70, experiencia_id= 4)
        new_perfil_freelancer_11 = PerfilFreelancer (id=11, tipo_freelancer= 2, usuario_id= 11, descripcion= "Diseñadora gráfica con experiencia, especializada en la creación de diseños visuales potentes utilizando ilustraciones digitales, imágenes y tipografía. Comprometida a ayudar a los clientes a dar forma a su identidad de marca mediante el uso de diseños gráficos convincentes. Acostumbrada a colaborar con otros profesionales creativos para alcanzar los objetivos del proyecto.", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 50, experiencia_id= 3)
        new_perfil_freelancer_12 = PerfilFreelancer (id=12, tipo_freelancer= 3, usuario_id= 12, descripcion= "Director de marketing experimentado y enérgico con más de siete años de experiencia en la gestión eficaz de proyectos de marketing desde la concepción hasta la finalización. Experto en el uso de plataformas de marketing digital para aumentar las ventas y la productividad general de la empresa. Experiencia en la preparación y supervisión de campañas de marketing online e impresas, lo que se refleja en un aumento de las relaciones con los socios de la empresa. Experto en monitorización y en informar de los objetivos de marketing, manteniendo las comunicaciones internas necesarias dentro de la empresa", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 50, experiencia_id= 3)
        new_perfil_freelancer_13 = PerfilFreelancer (id=13, tipo_freelancer= 4, usuario_id= 13, descripcion= "Productor Audiovisual, 13 años de experiencia en la creación Vídeos. Una las mayores especialidades es la realización de vídeos corporativos, también manejo deferentes técnicas de producción de vídeos, cómo grabación en alta definición, edición de vídeo, creación de contenido, fotografía, animación 2d y 3d.he participado en diferentes proyectos de comunicación audiovisual para empresas, multinacionales y entidades del Estado entendiendo así el concepto de comunicación de diferentes sectores industriales, comerciales e institucionales", imagen= " ", linkedin= "https://www.linkedin.com/", portafolio= 'https://github.com/', tarifa= 30, experiencia_id= 2)


        db.session.add(new_perfil_freelancer_1)
        db.session.add(new_perfil_freelancer_2)
        db.session.add(new_perfil_freelancer_3)
        db.session.add(new_perfil_freelancer_4)
        db.session.add(new_perfil_freelancer_5)
        db.session.add(new_perfil_freelancer_6)
        db.session.add(new_perfil_freelancer_7)
        db.session.add(new_perfil_freelancer_8)
        db.session.add(new_perfil_freelancer_9)
        db.session.add(new_perfil_freelancer_10)
        db.session.add(new_perfil_freelancer_11)
        db.session.add(new_perfil_freelancer_12)
        db.session.add(new_perfil_freelancer_13)

    freelancer_idiomas= FreelancerIdiomas.query.all()
    if not freelancer_idiomas:
        new_freelancer_idioma_1 = FreelancerIdiomas(id=1, idioma_id=2, id_freelancer=1)
        new_freelancer_idioma_2 = FreelancerIdiomas(id=2, idioma_id=1, id_freelancer=1)
        new_freelancer_idioma_3 = FreelancerIdiomas(id=3, idioma_id=1, id_freelancer=2)
        new_freelancer_idioma_4 = FreelancerIdiomas(id=4, idioma_id=2, id_freelancer=2)
        new_freelancer_idioma_5 = FreelancerIdiomas(id=5, idioma_id=3, id_freelancer=2)
        new_freelancer_idioma_6 = FreelancerIdiomas(id=6, idioma_id=1, id_freelancer=3)
        new_freelancer_idioma_7 = FreelancerIdiomas(id=7, idioma_id=1, id_freelancer=4)
        new_freelancer_idioma_8 = FreelancerIdiomas(id=8, idioma_id=5, id_freelancer=4)
        new_freelancer_idioma_9 = FreelancerIdiomas(id=9, idioma_id=1, id_freelancer=5)
        new_freelancer_idioma_10 = FreelancerIdiomas(id=10, idioma_id=1, id_freelancer=6)
        new_freelancer_idioma_11 = FreelancerIdiomas(id=11, idioma_id=2, id_freelancer=6)
        new_freelancer_idioma_12 = FreelancerIdiomas(id=12, idioma_id=3, id_freelancer=6)
        new_freelancer_idioma_13 = FreelancerIdiomas(id=13, idioma_id=1, id_freelancer=7)
        new_freelancer_idioma_14 = FreelancerIdiomas(id=14, idioma_id=1, id_freelancer=8)
        new_freelancer_idioma_15 = FreelancerIdiomas(id=15, idioma_id=5, id_freelancer=9)
        new_freelancer_idioma_16 = FreelancerIdiomas(id=16, idioma_id=1, id_freelancer=9)
        new_freelancer_idioma_17 = FreelancerIdiomas(id=17, idioma_id=1, id_freelancer=10)
        new_freelancer_idioma_18 = FreelancerIdiomas(id=18, idioma_id=2, id_freelancer=10)
        new_freelancer_idioma_19 = FreelancerIdiomas(id=19, idioma_id=3, id_freelancer=10)
        new_freelancer_idioma_20 = FreelancerIdiomas(id=20, idioma_id=1, id_freelancer=11)
        new_freelancer_idioma_21 = FreelancerIdiomas(id=21, idioma_id=1, id_freelancer=12)
        new_freelancer_idioma_22 = FreelancerIdiomas(id=22, idioma_id=5, id_freelancer=12)
        new_freelancer_idioma_23 = FreelancerIdiomas(id=23, idioma_id=1, id_freelancer=13)



        db.session.add(new_freelancer_idioma_1)
        db.session.add(new_freelancer_idioma_2)
        db.session.add(new_freelancer_idioma_3)
        db.session.add(new_freelancer_idioma_4)
        db.session.add(new_freelancer_idioma_5)
        db.session.add(new_freelancer_idioma_6)
        db.session.add(new_freelancer_idioma_7)
        db.session.add(new_freelancer_idioma_8)
        db.session.add(new_freelancer_idioma_9)
        db.session.add(new_freelancer_idioma_10)
        db.session.add(new_freelancer_idioma_11)
        db.session.add(new_freelancer_idioma_12)
        db.session.add(new_freelancer_idioma_13)
        db.session.add(new_freelancer_idioma_14)
        db.session.add(new_freelancer_idioma_15)
        db.session.add(new_freelancer_idioma_16)
        db.session.add(new_freelancer_idioma_17)
        db.session.add(new_freelancer_idioma_18)
        db.session.add(new_freelancer_idioma_19)
        db.session.add(new_freelancer_idioma_20)
        db.session.add(new_freelancer_idioma_21)
        db.session.add(new_freelancer_idioma_22)
        db.session.add(new_freelancer_idioma_23)

    db.session.commit()
    return jsonify({"msg": "Datos cargados"}), 200

# @api.route('/test', methods=['GET'])
# def test():
#     q = request.args.get("nombreparametro")
#     print(q)
#     busqueda = "%{}%".format(q)
#     posts = Usuarios.query.filter(Usuario.correo.like(busqueda)).all()
#     return jsonify([]),200


    

   