from flask import Flask, request, jsonify, Blueprint, send_file
from werkzeug.utils import secure_filename
from google.cloud import storage
import os
import io

# Initialization
app = Flask(__name__)
bp = Blueprint('pdf_routes', __name__)
client = storage.Client.from_service_account_json('../AI-Recommender-Tool/keys/pragmatic-byway-398602-13e4fae477cb.json')
bucket_name = 'penn-apps-bucket'
bucket = client.get_bucket(bucket_name)

def upload_blob(file_stream, destination_blob_name):
    """Uploads a file to the bucket."""
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_file(file_stream)

def download_blob(source_blob_name, file_path):
    """Downloads a blob from the bucket."""
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(file_path)
    return file_path

@bp.route('/api/upload', methods=['POST'])
def upload_file():
    username = request.form.get('username')
    if not username:
        return jsonify(success=False, message='Username is required'), 400

    if 'pdf' not in request.files:
        return jsonify(success=False, message='No file part'), 400

    file = request.files['pdf']

    if file.filename == '':
        return jsonify(success=False, message='No selected file'), 400

    if file:
        secure_file_name = secure_filename(file.filename)
        destination_path = f"{username}/{secure_file_name}"
        upload_blob(file.stream, destination_path)
        return jsonify(success=True, message='File successfully uploaded'), 201

    return jsonify(success=False, message="Unexpected error"), 500

@bp.route('/api/retrieve/<filename>', methods=['GET'])
def retrieve_file(filename):
    username = request.args.get('username')
    if not username:
        return jsonify(success=False, message='Username is required'), 400

    secure_file_name = secure_filename(filename)
    source_path = f"{username}/{secure_file_name}"
    blob = bucket.blob(source_path)

    if not blob.exists():
        return jsonify(success=False, message="File not found"), 404

    output_file_path = f"temp_{secure_file_name}"
    download_blob(source_path, output_file_path)

    with open(output_file_path, 'rb') as f:
        file_data = f.read()

    os.remove(output_file_path)
    return send_file(
        io.BytesIO(file_data),
        mimetype='application/pdf',
        as_attachment=False
    )

@bp.route('/api/retrieve', methods=['GET'])
def retrieve_file_list():
    username = request.args.get('username')
    if not username:
        return jsonify(success=False, message='Username is required'), 400

    prefix = f"{username}/"
    blobs = bucket.list_blobs(prefix=prefix)
    files = [blob.name.replace(prefix, '') for blob in blobs]
    return jsonify(files)

if __name__ == "__main__":
    app.register_blueprint(bp)
    app.run(debug=True)
