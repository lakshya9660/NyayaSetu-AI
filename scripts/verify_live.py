import urllib.request
import json
import sys

# Support utf-8 printing on Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def post(url, data, token=None):
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())

def get(url, token=None):
    headers = {}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())

def main():
    print("Connecting to live backend at http://127.0.0.1:8000 ...")

    # 1. Login
    auth = post('http://127.0.0.1:8000/api/v1/auth/login', {
        'email': 'citizen@nyayasetu.org',
        'password': 'CitizenDemo2026!'
    })
    token = auth['access_token']
    print(f"1. Authenticated as: {auth['user']['full_name']} (Role: {auth['user']['role']})")

    # 2. Create conversation
    conv = post('http://127.0.0.1:8000/api/v1/chat/conversations', {
        'title': 'Women Legal Aid Rights',
        'language': 'en'
    }, token=token)
    conv_id = conv['id']
    print(f"2. Created conversation ID: {conv_id}")

    # 3. Post citizen inquiry
    msg = post(f'http://127.0.0.1:8000/api/v1/chat/conversations/{conv_id}/messages', {
        'content': 'Under Section 12, can women get free legal services in court?',
        'language': 'en'
    }, token=token)
    print(f"3. Assistant response status: {msg['retrieval_status']}")
    print(f"   Citations count: {len(msg['sources_cited'])}")
    if msg['sources_cited']:
        s = msg['sources_cited'][0]
        print(f"   Cited Document: '{s['document_title']}' | Page {s['page']} | Section: {s['section']}")
        print(f"   Official URL: {s['official_url']}")
    print(f"   Referral: {msg['legal_aid_referral']}")

    # 4. Search Legal Aid Directory
    aid = get('http://127.0.0.1:8000/api/v1/legal-aid/search?state=Delhi', token=token)
    print(f"4. Retrieved {len(aid)} legal aid directory records for Delhi")
    print(f"   First office: {aid[0]['office_name']} | Portal: {aid[0]['official_portal_url']}")

    # 5. Submit feedback
    fb = post('http://127.0.0.1:8000/api/v1/chat/feedback', {
        'message_id': msg['id'],
        'rating': 1,
        'comments': 'Accurate citation of Section 12 clause (c).'
    }, token=token)
    print(f"5. Saved feedback ID: {fb['id']} (Rating: {fb['rating']})")

    print("\n>>> ALL LIVE BACKEND SERVICES VALIDATED SUCCESSFULLY! <<<")

if __name__ == '__main__':
    main()
