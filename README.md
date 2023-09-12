# AI-Recommender-Tool

<img width="1512" alt="Screen Shot 2023-09-12 at 6 12 20 AM" src="https://github.com/ArjunArasappan/AI-Recommender-Tool/assets/93750489/df43fc47-844f-452b-ba5f-8d6bb5204171">
<img width="1512" alt="Screen Shot 2023-09-12 at 6 14 09 AM" src="https://github.com/ArjunArasappan/AI-Recommender-Tool/assets/93750489/e932a846-dab6-4499-82d9-f32d84495fac">


## Inspiration
Many of us have done research in the past and know how hard it is to break into a new field when you don't know jargon or have any domain knowledge. We personally have been through the experience of pulling up 30 different tabs of 30 different research papers, trying to consider jargon and new concepts all together, only to lose where you were and forget where you saw that one thing before. We hope to help new researchers get on top of their new domains.

## What it does
Shelve helps you search for research papers and reputable online articles to help you learn more about a subject. It then keeps track of which papers you've read, and uses AI to recommend you other papers in a similar field to expand your knowledge. It also comes locked and loaded with a "Jargonator", which helps you understand research terms you're confused about while you are reading.

## How we built it
We used a React frontend and a Flask backend, querying Metaphor API for paper search results. Similarly, recommendations are gotten through Metaphor. We also use gpt3.5 for the "Jargonator" to give descriptions of terms in the context of their respective papers. All file and data storage is stored and fetched with Google Cloud.

## Accomplishments that we're proud of
I'm proud of how we used Metaphor to create really nice results catered to the type of experience that we wanted to give. Metaphor let's us filter towards research papers and reputable source in a way that normal keyword search wouldn't be able to. We're also proud of how well our backend APIs integrate with our storage on Google Cloud, and how the storage allows a user to keep track of our progress through sessions.

## What we learned
We definitely learned a lot about the importance of abstraction within our file architecture. For most of our team, this was our first time fully relying on git for a collaborative, team-based project, so we learned a lot about how version control works in a team setting, and how important communication is to avoid mistakes and inconveniences.

## What's next for Shelve
We want to incorporate more tools for personalization, including article understanding ratings and complexity values. We'd also like to incorporate more intelligent recommender systems that take advantage of the "network" of papers to generate more meaningful recommendations to researchers and learners alike.

## Built With
flask
javascript
google cloud storage
react


