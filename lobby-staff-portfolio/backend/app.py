from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from models import db
from routes import api
import os

def create_app():
    """Фабрика приложения"""
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    app.config.from_object(Config)
    
    # CORS
    CORS(app, origins=app.config['CORS_ORIGINS'].split(','))
    
    # Инициализация БД
    db.init_app(app)
    
    # Регистрация API роутов
    app.register_blueprint(api)
    
    # Создание таблиц при первом запуске
    with app.app_context():
        db.create_all()
    
    # SPA: все остальные запросы -> index.html
    @app.route('/')
    def serve_react():
        return send_from_directory(app.static_folder, 'index.html')
    
    @app.route('/<path:path>')
    def serve_react_path(path):
        if os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')
    
    # Обработка ошибок
    @app.errorhandler(404)
    def not_found(e):
        return {'success': False, 'error': 'Ресурс не найден'}, 404
    
    @app.errorhandler(500)
    def server_error(e):
        return {'success': False, 'error': 'Внутренняя ошибка сервера'}, 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
