import pytest
import requests
import json
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home_route():
    response = client.get('/')
    assert response.status_code == 200
    assert b"This is Home Route" in response.data

def test_invalid_routes():
    client = app.test_client()
    response = client.get('/nonexist_route')
    assert response.status_code == 404

def test_signup_route(client, mongo):
    mongo.db.users.delete_many({})
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "testpassword",
    }
    response = client.post("/signup", json=data)
    assert response.status_code == 200
    assert response.get_json() == {"message": "Registration successful"}
    response = client.post("/signup", json=data)
    assert response.status_code == 409
    assert response.get_json() == {"error": "Email already exists"}


def test_login(client, mongo):
    mongo.db.users.delete_many({})
    user_data = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "testpassword",
    }
    mongo.db.users.insert_one(user_data)
    data = {"email": "test@example.com", "password": "testpassword"}
    response = client.post("/login", json=data)
    assert response.status_code == 200
    assert "token" in response.get_json()
    assert "role" in response.get_json()
    data = {"email": "wrong@example.com", "password": "testpassword"}
    response = client.post("/login", json=data)
    assert response.status_code == 401
    assert response.get_json() == {"error": "Unauthorized Access"}
    data = {"email": "test@example.com", "password": "wrongpassword"}
    response = client.post("/login", json=data)
    assert response.status_code == 401
    assert response.get_json() == {"error": "Unauthorized"}

