#!/usr/bin/env python3

from app import app
from models import db, User, Car, Review, Message

def seed_data():
    db.drop_all()
    db.create_all()

    # Users
    users = [
        User(username='JohnDoe', email='john@example.com', contact_details='1234567890', password='password'),
        User(username='JaneDoe', email='jane@example.com', contact_details='0987654321', password='password'),
        User(username='MikeSmith', email='mike@example.com', contact_details='111223344', password='password'),
        User(username='AnnaBrown', email='anna@example.com', contact_details='555667788', password='password'),
        User(username='ChrisWhite', email='chris@example.com', contact_details='999888777', password='password')
    ]

    for user in users:
        db.session.add(user)
    db.session.commit()

    # Cars with images path
    cars = [
        Car(make='Toyota', model='Camry', year=2021, price=30000, owner=users[0], images='uploaded_images/2021-toyota-camry.jpg'),
        Car(make='Honda', model='Civic', year=2020, price=25000, owner=users[1], images='uploaded_images/2020-honda-civic.jpg'),
        Car(make='Ford', model='Mustang', year=2019, price=35000, owner=users[2], images='uploaded_images/2019-ford-mustang.jpg'),
        Car(make='Chevrolet', model='Malibu', year=2018, price=27000, owner=users[3], images='uploaded_images/2018-chevrolet-malibu.jpg'),
        Car(make='Tesla', model='Model 3', year=2022, price=55000, owner=users[4], images='uploaded_images/2022-tesla-model3.jpg')
    ]

    for car in cars:
        db.session.add(car)
    db.session.commit()

    # Reviews
    reviews = [
        Review(content='Great car!', rating=5, car=cars[0], reviewer=users[1]),
        Review(content='Quite expensive but worth it.', rating=4, car=cars[4], reviewer=users[0]),
        Review(content='Amazing fuel efficiency.', rating=5, car=cars[1], reviewer=users[2]),
        Review(content='Could be better.', rating=3, car=cars[2], reviewer=users[3]),
        Review(content='Love the interior.', rating=4, car=cars[3], reviewer=users[4])
    ]

    for review in reviews:
        db.session.add(review)
    db.session.commit()

    # Messages
    messages = [
        Message(content='Is the car still available?', sender_id=users[1].id, recipient_id=users[0].id, car_id=cars[0].id),
        Message(content='Can I take it for a test drive tomorrow?', sender_id=users[2].id, recipient_id=users[1].id, car_id=cars[1].id),
        Message(content='What is the mileage?', sender_id=users[3].id, recipient_id=users[2].id, car_id=cars[2].id),
        Message(content='Is the price negotiable?', sender_id=users[4].id, recipient_id=users[3].id, car_id=cars[3].id),
        Message(content='How many previous owners?', sender_id=users[0].id, recipient_id=users[4].id, car_id=cars[4].id)
    ]

    for message in messages:
        db.session.add(message)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()