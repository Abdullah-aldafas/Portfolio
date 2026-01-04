import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function ProductsPage() {
  const [products] = useState([
    {
      id: 1,
      name: "تمر سكري",
      price: 45,
      category: "dates",
      farm: "مزرعة النخيل",
      image: "https://images.unsplash.com/photo-1594736797933-d0d69e1e5d3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "فراولة طازجة",
      price: 40,
      category: "fruits",
      farm: "مزرعة الفواكه",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.2,
      reviews: 95
    },
    {
      id: 3,
      name: "طماطم عضوية",
      price: 15,
      category: "vegetables",
      farm: "مزارع الوادي",
      image: "https://images.unsplash.com/photo-1546470427-e212b7d310a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      reviews: 210
    },
    {
      id: 4,
      name: "حليب طازج",
      price: 12,
      category: "dairy",
      farm: "مزرعة الألبان",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
      reviews: 167
    }
  ])

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')

  const filteredProducts = products.filter(product => {
    if (categoryFilter !== 'all' && product.category !== categoryFilter) return false
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number)
      if (product.price < min || product.price > max) return false
    }
    return true
  })

  const addToCart = (product, price) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItem = savedCart.find(item => item.product === product)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      savedCart.push({
        product: product,
        price: price,
        quantity: 1
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(savedCart))
    alert(`${product} تمت الإضافة إلى السلة`)
  }

  const generateStars = (rating) => {
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

  return (
    <>
      <Header />
      <div style={{ marginTop: '100px', padding: '40px 0' }}>
        <div className="container">
          <h2 className="section-title">جميع المنتجات</h2>
          
          <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
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
                  <div className="product-image" style={{ backgroundImage: `url('${product.image}')` }}></div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-price">{product.price} ريال / كجم</div>
                    <div className="product-farm">{product.farm}</div>
                    <div className="product-rating">
                      {generateStars(product.rating)}
                      <span>({product.reviews})</span>
                    </div>
                    <button 
                      className="btn-primary" 
                      onClick={() => addToCart(product.name, product.price)}
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

