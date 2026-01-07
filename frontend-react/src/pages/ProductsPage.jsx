import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8001/api/products/')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      // Handle pagination (DRF returns { count, next, previous, results })
      if (data.results) {
        setProducts(data.results)
      } else {
        setProducts(data)
      }
    } catch (err) {
      console.error(err)
      setError('حدث خطأ في تحميل المنتجات')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    // Note: Category filter is temporarily disabled as backend Product model doesn't have category field yet
    // if (categoryFilter !== 'all' && product.category !== categoryFilter) return false

    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number)
      if (parseFloat(product.price) < min || parseFloat(product.price) > max) return false
    }
    return true
  })

  const addToCart = (productName, price) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItem = savedCart.find(item => item.product === productName)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      savedCart.push({
        product: productName,
        price: parseFloat(price),
        quantity: 1
      })
    }

    localStorage.setItem('cart', JSON.stringify(savedCart))
    // Dispatch custom event to notify Header
    window.dispatchEvent(new Event('storage'))
    alert(`${productName} تمت الإضافة إلى السلة`)
  }

  const generateStars = (rating = 0) => {
    // Default rating if not provided (backend doesn't support rating yet)
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }

    return stars
  }

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}>جاري التحميل...</div>

  return (
    <>
      <Header />
      <div style={{ marginTop: '100px', padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
        <div className="container">
          <h2 className="section-title">جميع المنتجات</h2>

          {error && <div className="error-msg" style={{ display: 'block', textAlign: 'center' }}>{error}</div>}

          <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', opacity: 0.6, cursor: 'not-allowed' }}
              disabled
              title="فلترة التصنيف غير متاحة حالياً"
            >
              <option value="all">جميع التصنيفات</option>
              <option value="dates">تمور</option>
              <option value="fruits">فواكه</option>
              <option value="vegetables">خضروات</option>
              <option value="dairy">ألبان</option>
            </select>

            <select
              id="priceFilter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="all">جميع الأسعار</option>
              <option value="0-20">أقل من 20 ريال</option>
              <option value="20-40">20 - 40 ريال</option>
              <option value="40-60">40 - 60 ريال</option>
              <option value="60-100">أكثر من 60 ريال</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>لا توجد منتجات تطابق معايير البحث</p>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image" style={{ backgroundImage: `url('${product.image || product.image_url || 'https://via.placeholder.com/300'}')` }}></div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-price">{product.price} ريال / {product.unit}</div>
                    <div className="product-farm">{product.farm_name}</div>
                    <div className="product-rating">
                      {generateStars(product.rating || 4.5)}
                      <span>({product.reviews || 0})</span>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => addToCart(product, product.price)}
                    >
                      أضف إلى السلة
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductsPage
