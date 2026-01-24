from .settings import *  # noqa

# Use SQLite in-memory for tests
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}

# Faster password hashing in tests
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

# Optional: reduce logging noise
LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
}

