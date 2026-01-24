def can_edit_order(user, order_owner_id):
    return user.is_staff or user.id == order_owner_id

def test_owner_can_edit_order(user):
    assert can_edit_order(user, user.id) is True

def test_non_owner_cannot_edit_order(user):
    assert can_edit_order(user, user.id + 999) is False

