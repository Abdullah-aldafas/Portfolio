import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient


# -----------------------------------------------------------------------------
# API client
# -----------------------------------------------------------------------------
@pytest.fixture
def api_client():
    return APIClient()


# -----------------------------------------------------------------------------
# User fixture
# -----------------------------------------------------------------------------
@pytest.fixture
def user(db):
    """
    Creates a normal user.
    Compatible with custom User models (email or username).
    """
    User = get_user_model()
    try:
        return User.objects.create_user(
            email="user@test.com",
            password="Pass12345!",
        )
    except TypeError:
        # Fallback if username is required
        return User.objects.create_user(
            username="user",
            email="user@test.com",
            password="Pass12345!",
        )


# -----------------------------------------------------------------------------
# Token extraction (supports your login response)
# -----------------------------------------------------------------------------
def _extract_token(data):
    """
    Supports common response shapes:
    - SimpleJWT:
        {
          "access": "...",
          "refresh": "..."
        }
    - Wrapped:
        {
          "tokens": {
            "access": "...",
            "refresh": "..."
          }
        }
    - TokenAuth / custom:
        { "token": "..." }
    """
    if not isinstance(data, dict):
        return None

    # SimpleJWT (flat)
    if "access" in data:
        return data["access"]

    # Your current response shape
    if isinstance(data.get("tokens"), dict):
        return data["tokens"].get("access")

    # TokenAuth / custom
    if "token" in data:
        return data["token"]

    return None


# -----------------------------------------------------------------------------
# Authenticated client
# -----------------------------------------------------------------------------
@pytest.fixture
def auth_client(api_client, user):
    """
    Professional authenticated client:
    - logs in via reverse('login')
    - automatically sets Authorization header
    """
    login_url = reverse("login")

    res = api_client.post(
        login_url,
        {
            "email": "user@test.com",
            "password": "Pass12345!",
        },
        format="json",
    )

    assert res.status_code in (200, 201), (
        f"Login failed: {res.status_code} {res.content}"
    )

    data = res.json() if hasattr(res, "json") else res.data
    token = _extract_token(data)

    assert token, f"Could not extract token from login response: {data}"

    # JWT tokens have 3 dot-separated parts
    prefix = "Bearer" if token.count(".") == 2 else "Token"

    api_client.credentials(
        HTTP_AUTHORIZATION=f"{prefix} {token}"
    )
    return api_client


# -----------------------------------------------------------------------------
# Force SQLite for ALL tests (avoid Postgres locking issues)
# -----------------------------------------------------------------------------
@pytest.fixture(scope="session")
def django_db_modify_db_settings():
    """
    Always use SQLite in-memory DB for tests.
    """
    return {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }

