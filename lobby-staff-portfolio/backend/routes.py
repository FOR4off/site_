from flask import Blueprint, jsonify, request, abort
from models import db, Project, Category, Service, TeamMember, Testimonial, Contact, Subscriber
from sqlalchemy import or_, desc
from datetime import datetime

api = Blueprint('api', __name__, url_prefix='/api')

# ============================================
# ПРОЕКТЫ
# ============================================
@api.route('/projects')
def get_projects():
    """Получить список проектов с фильтрацией"""
    category = request.args.get('category')
    featured = request.args.get('featured')
    search = request.args.get('search')
    limit = request.args.get('limit', 12, type=int)
    page = request.args.get('page', 1, type=int)
    
    query = Project.query
    
    if category:
        query = query.filter_by(category=category)
    
    if featured == 'true':
        query = query.filter_by(featured=True)
    
    if search:
        search_term = f'%{search}%'
        query = query.filter(
            or_(
                Project.title.ilike(search_term),
                Project.description.ilike(search_term),
                Project.category.ilike(search_term)
            )
        )
    
    # Пагинация
    total = query.count()
    projects = query.order_by(desc(Project.featured), Project.sort_order)\
                    .offset((page - 1) * limit)\
                    .limit(limit)\
                    .all()
    
    return jsonify({
        'success': True,
        'data': [p.to_dict() for p in projects],
        'total': total,
        'page': page,
        'pages': (total + limit - 1) // limit
    })

@api.route('/projects/<string:slug>')
def get_project(slug):
    """Детальная страница проекта"""
    project = Project.query.filter_by(slug=slug).first_or_404()
    
    # Увеличиваем счетчик просмотров
    project.views += 1
    db.session.commit()
    
    return jsonify({
        'success': True,
        'data': project.to_dict(full=True)
    })

@api.route('/categories')
def get_categories():
    """Список категорий"""
    categories = Category.query.order_by(Category.sort_order).all()
    return jsonify({
        'success': True,
        'data': [c.to_dict() for c in categories]
    })

# ============================================
# УСЛУГИ
# ============================================
@api.route('/services')
def get_services():
    """Список услуг"""
    services = Service.query.filter_by(is_active=True)\
                            .order_by(Service.sort_order)\
                            .all()
    return jsonify({
        'success': True,
        'data': [s.to_dict() for s in services]
    })

@api.route('/services/<string:slug>')
def get_service(slug):
    """Детальная страница услуги"""
    service = Service.query.filter_by(slug=slug, is_active=True).first_or_404()
    return jsonify({
        'success': True,
        'data': service.to_dict()
    })

# ============================================
# КОМАНДА
# ============================================
@api.route('/team')
def get_team():
    """Список сотрудников"""
    members = TeamMember.query.filter_by(is_active=True)\
                              .order_by(TeamMember.sort_order)\
                              .all()
    return jsonify({
        'success': True,
        'data': [m.to_dict() for m in members]
    })

@api.route('/team/<string:slug>')
def get_team_member(slug):
    """Профиль сотрудника"""
    member = TeamMember.query.filter_by(slug=slug, is_active=True).first_or_404()
    return jsonify({
        'success': True,
        'data': member.to_dict()
    })

# ============================================
# ОТЗЫВЫ
# ============================================
@api.route('/testimonials')
def get_testimonials():
    """Список отзывов"""
    testimonials = Testimonial.query.filter_by(is_approved=True)\
                                    .order_by(desc(Testimonial.created_at))\
                                    .all()
    return jsonify({
        'success': True,
        'data': [t.to_dict() for t in testimonials]
    })

# ============================================
# КОНТАКТЫ / ЗАЯВКИ
# ============================================
@api.route('/contact', methods=['POST'])
def submit_contact():
    """Отправка заявки с сайта"""
    data = request.get_json()
    
    if not data:
        abort(400, description='No data provided')
    
    # Валидация
    required_fields = ['name', 'email', 'message']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({
                'success': False,
                'error': f'Поле "{field}" обязательно для заполнения'
            }), 400
    
    contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        company=data.get('company'),
        service_interest=data.get('service'),
        budget_range=data.get('budget'),
        message=data['message'],
        source=data.get('source', 'website'),
        ip_address=request.remote_addr
    )
    
    db.session.add(contact)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        'data': {'id': contact.id}
    }), 201

@api.route('/subscribe', methods=['POST'])
def subscribe():
    """Подписка на рассылку"""
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'success': False, 'error': 'Email обязателен'}), 400
    
    existing = Subscriber.query.filter_by(email=email).first()
    if existing:
        if existing.is_active:
            return jsonify({'success': False, 'error': 'Вы уже подписаны'}), 409
        else:
            existing.is_active = True
            db.session.commit()
            return jsonify({'success': True, 'message': 'Подписка возобновлена!'})
    
    subscriber = Subscriber(email=email, name=data.get('name'))
    db.session.add(subscriber)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Спасибо за подписку!'}), 201

# ============================================
# ПОИСК
# ============================================
@api.route('/search')
def search():
    """Поиск по сайту"""
    query = request.args.get('q', '')
    
    if len(query) < 2:
        return jsonify({'success': True, 'data': []})
    
    search_term = f'%{query}%'
    
    projects = Project.query.filter(
        or_(Project.title.ilike(search_term), Project.description.ilike(search_term))
    ).limit(5).all()
    
    services = Service.query.filter(
        or_(Service.title.ilike(search_term), Service.description.ilike(search_term))
    ).limit(3).all()
    
    return jsonify({
        'success': True,
        'data': {
            'projects': [p.to_dict() for p in projects],
            'services': [s.to_dict() for s in services]
        }
    })