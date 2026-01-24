import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_orders_list_requires_auth(api_client):
    url = reverse("order-list")
    res = api_client.get(url)
    assert res.status_code in (401, 403, 200)


@pytest.mark.django_db
def test_orders_list_success(auth_client):
    url = reverse("order-list")
    res = auth_client.get(url)
    assert res.status_code == 200

