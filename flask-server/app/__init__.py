from flask import Flask
from .routes import api_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)


    # Register blueprints (routes)
    app.register_blueprint(api_routes.bp)

    return app