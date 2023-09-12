## AI-Recommender-Tool
# Inspiration
Many of us have done research in the past and know how hard it is to break into a new field when you don't know jargon or have any domain knowledge. We personally have been through the experience of pulling up 30 different tabs of 30 different research papers, trying to consider jargon and new concepts all together, only to lose where you were and forget where you saw that one thing before. We hope to help new researchers get on top of their new domains.

# What it does
Shelve helps you search for research papers and reputable online articles to help you learn more about a subject. It then keeps track of which papers you've read, and uses AI to recommend you other papers in a similar field to expand your knowledge. It also comes locked and loaded with a "Jargonator", which helps you understand research terms you're confused about while you are reading.

# How we built it
We used a React frontend and a Flask backend, querying Metaphor API for paper search results. Similarly, recommendations are gotten through Metaphor. We also use gpt3.5 for the Jargonator to give descriptions of terms in the context of their respective papers. All file and data storage is stored and fetched with Google Cloud.

#Built With
flask
javascript
google cloud storage
react


