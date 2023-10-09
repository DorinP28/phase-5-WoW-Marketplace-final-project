#!/usr/bin/env python3

import os

from flask import render_template, request, send_from_directory
from config import app, db, api
from flask_migrate import Migrate
from flask_cors import CORS
from models import User, Car, Review, Message, wishlist, bcrypt

# Database Config for Deployment
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///app.db')  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
port = int(os.environ.get('PORT', 5555))

# bcrypt and set the app's secret key
bcrypt.init_app(app)
app.secret_key = 'your_secret_key' 

# CORS
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)

# session cookie configurations
app.config['SESSION_COOKIE_NAME'] = 'your_session_cookie_name'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False

# Flask-Migrate 
migrate = Migrate(app, db)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/uploaded_images/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Resources import
from resources.user import CheckSession
from resources.user import UserResource, UserLogin, UserRegister, UserLogout, UserCarsResource
from resources.car import CarResource
from resources.car import CarListResource, CarReviewsResource
from resources.review import CarReviewsResource, ReviewResource
from resources.message import SendMessageResource, InboxResource, SentMessagesResource, DeleteMessageResource
from resources.message import MessageListResource, GetUserContactDetails

# API Routes
api.add_resource(CheckSession, '/check_session')
api.add_resource(UserCarsResource, '/users/<int:user_id>/cars')
api.add_resource(CarListResource, '/cars')
api.add_resource(UserResource, '/users/<int:user_id>')
api.add_resource(CarResource, '/cars/<int:car_id>')
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')
api.add_resource(CarReviewsResource, '/cars/<int:car_id>/reviews')
api.add_resource(ReviewResource, '/reviews/<int:review_id>')
api.add_resource(SendMessageResource, '/send-message/<int:recipient_id>')
api.add_resource(InboxResource, '/messages/inbox')
api.add_resource(SentMessagesResource, '/messages/sent')
api.add_resource(DeleteMessageResource, '/messages/delete/<int:message_id>')
api.add_resource(MessageListResource, '/messages')
app.config['UPLOAD_FOLDER'] = 'uploaded_images'
api.add_resource(GetUserContactDetails, '/get-contact-details/<int:user_id>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)


