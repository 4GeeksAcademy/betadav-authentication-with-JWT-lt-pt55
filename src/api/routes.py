"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Back is working"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "email and password required"}), 401

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    if password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/signup", methods=["POST"])
def sign_up():
    body = request.get_json()
    required_fields = ["email", "password"]

    for field in required_fields:
        if field not in body or not body[field]:
            return jsonify({"msg": f"'{field}' is required."}), 400

    user = User.query.filter_by(email=body["email"]).first()

    if user:
        return jsonify({"msg": "user already exist"}), 401

    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=body["email"])

    return jsonify(access_token=access_token), 200
