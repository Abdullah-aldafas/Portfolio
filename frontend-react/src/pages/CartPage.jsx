import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function CartPage() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  const updateQuantity = (product, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.product === product ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (product) => {
    const updatedCart = cart.filter(item => item.product !== product)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const itemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = 15
  const total = subtotal + shipping

  return (
    <>
      <Header />
      <div style={{ marginTop: '100px', padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
        <div className="container">
          <h2 className="section-title">عربة التسوق</h2>
          
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#ddd', marginBottom: '20px' }}></i>
              <h3>عربة التسوق فارغة</h3>
              <p style={{ marginBottom: '20px' }}>لم تقم بإضافة أي منتجات إلى عربة التسوق بعد</p>
              <button className="btn-primary" onClick={() => navigate('/products')}>
                ابدأ التسوق
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
              <div>
                {cart.map(item => (
                  <div key={item.product} className="cart-item" style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    background: 'white',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
                      backgroundSize: 'cover',
                      borderRadius: '8px'
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <h3>{item.product}</h3>
                      <div style={{ color: '#666', marginBottom: '10px' }}>{item.price} ر.س / كجم</div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                          style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product, Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                          style={{ width: '60px', padding: '5px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.product, item.quantity + 1)}
                          style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => removeItem(item.product)}
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: '#c0392b', 
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                height: 'fit-content',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '20px' }}>ملخص الطلب</h3>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>عدد العناصر:</span>
                    <span>{itemsCount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>المجموع الفرعي:</span>
                    <span>{subtotal.toFixed(2)} ر.س</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>رسوم الشحن:</span>
                    <span>{shipping} ر.س</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid #ddd', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    <span>الإجمالي:</span>
                    <span>{total.toFixed(2)} ر.س</span>
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px' }}
                  onClick={() => alert('سيتم إضافة صفحة الدفع قريباً')}
                >
                  إتمام الشراء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CartPage

