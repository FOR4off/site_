from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    full_description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    _gallery = db.Column('gallery', db.JSON)
    _technologies = db.Column('technologies', db.JSON)
    client = db.Column(db.String(255))
    client_website = db.Column(db.String(255))
    completion_date = db.Column(db.Date)
    featured = db.Column(db.Boolean, default=False)
    sort_order = db.Column(db.Integer, default=0)
    views = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    testimonials = db.relationship('Testimonial', backref='project', lazy=True)
    
    @property
    def gallery(self):
        return self._gallery or []
    
    @gallery.setter
    def gallery(self, value):
        self._gallery = value
    
    @property
    def technologies(self):
        return self._technologies or []
    
    @technologies.setter
    def technologies(self, value):
        self._technologies = value
    
    def to_dict(self, full=False):
        data = {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'category': self.category,
            'description': self.description,
            'image': self.image_url,
            'technologies': self.technologies,
            'client': self.client,
            'featured': self.featured,
            'completionDate': self.completion_date.isoformat() if self.completion_date else None,
        }
        
        if full:
            data.update({
                'fullDescription': self.full_description,
                'gallery': self.gallery,
                'clientWebsite': self.client_website,
                'testimonials': [t.to_dict() for t in self.testimonials if t.is_approved],
                'views': self.views,
            })
        
        return data

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(100))
    sort_order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'icon': self.icon
        }

class Service(db.Model):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text)
    detailed_description = db.Column(db.Text)
    icon_class = db.Column(db.String(100))
    icon_image = db.Column(db.String(500))
    _features = db.Column('features', db.JSON)
    price_start = db.Column(db.Numeric(10, 2))
    sort_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    @property
    def features(self):
        return self._features or []
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'detailedDescription': self.detailed_description,
            'icon': self.icon_class,
            'iconImage': self.icon_image,
            'features': self.features,
            'priceStart': float(self.price_start) if self.price_start else None,
        }

class TeamMember(db.Model):
    __tablename__ = 'team_members'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    position = db.Column(db.String(255))
    department = db.Column(db.String(100))
    bio = db.Column(db.Text)
    photo_url = db.Column(db.String(500))
    _social_links = db.Column('social_links', db.JSON)
    _skills = db.Column('skills', db.JSON)
    sort_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    @property
    def social_links(self):
        return self._social_links or {}
    
    @property
    def skills(self):
        return self._skills or []
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'position': self.position,
            'department': self.department,
            'bio': self.bio,
            'photo': self.photo_url,
            'social': self.social_links,
            'skills': self.skills,
        }

class Testimonial(db.Model):
    __tablename__ = 'testimonials'
    
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(255), nullable=False)
    client_position = db.Column(db.String(255))
    company = db.Column(db.String(255))
    company_logo = db.Column(db.String(500))
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='SET NULL'))
    photo_url = db.Column(db.String(500))
    is_approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'client': self.client_name,
            'clientPosition': self.client_position,
            'company': self.company,
            'companyLogo': self.company_logo,
            'text': self.text,
            'rating': self.rating,
            'projectId': self.project_id,
            'photo': self.photo_url,
        }

class Contact(db.Model):
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(50))
    company = db.Column(db.String(255))
    service_interest = db.Column(db.String(100))
    budget_range = db.Column(db.String(50))
    message = db.Column(db.Text)
    source = db.Column(db.String(100))
    ip_address = db.Column(db.String(45))
    is_read = db.Column(db.Boolean, default=False)
    is_contacted = db.Column(db.Boolean, default=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'serviceInterest': self.service_interest,
            'budgetRange': self.budget_range,
            'message': self.message,
            'createdAt': self.created_at.isoformat(),
        }

class Subscriber(db.Model):
    __tablename__ = 'subscribers'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)

class Setting(db.Model):
    __tablename__ = 'settings'
    
    id = db.Column(db.Integer, primary_key=True)
    setting_key = db.Column(db.String(100), unique=True, nullable=False)
    setting_value = db.Column(db.Text)
    setting_type = db.Column(db.String(50), default='text')