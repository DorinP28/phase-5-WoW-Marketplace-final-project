from flask_restful import Resource
from config import db
from models import User
from flask import session, request

class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            session['user_id'] = user.id
            return {"message": "Logged in successfully."}, 200

        return {"message": "Invalid credentials."}, 401
    
class CheckSession(Resource):

    def get(self):
        current_user_id = session.get('user_id')
        
        if not current_user_id:
            return {'message': 'Not logged in.'}, 401

        user = User.query.get(current_user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return user.serialize()


class UserResource(Resource):
    def get(self, user_id):
        current_user_id = session.get('user_id')
        
        if not current_user_id:
            return {'message': 'Authentication required.'}, 401

        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return user.serialize()

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted.'}
    
    def put(self, user_id):
        current_user_id = session.get('user_id')
    
        if not current_user_id or current_user_id != user_id:
            return {'message': 'Authentication required or mismatch user id.'}, 401

        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'contact_details' in data:
            user.contact_details = data['contact_details']

        db.session.commit()
    
        return user.serialize()


class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        contact_details = data.get('contact_details', '')
        
        existing_user = User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first()
        if existing_user:
            return {"message": "A user with that username or email already exists."}, 400

        new_user = User(username=username, email=email, contact_details=contact_details)
        new_user.password = password  
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully."}, 201


class UserLogout(Resource):
    def post(self):
        session.pop('user_id', None)
        return {'message': 'Logged out successfully'}, 200

class UserCarsResource(Resource):
    def get(self, user_id):
        if session.get('user_id') != user_id:
            return {"message": "Access denied"}, 401

        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        cars = Car.query.filter_by(owner_id=user_id).all()
        return [car.serialize() for car in cars]