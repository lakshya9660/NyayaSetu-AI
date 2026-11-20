import pytest

def test_chat_grounded_legal_aid_question(client, citizen_token):
    # 1. Create conversation
    conv_res = client.post("/api/v1/chat/conversations", json={
        "title": "Legal Aid Inquiry",
        "topic": "Legal Aid",
        "language": "en"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    assert conv_res.status_code == 201
    conv_id = conv_res.json()["id"]

    # 2. Ask question grounded in Section 12 of Legal Services Authorities Act
    msg_res = client.post(f"/api/v1/chat/conversations/{conv_id}/messages", json={
        "content": "Who is entitled to receive free legal aid under Section 12?",
        "language": "en"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    assert msg_res.status_code == 200
    data = msg_res.json()

    assert data["sender"] == "assistant"
    assert data["retrieval_status"] in ["grounded", "demo_mode"]
    assert len(data["sources_cited"]) > 0
    # Verify citation fields
    source = data["sources_cited"][0]
    assert "Legal Services Authorities Act" in source["document_title"]
    assert source["page"] is not None
    assert "https://nalsa.gov.in" in source["official_url"]
    assert len(data["supported_points"]) > 0

def test_chat_unsupported_question_triggers_insufficient_evidence(client, citizen_token):
    conv_res = client.post("/api/v1/chat/conversations", json={
        "title": "Out of domain test",
        "language": "en"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    conv_id = conv_res.json()["id"]

    # Ask something completely unsupported by the Indian legal aid documents
    msg_res = client.post(f"/api/v1/chat/conversations/{conv_id}/messages", json={
        "content": "What are the quantum physics regulations for interstellar asteroid mining licenses?",
        "language": "en"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    assert msg_res.status_code == 200
    data = msg_res.json()

    assert data["retrieval_status"] == "insufficient_evidence"
    assert "do not contain sufficient statutory evidence" in data["content"] or "insufficient" in data["content"].lower()
    # No fabricated citations
    assert len(data["sources_cited"]) == 0
    # Must refer to NALSA or DLSA
    assert "nalsa" in data["legal_aid_referral"].lower() or "15100" in data["legal_aid_referral"]

def test_chat_hindi_language_response(client, citizen_token):
    conv_res = client.post("/api/v1/chat/conversations", json={
        "title": "हिंदी विधिक पूछताछ",
        "language": "hi"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    conv_id = conv_res.json()["id"]

    msg_res = client.post(f"/api/v1/chat/conversations/{conv_id}/messages", json={
        "content": "मुफ्त कानूनी सहायता किसे मिल सकती है?",
        "language": "hi"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    assert msg_res.status_code == 200
    data = msg_res.json()
    assert data["language"] == "hi"
    assert len(data["sources_cited"]) > 0

def test_conversation_user_isolation(client, citizen_token):
    # 1. Citizen creates conversation
    conv_res = client.post("/api/v1/chat/conversations", json={
        "title": "Citizen Private Inquiry"
    }, headers={"Authorization": f"Bearer {citizen_token}"})
    conv_id = conv_res.json()["id"]

    # 2. Register a second user
    reg_res = client.post("/api/v1/auth/register", json={
        "email": "intruder@example.org",
        "password": "Password123!",
        "full_name": "Intruder User"
    })
    other_token = reg_res.json()["access_token"]

    # 3. Second user tries to access citizen's conversation
    get_res = client.get(f"/api/v1/chat/conversations/{conv_id}", headers={
        "Authorization": f"Bearer {other_token}"
    })
    assert get_res.status_code == 404

    # 4. Second user tries to delete citizen's conversation
    del_res = client.delete(f"/api/v1/chat/conversations/{conv_id}", headers={
        "Authorization": f"Bearer {other_token}"
    })
    assert del_res.status_code == 404

    # 5. Citizen deletes own conversation successfully
    del_res_own = client.delete(f"/api/v1/chat/conversations/{conv_id}", headers={
        "Authorization": f"Bearer {citizen_token}"
    })
    assert del_res_own.status_code == 200

