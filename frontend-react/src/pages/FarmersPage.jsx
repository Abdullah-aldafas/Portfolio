import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import API_BASE_URL from '../apiConfig'
import { getImageUrl } from '../utils/imageUtils'

function FarmersPage() {
    const [farms, setFarms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [regionFilter, setRegionFilter] = useState('all')
    const [sortBy, setSortBy] = useState('newest')

    useEffect(() => {
        fetchFarms()
    }, [])

    const fetchFarms = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/farms/`)
            if (!response.ok) {
                throw new Error('Failed to fetch farms')
            }
            const data = await response.json()
            // Handle pagination (DRF returns { count, next, previous, results })
            if (data.results) {
                setFarms(data.results)
            } else {
                setFarms(data)
            }
        } catch (err) {
            console.error(err)
            setError('حدث خطأ في تحميل بيانات المزارعين')
        } finally {
            setLoading(false)
        }
    }

    // Extract unique regions for filter
    const regions = ['all', ...new Set(farms.map(farm => farm.administrative_region).filter(Boolean))]

    const filteredFarms = farms.filter(farm => {
        // Search Filter
        if (searchQuery && !farm.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false
        }

        // Region Filter
        if (regionFilter !== 'all' && farm.administrative_region !== regionFilter) {
            return false
        }

        return true
    }).sort((a, b) => {
        if (sortBy === 'name-asc') {
            return a.name.localeCompare(b.name)
        } else if (sortBy === 'name-desc') {
            return b.name.localeCompare(a.name)
        }
        return 0 // Default (newest/id)
    })

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}>جاري التحميل...</div>

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
                {/* Modern Hero Section */}
                <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #2d5a27 0%, #1a3c17 100%)',
                    padding: '140px 0 60px',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '50px',
                    overflow: 'hidden'
                }}>
                    {/* Decorative circles */}
                    <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-30px', right: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>

                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: 'bold' }}>مزارعنا</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px' }}>
                            تعرف على شركائنا من المزارعين المحليين الذين يقدمون لك أجود المحاصيل
                        </p>

                        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="ابحث عن مزرعة..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px 50px 15px 25px',
                                    borderRadius: '30px',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                }}
                            />
                            <i className="fas fa-search" style={{
                                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                                color: '#2d5a27', fontSize: '1.2rem'
                            }}></i>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ paddingBottom: '80px' }}>
                    {error && (
                        <div className="error-msg" style={{
                            background: '#fff5f5',
                            color: '#c53030',
                            padding: '15px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            marginBottom: '30px',
                            border: '1px solid #feb2b2'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Filter Section */}
                    <div style={{
                        background: 'white',
                        padding: '25px',
                        borderRadius: '15px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                        marginBottom: '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 'bold', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <i className="fas fa-filter" style={{ color: '#2d5a27' }}></i>
                                تصفية حسب المنطقة:
                            </span>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => setRegionFilter(region)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '25px',
                                            border: regionFilter === region ? 'none' : '1px solid #e2e8f0',
                                            background: regionFilter === region ? '#2d5a27' : 'white',
                                            color: regionFilter === region ? 'white' : '#718096',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            fontSize: '0.9rem',
                                            fontWeight: regionFilter === region ? 'bold' : 'normal',
                                            boxShadow: regionFilter === region ? '0 4px 6px rgba(45, 90, 39, 0.2)' : 'none'
                                        }}
                                    >
                                        {region === 'all' ? 'الكل' : region}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: 'bold', color: '#2d3748', fontSize: '0.9rem' }}>ترتيب حسب:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '8px 15px',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                    background: '#f8fafc',
                                    color: '#4a5568',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="newest">الأحدث</option>
                                <option value="name-asc">الاسم: أ-ي</option>
                                <option value="name-desc">الاسم: ي-أ</option>
                            </select>
                        </div>

                    </div>

                    <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '20px' }}>
                        عُرض {filteredFarms.length} مزرعة
                    </div>

                    <div className="products-grid">
                        {filteredFarms.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                gridColumn: '1/-1',
                                padding: '60px',
                                background: 'white',
                                borderRadius: '15px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                            }}>
                                <i className="fas fa-search" style={{ fontSize: '3rem', color: '#cbd5e0', marginBottom: '20px' }}></i>
                                <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>لا توجد مزارع</h3>
                                <p style={{ color: '#718096' }}>جرب تغيير خيارات البحث للعثور على ما تبحث عنه</p>
                            </div>
                        ) : (
                            filteredFarms.map((farm, index) => (
                                <div
                                    key={farm.id}
                                    className="product-card reveal active"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="product-image" style={{ backgroundImage: `url('${getImageUrl(farm.image, farm.image_url)}')` }}></div>
                                    <div className="product-info">
                                        <h3>{farm.name}</h3>
                                        <div className="product-farm"><i className="fas fa-map-marker-alt"></i> {farm.administrative_region || 'غير محدد'}</div>
                                        <p style={{ fontSize: '0.9em', color: '#666', margin: '10px 0' }}>
                                            {farm.description ? farm.description.substring(0, 100) + '...' : 'لا يوجد وصف'}
                                        </p>
                                        {farm.type && <span style={{ background: '#e8f8f5', color: '#27ae60', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em' }}>{farm.type}</span>}
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

export default FarmersPage
