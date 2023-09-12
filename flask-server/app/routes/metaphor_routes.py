from flask import Blueprint, Flask, request, jsonify, Response
from flask_cors import CORS
from metaphor_python import Metaphor
import requests
import openai
import PyPDF2
from io import BytesIO

bp = Blueprint('metaphor_routes', __name__)

openai.api_key = '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'

@bp.route('/api/request', methods=['POST'])
def make_api_request():
    data = request.json
    user_input = data.get('userInput')
    metaphor = Metaphor("06c5ba21-eed3-41bc-bc33-2b964a3aa486")

    response = metaphor.search(
    user_input,
    num_results=10,
    use_autoprompt=True,
    )

    results = response.results

    return jsonify(results) 

my_hardcoded_links = ['https://www.researchgate.net/publication/285484754_Traditional_and_medicinal_uses_of_banana',
                      'https://arxiv.org/abs/1706.03762v5',
                      'https://www.mdpi.com/2079-8954/11/8/425']

@bp.route('/api/recommend', methods=['POST'])
def make_api_recommendation():
    data = request.json
    user_input = data.get('userInput')
    links = data.get('links')
    while len(links) < 3:
        links.append(my_hardcoded_links[len(links)])
    
    metaphor = Metaphor("06c5ba21-eed3-41bc-bc33-2b964a3aa486")

    final_results = []

    for link in links:
        response = metaphor.search(
        f'here is a research paper that ends in .pdf with similar content to {link}',
        num_results=2,
        )

        final_results = final_results + response.results

    print(final_results)

    return jsonify(final_results) 

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

@bp.route('/fetch-pdf', methods=['POST'])
def fetch_pdf():
    data = request.json
    pdf_url = data.get('pdf_url')

    if not pdf_url:
        return {"error": "PDF URL not provided"}, 400

    try:
        response = requests.get(pdf_url)
        response.raise_for_status()

        # Check if the response indeed contains a PDF
        if 'application/pdf' not in response.headers.get('content-type'):
            return {"error": "URL does not point to a valid PDF"}, 400

        return Response(response.content, content_type='application/pdf')

    except requests.RequestException as e:
        return {"error": f"Error fetching PDF: {str(e)}"}, 500
    

@bp.route('/explain-jargon', methods=['POST'])
def explain_jargon():
    data = request.get_json()
    jargon = data.get('jargon', '')
    paragraph = data.get('paragraph', '')

    # Construct the prompt for GPT-3.5
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Explain the term '{jargon}' using this context: '{paragraph}'. Do not use more than 20 words."}
    ]

    # Query the model
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages,
      max_tokens=100
    )

    # Extract the response
    explanation = response.choices[0].message['content'].strip()

    # Construct the prompt for GPT-3.5
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Explain how the term '{jargon}' relates to the context: '{paragraph}'. Do not use more than 30 words."}
    ]

    # Query the model
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages,
      max_tokens=100
    )

    # Extract the response
    in_context = response.choices[0].message['content'].strip()

    print(explanation)
    print(in_context)

    return jsonify({"explanation": explanation, "context": in_context})

@bp.route('/extract', methods=['POST'])
def extract_text():
    if 'pdf' not in request.files:
        return jsonify(success=False, message='No file part'), 400

    file = request.files['pdf']

    if file.filename == '':
        return jsonify(success=False, message='No selected file'), 400

    if file:
        try:
            # Use BytesIO to handle the uploaded file in memory
            pdf = PyPDF2.PdfReader(BytesIO(file.read()))
            results = []

            # Extract text from the first page
            page = pdf.pages[0]
            text = page.extract_text()

            if len(text) > 2000:
                text = text[:2000]

            results.append(text)

            print(results)
            return results

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file"}), 400