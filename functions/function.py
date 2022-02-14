import time

import requests
from datetime import datetime, timezone

import firebase_admin
from firebase_admin import credentials, db, firestore


cred = credentials.Certificate('service.json')

firebase_admin.initialize_app(cred, {
    'projectId' : 'bitcoin-e6458'
})

db = firestore.client()

priceRef = db.collection('price')


def makePayload():
    resp = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')

    data = resp.json();

    payload = {
        'value' : data['bpi']['USD']['rate'],
        'timestamp' : datetime.now(tz=timezone.utc)
    }

    return payload


def updateFirestore(request):
    val = makePayload()
    print("updating..", val)
    db.collection('price').document().set(val)
    return "Update"
