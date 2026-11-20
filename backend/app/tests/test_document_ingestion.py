import io
import pytest

def test_admin_upload_txt_document(client, admin_token):
    content = b"Rights of Senior Citizens Act.\nSection 1: Any senior citizen unable to maintain themselves can apply."
    file_tuple = ("senior_citizens_act.txt", io.BytesIO(content), "text/plain")

    res = client.post(
        "/api/v1/admin/documents/upload",
        files={"file": file_tuple},
        data={
            "title": "Maintenance and Welfare of Parents and Senior Citizens Act Excerpt",
            "publisher": "Ministry of Social Justice and Empowerment",
            "document_type": "Act Excerpt",
            "official_url": "https://socialjustice.gov.in/",
            "verification_date": "2026"
        },
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res.status_code == 200
    data = res.json()
    assert data["title"] == "Maintenance and Welfare of Parents and Senior Citizens Act Excerpt"
    assert data["status"] == "indexed"
    assert data["total_chunks"] > 0
    doc_id = data["id"]

    # Verify citizen can now see it under public /api/v1/sources
    sources_res = client.get("/api/v1/sources")
    assert sources_res.status_code == 200
    doc_titles = [d["title"] for d in sources_res.json()]
    assert "Maintenance and Welfare of Parents and Senior Citizens Act Excerpt" in doc_titles

    # Clean up
    del_res = client.delete(f"/api/v1/admin/documents/{doc_id}", headers={"Authorization": f"Bearer {admin_token}"})
    assert del_res.status_code == 200

def test_reject_executable_upload(client, admin_token):
    fake_exe = b"\x4D\x5A\x90\x00..."
    file_tuple = ("malicious.exe", io.BytesIO(fake_exe), "application/octet-stream")

    res = client.post(
        "/api/v1/admin/documents/upload",
        files={"file": file_tuple},
        data={
            "title": "Bad File",
            "publisher": "Unknown",
            "document_type": "Act",
            "official_url": "https://example.com"
        },
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res.status_code == 400
    assert "Unsupported file type" in res.json()["detail"]

def test_reject_empty_file(client, admin_token):
    file_tuple = ("empty.txt", io.BytesIO(b""), "text/plain")
    res = client.post(
        "/api/v1/admin/documents/upload",
        files={"file": file_tuple},
        data={
            "title": "Empty File",
            "publisher": "Unknown",
            "document_type": "Act",
            "official_url": "https://example.com"
        },
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res.status_code == 400
    assert "empty" in res.json()["detail"].lower()

def test_citizen_cannot_upload_document(client, citizen_token):
    content = b"Some citizen content"
    file_tuple = ("test.txt", io.BytesIO(content), "text/plain")
    res = client.post(
        "/api/v1/admin/documents/upload",
        files={"file": file_tuple},
        data={"title": "Test", "publisher": "Test", "document_type": "Act", "official_url": "http://test.com"},
        headers={"Authorization": f"Bearer {citizen_token}"}
    )
    assert res.status_code == 403

