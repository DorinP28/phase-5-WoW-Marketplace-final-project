from flask_restful import Resource
from config import db
from models import Message, User
from flask import request, session

class SendMessageResource(Resource):
    def post(self, recipient_id):
        if not session.get('user_id'):
            return {"message": "Authentication required."}, 401

        data = request.get_json()
        new_message = Message(
            content=data['content'],
            sender_id=session.get('user_id'),
            recipient_id=recipient_id,
            car_id=data['car_id'] 
        )
        
        db.session.add(new_message)
        db.session.commit()

        return {"message": "Message sent successfully."}, 201

class InboxResource(Resource):
    def get(self):
        if not session.get('user_id'):
            return {"message": "Authentication required."}, 401

        messages = Message.query.filter_by(recipient_id=session.get('user_id')).all()
        return [message.serialize() for message in messages]

class SentMessagesResource(Resource):
    def get(self):
        if not session.get('user_id'):
            return {"message": "Authentication required."}, 401

        messages = Message.query.filter_by(sender_id=session.get('user_id')).all()
        return [message.serialize() for message in messages]

class DeleteMessageResource(Resource):
    def delete(self, message_id):
        if not session.get('user_id'):
            return {"message": "Authentication required."}, 401

        message = Message.query.get(message_id)
        if not message:
            return {'message': 'Message not found'}, 404

        if message.sender_id != session.get('user_id') and message.recipient_id != session.get('user_id'):
            return {'message': 'Access denied'}, 403

        db.session.delete(message)
        db.session.commit()

        return {"message": "Message deleted successfully."}

class MessageListResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        
        if not user_id:
            return {'message': 'Authentication required.'}, 401

        sent_messages = Message.query.filter_by(sender_id=user_id).all()
        received_messages = Message.query.filter_by(recipient_id=user_id).all()
        
        return {
            "sent": [msg.serialize() for msg in sent_messages],
            "received": [msg.serialize() for msg in received_messages]
        }
    
class GetUserContactDetails(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return {'contact_details': user.contact_details}