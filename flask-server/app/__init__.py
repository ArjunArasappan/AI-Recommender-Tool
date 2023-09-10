from flask import Flask
from .routes import metaphor_routes
from .routes import pdf_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)


    # Register blueprints (routes)
    app.register_blueprint(metaphor_routes.bp)
    app.register_blueprint(pdf_routes.bp)
    
    CORS(metaphor_routes.bp)
    CORS(pdf_routes.bp)


    return app