import pytest
from decimal import Decimal
from model_bakery import baker
from core.models import Farm, Product, Order, OrderItem
from core.services.order_totals import calculate_total_from_items


@pytest.mark.django_db
def test_order_total_amount_can_be_set_from_items():
    consumer = baker.make("core.User")
    owner = baker.make("core.User")
    farm = Farm.objects.create(owner=owner, name="Farm", location="https://example.com")

    product = Product.objects.create(farm=farm, name="Milk", price=Decimal("12.00"))
    order = Order.objects.create(consumer=consumer, farm=farm)

    item = OrderItem.objects.create(order=order, product=product, quantity=3, price=Decimal("12.00"))
    order.total_amount = calculate_total_from_items([item])
    order.save()

    order.refresh_from_db()
    assert order.total_amount == Decimal("36.00")

