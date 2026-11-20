import pytest

def test_register_new_citizen(client):
    res = client.post("/api/v1/auth/register", json={
        "email": "newcitizen@example.org",
        "password": "Password123!Secure",
        "full_name": "New Citizen",
        "preferred_language": "hi"
    })
    assert res.status_code == 201
    data = res.json()
    assert "access_token" in data
    assert data["user"]["email"] == "newcitizen@example.org"
    assert data["user"]["role"] == "citizen"
    assert data["user"]["preferred_language"] == "hi"

def test_register_duplicate_email_fails(client):
    res = client.post("/api/v1/auth/register", json={
        "email": "duplicate@example.org",
        "password": "Password123!",
        "full_name": "Citizen One",
        "preferred_language": "en"
    })
    assert res.status_code == 201

    res_dup = client.post("/api/v1/auth/register", json={
        "email": "duplicate@example.org",
        "password": "Password123!",
        "full_name": "Citizen Two",
        "preferred_language": "en"
    })
    assert res_dup.status_code == 400
    assert "already exists" in res_dup.json()["detail"]

def test_login_success(client):
    res = client.post("/api/v1/auth/login", json={
        "email": "citizen@nyayasetu.org",
        "password": "CitizenDemo2026!"
    })
    assert res.status_code == 200
    assert "access_token" in res.json()

def test_login_invalid_password(client):
    res = client.post("/api/v1/auth/login", json={
        "email": "citizen@nyayasetu.org",
        "password": "WrongPassword999!"
    })
    assert res.status_code == 401

def test_unauthenticated_me_rejected(client):
    res = client.get("/api/v1/auth/me")
    assert res.status_code == 401

def test_authenticated_me_succeeds(client, citizen_token):
    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {citizen_token}"})
    assert res.status_code == 200
    assert res.json()["email"] == "citizen@nyayasetu.org"

def test_citizen_cannot_access_admin_endpoint(client, citizen_token):
    res = client.get("/api/v1/admin/documents", headers={"Authorization": f"Bearer {citizen_token}"})
    assert res.status_code == 403

def test_admin_can_access_admin_endpoint(client, admin_token):
    res = client.get("/api/v1/admin/documents", headers={"Authorization": f"Bearer {admin_token}"})
    assert res.status_code == 200
    assert isinstance(res.json(), list)

