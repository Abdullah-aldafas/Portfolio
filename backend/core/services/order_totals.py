from decimal import Decimal
from typing import Iterable
from core.models import OrderItem

def calculate_total_from_items(items: Iterable[OrderItem]) -> Decimal:
    total = Decimal("0")
    for item in items:
        if item.quantity <= 0:
            raise ValueError("quantity must be positive")
        if item.price < 0:
            raise ValueError("price cannot be negative")
        total += (item.price * item.quantity)
    return total

