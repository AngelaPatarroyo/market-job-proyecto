from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 't_usuarios'
    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    contrasena = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    rol = db.Column(db.Integer, db.ForeignKey("t_roles.id"))
    nombre = db.Column(db.String(150))
    telefono = db.Column(db.String(50))
    latitud = db.Column(db.Float)
    longitud = db.Column(db.Float)
    complete = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "correo": self.correo,
            "rol": self.rol,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "latitud": self.latitud,
            "longitud": self.longitud,
            "complete": self.complete,

            # do not serialize the password, its a security breach
        }

class Rol(db.Model):
    __tablename__ = 't_roles'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(10), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre

            # do not serialize the password, its a security breach
        }

class Favoritos(db.Model):
    __tablename__ = 't_favoritos'
    id = db.Column(db.Integer, primary_key=True)
    id_empresa = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))
    id_freelancer = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))

    def serialize(self):
        return {
            "id": self.id,
            "id_empresa": self.id_empresa,
            "id_freelancer": self.id_freelancer
        }
class FreelancerIdiomas(db.Model):
    __tablename__ = 't_freelancer_idiomas'
    id = db.Column(db.Integer, primary_key=True)
    idioma_id = db.Column(db.Integer, db.ForeignKey("t_idiomas.id"))
    id_freelancer = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))
    nivel = db.Column(db.String(20))

    def serialize(self):
        return {
            "id": self.id,
            "idioma_id": self.idioma_id,
            "id_freelancer": self.id_freelancer,
            "nivel": self.nivel
        }
class Idiomas(db.Model):
    __tablename__ = 't_idiomas'
    id = db.Column(db.Integer, primary_key=True)
    idioma = db.Column(db.String(20))

    def serialize(self):
        return {
            "id": self.id,
            "idioma": self.idioma
        }

class TipoFreelancer(db.Model):
    __tablename__ = 't_tipo_freelancers'
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(100))
    icono = db.Column(db.String(100))


    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo,
            "icono": self.icono
        }

class Experiencia(db.Model):
    __tablename__ = 't_experiencias'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20))
    experiencia = db.Column(db.String)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "experiencia": self.experiencia
        }

class PerfilFreelancer(db.Model):
    __tablename__ = 't_perfil_freelancers'
    id = db.Column(db.Integer, primary_key=True)
    tipo_freelancer = db.Column(db.Integer, db.ForeignKey("t_tipo_freelancers.id"))
    usuario_id = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))
    descripcion = db.Column(db.String(10000))
    imagen = db.Column(db.String(2000))
    linkedin = db.Column(db.String(2000))
    portafolio = db.Column(db.String(2000))
    tarifa = db.Column(db.Numeric(precision=10, scale=2))
    experiencia_id = db.Column(db.Integer, db.ForeignKey("t_experiencias.id"))

    def serialize(self):
        return {
            "id": self.id,
            "tipo_freelancer": self.tipo_freelancer,
            "usuario_id": self.usuario_id,
            "descripcion": self.descripcion,
            "imagen": self.imagen,
            "linkedin": self.linkedin,
            "portafolio": self.portafolio,
            "tarifa": self.tarifa,
            "experiencia_id": self.experiencia_id,
        }
