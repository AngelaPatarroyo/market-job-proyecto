  
import os
from flask_admin import Admin
from .models import db, Usuario, Rol, Favoritos, FreelancerIdiomas, Idiomas, TipoFreelancer, Experiencia, PerfilFreelancer
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Rol, db.session))
    admin.add_view(ModelView(Favoritos, db.session))
    admin.add_view(ModelView(FreelancerIdiomas, db.session))
    admin.add_view(ModelView(Idiomas, db.session))
    admin.add_view(ModelView(TipoFreelancer, db.session))
    admin.add_view(ModelView(Experiencia, db.session))
    admin.add_view(ModelView(PerfilFreelancer, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))