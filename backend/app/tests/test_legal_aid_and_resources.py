import pytest

def test_legal_aid_directory_search(client):
    res = client.get("/api/v1/legal-aid/search?state=Delhi")
    assert res.status_code == 200
    entries = res.json()
    assert len(entries) > 0
    # Check that contact info has verified portal
    for e in entries:
        assert "nalsa.gov.in" in e["official_portal_url"] or "dslsa.org" in e["official_portal_url"]

def test_legal_aid_info_endpoint(client):
    res = client.get("/api/v1/legal-aid/info")
    assert res.status_code == 200
    data = res.json()
    assert "nalsa.gov.in" in data["official_portal"]
    assert "15100" in data["national_helpline"]

def test_legal_resources_list_and_filter(client):
    res = client.get("/api/v1/resources")
    assert res.status_code == 200
    resources = res.json()
    assert len(resources) >= 3

    # Filter by category
    filter_res = client.get("/api/v1/resources?category=Consumer Protection")
    assert filter_res.status_code == 200
    consumer_res = filter_res.json()
    assert len(consumer_res) >= 1
    for r in consumer_res:
        assert r["category"] == "Consumer Protection"

def test_health_check(client):
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"
    assert data["total_indexed_documents"] > 0
    assert "ai_engine" in data

