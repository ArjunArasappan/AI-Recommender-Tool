from flask import Flask, request, jsonify
from flask_cors import CORS
from metaphor_python import Metaphor

import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/request', methods=['POST'])

def make_api_request():
    data = request.json
    user_input = data.get('userInput')
    metaphor = Metaphor("06c5ba21-eed3-41bc-bc33-2b964a3aa486")

    print(user_input)

    response = metaphor.search(
    user_input,
    num_results=20,
    use_autoprompt=True,
    )

    results = response.results

    return jsonify(results) 

if __name__ == '__main__':
    app.run(debug=True)