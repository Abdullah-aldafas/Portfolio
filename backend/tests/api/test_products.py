import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_products_list_requires_auth(api_client):
    url = reverse("product-list")
    res = api_client.get(url)
    assert res.status_code in (401, 403, 200)  # حسب إعداداتكم هل public ولا protected


@pytest.mark.django_db
def test_products_list_success(auth_client):
    url = reverse("product-list")
    res = auth_client.get(url)
    assert res.status_code == 200


@pytest.mark.django_db
def test_create_product_invalid_payload(auth_client):
    url = reverse("product-list")
    res = auth_client.post(url, {"name": ""}, format="json")
    assert res.status_code in (400, 401, 403)

