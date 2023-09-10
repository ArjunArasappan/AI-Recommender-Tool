from flask import Blueprint, Flask, request, jsonify
from flask_cors import CORS
from metaphor_python import Metaphor

bp = Blueprint('metaphor_routes', __name__)

@bp.route('/api/request', methods=['POST'])
def make_api_request():
    data = request.json
    user_input = data.get('userInput')
    metaphor = Metaphor("06c5ba21-eed3-41bc-bc33-2b964a3aa486")

    print(user_input)

    response = metaphor.search(
    user_input,
    num_results=10,
    use_autoprompt=True,
    )

    results = response.results

    return jsonify(results) 

@bp.route('/api/getcontent', methods=['POST'])
def get_metaphor_content():
    data = request.json
    user_input = data.get('userInput')
    metaphor = Metaphor("06c5ba21-eed3-41bc-bc33-2b964a3aa486")

    print(user_input)

    response = metaphor.search(
    user_input,
    num_results=10,
    use_autoprompt=True,
    )

    results = response.results

    return jsonify(results) 