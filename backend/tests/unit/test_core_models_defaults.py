import pytest
from decimal import Decimal
from model_bakery import baker
from core.models import Farm, Product, Order, OrderItem


@pytest.mark.django_db
def test_farm_daily_capacity_default_is_zero():
    owner = baker.make("core.User")
    farm = Farm.objects.create(
        owner=owner,
        name="Test Farm",
        location="https://example.com",
    )
    assert farm.daily_capacity == 0


@pytest.mark.django_db
def test_product_defaults_stock_unit_availability():
    owner = baker.make("core.User")
    farm = Farm.objects.create(
        owner=owner,
        name="Test Farm",
        location="https://example.com",
    )

    product = Product.objects.create(
        farm=farm,
        name="Milk",
        price=Decimal("10.00"),
    )

    assert product.stock_quantity == 0
    assert product.unit == "kg"
    assert product.is_available is True


@pytest.mark.django_db
def test_order_defaults_status_and_total_amount():
    consumer = baker.make("core.User")
    owner = baker.make("core.User")

    farm = Farm.objects.create(
        owner=owner,
        name="Test Farm",
        location="https://example.com",
    )

    order = Order.objects.create(
        consumer=consumer,
        farm=farm,
    )

    assert order.status == "pending"
    assert order.total_amount == Decimal("0")

