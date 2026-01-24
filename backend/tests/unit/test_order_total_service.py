import pytest
from decimal import Decimal
from model_bakery import baker

from core.models import Farm, Product, Order, OrderItem
from core.services.order_totals import calculate_total_from_items


@pytest.mark.django_db
def test_calculate_total_from_items_success():
    consumer = baker.make("core.User")
    owner = baker.make("core.User")
    farm = Farm.objects.create(owner=owner, name="Farm", location="https://example.com")

    p1 = Product.objects.create(farm=farm, name="Milk", price=Decimal("10.00"))
    p2 = Product.objects.create(farm=farm, name="Cheese", price=Decimal("5.50"))

    order = Order.objects.create(consumer=consumer, farm=farm)

    i1 = OrderItem.objects.create(order=order, product=p1, quantity=2, price=Decimal("10.00"))
    i2 = OrderItem.objects.create(order=order, product=p2, quantity=1, price=Decimal("5.50"))

    total = calculate_total_from_items([i1, i2])
    assert total == Decimal("25.50")


@pytest.mark.django_db
def test_calculate_total_from_items_rejects_zero_quantity():
    consumer = baker.make("core.User")
    owner = baker.make("core.User")
    farm = Farm.objects.create(owner=owner, name="Farm", location="https://example.com")
    p1 = Product.objects.create(farm=farm, name="Milk", price=Decimal("10.00"))
    order = Order.objects.create(consumer=consumer, farm=farm)

    item = OrderItem.objects.create(order=order, product=p1, quantity=0, price=Decimal("10.00"))

    with pytest.raises(ValueError):
        calculate_total_from_items([item])

