cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Настройка .env файла
echo "MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DB=lobby_staff_db
SECRET_KEY=your-secret-key" > .env

# Импорт базы данных
mysql -u root -p < ../database/schema.sql
mysql -u root -p < ../database/seed.sql

# Запуск
python app.py