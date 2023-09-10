from flask import Flask, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from google.cloud import storage
from flask import send_file
import os
import io

# Initialization
app = Flask(__name__)
bp = Blueprint('pdf_routes', __name__)
client = storage.Client.from_service_account_json('../keys/pragmatic-byway-398602-13e4fae477cb.json')
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
    if 'pdf' not in request.files:
        return jsonify(success=False, message='No file part'), 400

    file = request.files['pdf']

    if file.filename == '':
        return jsonify(success=False, message='No selected file'), 400

    if file:
        secure_file_name = secure_filename(file.filename)
        upload_blob(file.stream, secure_file_name)
        return jsonify(success=True, message='File successfully uploaded'), 201

    return jsonify(success=False, message="Unexpected error"), 500


@bp.route('/api/retrieve/<filename>', methods=['GET'])
def retrieve_file(filename):
    secure_file_name = secure_filename(filename)
    blob = bucket.blob(secure_file_name)

    # Check if blob exists
    if not blob.exists():
        return jsonify(success=False, message="File not found"), 404

    output_file_path = f"temp_{secure_file_name}"
    download_blob(secure_file_name, output_file_path)

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
    blobs = bucket.list_blobs()
    files = [blob.name for blob in blobs]
    return jsonify(files)


if __name__ == "__main__":
    app.register_blueprint(bp)
    app.run(debug=True)
