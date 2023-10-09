import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = b't\x0f\x15A@\xc1*\x86\xab\xf2\x0c<\xe4\x07o?5\x00R;M\xb3X\x15v\xaf%@^\xbeG5'

SESSION_TYPE = 'filesystem'

app = Flask(__name__)
app.config.from_object(Config)
app.json.compact = False

# metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
db.init_app(app)

# CORS
CORS(app)

# REST API
api = Api(app)
bcrypt = Bcrypt(app)
