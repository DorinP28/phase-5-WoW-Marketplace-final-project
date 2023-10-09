from flask_restful import Resource
from config import db
from models import Car
from flask import session, request, send_from_directory
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'uploaded_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class CarListResource(Resource):
    def get(self):
        cars = Car.query.all()
        return [car.serialize() for car in cars], 200

    def post(self):
        user_id = session.get('user_id')
        
        if not user_id:
            return {'message': 'Authentication required.'}, 401

        # Fetching form data instead of JSON for mixed content 
        make = request.form.get('make')
        model = request.form.get('model')
        year = request.form.get('year')
        price = request.form.get('price')

        image = request.files.get('image')
        image_path = None

        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            image.save(image_path)

        new_car = Car(
            make=make,
            model=model,
            year=year,
            price=price,
            images=image_path if image_path else request.form.get('images'),
            owner_id=user_id
        )
        
        db.session.add(new_car)
        db.session.commit()

        return {"message": "Car listed successfully.", "car": new_car.serialize()}, 201

class CarResource(Resource):
    def get(self, car_id):
        car = Car.query.get(car_id)
        if not car:
            return {'message': 'Car not found'}, 404
        return car.serialize()

    def delete(self, car_id):
        car = Car.query.get(car_id)
        if not car:
            return {'message': 'Car not found'}, 404
        db.session.delete(car)
        db.session.commit()
        return {'message': 'Car deleted.'}
    
class CarReviewsResource(Resource):
    def get(self, car_id):
        car = Car.query.get(car_id)
        if not car:
            return {'message': 'Car not found'}, 404
        reviews = Review.query.filter_by(car_id=car_id).all()
        return [review.serialize() for review in reviews]