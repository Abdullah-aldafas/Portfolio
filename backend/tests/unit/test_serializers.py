import pytest
from core.serializers import ProductSerializer  # عدّلي حسب مشروعك

@pytest.mark.django_db
def test_product_serializer_rejects_negative_price():
    data = {"name": "Milk", "price": -10}
    s = ProductSerializer(data=data)
    assert not s.is_valid()
    assert "price" in s.errors

