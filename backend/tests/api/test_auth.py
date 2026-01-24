import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_profile_requires_auth(api_client):
    url = reverse("profile")
    res = api_client.get(url)
    assert res.status_code in (401, 403)


@pytest.mark.django_db
def test_profile_success(auth_client):
    url = reverse("profile")
    res = auth_client.get(url)
    assert res.status_code == 200
    assert isinstance(res.json(), dict)


@pytest.mark.django_db
def test_token_verify_invalid(api_client):
    url = reverse("token-verify")
    res = api_client.post(url, {"token": "invalid"}, format="json")
    assert res.status_code in (400, 401)

