from flask import Blueprint, request, jsonify, send_file
from firebase_admin import firestore, auth, storage
import os
fileStorage_api = Blueprint('fileStorage_api', __name__)

db = firestore.client()
bucket = storage.bucket()

cur_path = os.path.dirname(os.path.realpath(__file__))

'''
get /api/fileStorage/get/<file_id>
'''
@fileStorage_api.route('/get/<file_id>', methods=['GET'])
def get(file_id):
    # Retrieve the file from Firebase Storage
    file_ref = bucket.blob(file_id)
    file_path = f"{cur_path}/tmp/{file_id}"
    file_ref.download_to_filename(file_path)

    # Send the file as a response
    return send_file(file_path, as_attachment=True)

def upload(file_name):
    """
    Uploads a file to Firebase Storage.
    """
    file_ref = bucket.blob(file_name)
    file_ref.upload_from_filename(file_name)

    file_ref.make_public()

    print(f"URL: {file_ref.public_url}")

    return file_ref.public_url

upload(f"test.png")