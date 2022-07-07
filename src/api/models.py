from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 't_usuarios'
    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    contrasena = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    rol = db.Column(db.Integer, db.ForeignKey("t_roles.id"))

    def __repr__(self):
        return f'<User {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "correo": self.correo,
            "rol": self.rol
            # do not serialize the password, its a security breach
        }

class Rol(db.Model):
    __tablename__ = 't_roles'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(10), nullable=False)

class Favoritos(db.Model):
    __tablename__ = 't_favoritos'
    id = db.Column(db.Integer, primary_key=True)
    id_empresa = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))
    id_freelancer = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))

class FreelancerIdiomas(db.Model):
    __tablename__ = 't_freelancer_idiomas'
    id = db.Column(db.Integer, primary_key=True)
    idioma_id = db.Column(db.Integer, db.ForeignKey("t_idiomas.id"))
    id_freelancer = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))

class Idiomas(db.Model):
    __tablename__ = 't_idiomas'
    id = db.Column(db.Integer, primary_key=True)
    idioma = db.Column(db.String(20))

class TipoFreelancer(db.Model):
    __tablename__ = 't_tipo_freelancers'
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(100))

class Experiencia(db.Model):
    __tablename__ = 't_experiencias'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20))
    experiencia = db.Column(db.String)

class PerfilFreelancer(db.Model):
    __tablename__ = 't_perfil_freelancers'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150))
    telefono = db.Column(db.String(50))
    latitud = db.Column(db.Float)
    longitud = db.Column(db.Float)
    tipo_freelancer = db.Column(db.Integer, db.ForeignKey("t_tipo_freelancers.id"))
    usuario_id = db.Column(db.Integer, db.ForeignKey("t_usuarios.id"))
    descripcion = db.Column(db.String(10000))
    imagen = db.Column(db.String(2000))
    linkedin = db.Column(db.String(2000))
    portafolio = db.Column(db.String(2000))
    tarifa = db.Column(db.Numeric(precision=10, scale=2))
    experiencia_id = db.Column(db.Integer, db.ForeignKey("t_experiencias.id"))
   
