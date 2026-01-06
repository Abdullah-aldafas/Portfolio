import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)

    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    setCartCount(totalItems)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌴</span>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              مزارع المملكة
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/products">منتجاتنا</Link></li>
              <li><a href="#farmers">المزارعين</a></li>
              <li><Link to="/about">من نحن</Link></li>
              <li><Link to="/contact">اتصل بنا</Link></li>
            </ul>
          </nav>
          <div className="header-actions">
            <Link to="/cart" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn-primary">تسجيل الدخول</Link>
                <Link to="/signup" className="btn-secondary" style={{ marginRight: '5px' }}>
                  حساب جديد
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>مرحباً بك</span>
                <button onClick={handleLogout} className="btn-primary" style={{ background: '#c0392b' }}>
                  خروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

