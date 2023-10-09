from flask_restful import Resource
from config import db
from models import Review, Car, User
from flask import request, session

class CarReviewsResource(Resource):
    def get(self, car_id):
        car = Car.query.get(car_id)
        if not car:
            return {'message': 'Car not found'}, 404

        reviews = Review.query.filter_by(car_id=car_id).order_by(Review.id.desc()).all()
        return [review.serialize() for review in reviews]

    def post(self, car_id):
        car = Car.query.get(car_id)
        if not car:
            return {'message': 'Car not found'}, 404

        data = request.get_json()
        content = data.get('content')
        rating = data.get('rating')
        
        if not content or not rating:
            return {'message': 'Both content and rating are required.'}, 400

        new_review = Review(
            content=content,
            rating=rating,
            car_id=car_id,
            user_id=session.get('user_id')
        )

        if not session.get('user_id'):
            reviewer = "Unregistered User {}".format(str(Review.query.count() + 1))  # generate a unique username
            dummy_hashed_password = "unregistered_dummy_hash"  # dummy hashed password for unregistered users
            dummy_email = "unregistered{}@dummy.com".format(str(Review.query.count() + 1))  # dummy email
            unreg_user = User(username=reviewer, hashed_password=dummy_hashed_password, email=dummy_email)
            db.session.add(unreg_user)
            db.session.flush()
            new_review.user_id = unreg_user.id

        db.session.add(new_review)
        db.session.commit()

        return {"message": "Review added successfully.", "review": new_review.serialize()}, 201


class ReviewResource(Resource):
    def put(self, review_id):
        if not session.get('user_id'):
            return {"message": "Authentication required."}, 401

        review = Review.query.get(review_id)
        if not review:
            return {'message': 'Review not found'}, 404

        if review.user_id != session.get('user_id'):
            return {'message': 'Access denied'}, 403

        data = request.get_json()
        review.content = data.get('content', review.content)
        review.rating = data.get('rating', review.rating)
        
        db.session.commit()

        return {"message": "Review updated successfully."}

    def delete(self, review_id):
        if not session.get('user_id'):
            return {"message": "Authentication required."}, 401

        review = Review.query.get(review_id)
        if not review:
            return {'message': 'Review not found'}, 404

        if review.user_id != session.get('user_id'):
            return {'message': 'Access denied'}, 403

        db.session.delete(review)
        db.session.commit()
        return {"message": "Review deleted successfully."}
