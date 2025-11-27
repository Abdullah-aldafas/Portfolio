# Django Backend Setup Guide

This guide explains how to set up and run the Django backend for the Dairy Direct project.

## Prerequisites

- Python 3.8+
- PostgreSQL installed and running
- pip (Python package manager)

## Setup Instructions

### 1. Create a Virtual Environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

Navigate to the project root directory and install all required packages:

```bash
pip install -r requirements.txt
```

This will install:
- Django 4.2
- Django REST Framework
- psycopg2-binary (PostgreSQL adapter)
- python-dotenv (environment variables)
- django-cors-headers (CORS support)
- whitenoise (static files serving)

### 3. Configure Environment Variables

Copy the example environment file and update it with your PostgreSQL credentials:

```bash
# Navigate to the backend directory
cd backend

# Copy the example file
cp .env.example .env

# Edit .env with your database credentials
# Open .env in your editor and update:
# - DATABASE_NAME: your PostgreSQL database name
# - DATABASE_USER: your PostgreSQL user
# - DATABASE_PASSWORD: your PostgreSQL password
# - DATABASE_HOST: usually 'localhost' for local development
# - DATABASE_PORT: usually '5432' for PostgreSQL
# - SECRET_KEY: a random secret key for Django (generate one for production)
```

### 4. Create PostgreSQL Database

Before running migrations, create the database in PostgreSQL:

```bash
# Connect to PostgreSQL (you may need to adjust the command based on your setup)
psql -U postgres

# In the PostgreSQL prompt, create the database:
CREATE DATABASE dairy_direct_db;

# Exit PostgreSQL
\q
```

### 5. Run Migrations

Navigate back to the backend directory and run the migrations:

```bash
python manage.py migrate
```

This creates the necessary database tables.

### 6. Create Superuser (Admin Account)

Create an admin account to access the Django admin panel:

```bash
python manage.py createsuperuser
```

You'll be prompted to enter:
- Username
- Email address
- Password
- Password (confirmation)

### 7. Run the Development Server

Start the Django development server:

```bash
python manage.py runserver
```

The server will start at `http://127.0.0.1:8000/`

## Accessing the Application

- **Admin Panel**: `http://127.0.0.1:8000/admin/`
  - Log in with the superuser credentials you created
  
- **API Endpoint**: `http://127.0.0.1:8000/api/`
  - Add your app routes in `core/urls.py`

## Project Structure

```
backend/
├── dairy_direct/          # Django project settings
│   ├── settings.py        # Project configuration
│   ├── urls.py            # URL routing
│   ├── wsgi.py            # WSGI configuration
│   ├── asgi.py            # ASGI configuration
│   └── __init__.py
├── core/                  # Main Django app
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views
│   ├── urls.py            # App URL routing
│   ├── apps.py            # App configuration
│   ├── admin.py           # Admin panel configuration
│   ├── tests.py           # Unit tests
│   ├── migrations/        # Database migrations
│   └── __init__.py
├── manage.py              # Django management script
├── .env                   # Environment variables (local)
├── .env.example           # Example environment variables
└── requirements.txt       # Python dependencies
```

## Common Commands

### Run Tests
```bash
python manage.py test
```

### Create Migrations
```bash
python manage.py makemigrations
```

### View Database Queries
```bash
python manage.py sqlmigrate <app_label> <migration_number>
```

### Create a New Django App
```bash
python manage.py startapp <app_name>
```

### Collect Static Files
```bash
python manage.py collectstatic
```

## Database Configuration

The project uses **PostgreSQL** as the database. The connection settings are loaded from the `.env` file:

- **Engine**: PostgreSQL (`django.db.backends.postgresql`)
- **Database Name**: Loaded from `DATABASE_NAME`
- **User**: Loaded from `DATABASE_USER`
- **Password**: Loaded from `DATABASE_PASSWORD`
- **Host**: Loaded from `DATABASE_HOST`
- **Port**: Loaded from `DATABASE_PORT`

## Development Tips

1. **Environment Variables**: Always keep sensitive information in the `.env` file and never commit it to version control.

2. **Django Debug Toolbar** (Optional): For development, you can install `django-debug-toolbar` for better debugging.
   ```bash
   pip install django-debug-toolbar
   ```

3. **API Documentation**: The REST Framework provides an interactive API browsable interface at each API endpoint.

4. **CORS Configuration**: CORS is already configured for local development. Update `CORS_ALLOWED_ORIGINS` in `settings.py` for production.

## Troubleshooting

### Issue: "No such table" error
- Run migrations: `python manage.py migrate`

### Issue: PostgreSQL connection error
- Ensure PostgreSQL is running
- Verify credentials in `.env` file
- Check if the database exists

### Issue: ModuleNotFoundError
- Ensure virtual environment is activated
- Reinstall requirements: `pip install -r requirements.txt`

### Issue: Static files not loading
- Run: `python manage.py collectstatic`
- Clear browser cache

## Next Steps

1. Define your models in `core/models.py`
2. Create serializers in `core/serializers.py`
3. Create viewsets in `core/views.py`
4. Register URLs in `core/urls.py`
5. Register models in `core/admin.py` for admin panel access

Happy coding! 🚀
