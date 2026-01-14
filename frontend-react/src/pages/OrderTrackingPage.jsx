import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function OrderTrackingPage() {
    const { trackingNumber: urlTrackingNumber } = useParams()
    const navigate = useNavigate()
    const [trackingNumber, setTrackingNumber] = useState(urlTrackingNumber || '')
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const statusSteps = [
        { id: 'pending', label: 'قيد الانتظار', icon: 'fas fa-clock', color: '#f39c12' },
        { id: 'confirmed', label: 'تم التأكيد', icon: 'fas fa-check-circle', color: '#27ae60' },
        { id: 'preparing', label: 'قيد التجهيز', icon: 'fas fa-box-open', color: '#2ecc71' },
        { id: 'ready', label: 'جاهز للتوصيل', icon: 'fas fa-truck-loading', color: '#3498db' },
        { id: 'completed', label: 'تم التوصيل', icon: 'fas fa-box', color: '#2c3e50' }
    ]

    const getCurrentStepIndex = (status) => {
        return statusSteps.findIndex(step => step.id === status)
    }

    const handleTrack = async (e) => {
        if (e) e.preventDefault()
        if (!trackingNumber) return

        setLoading(true)
        setError('')
        setOrder(null)

        try {
            const response = await fetch(`/api/orders/trace/?tracking_number=${trackingNumber.trim()}`)
            const data = await response.json()

            if (response.ok) {
                setOrder(data)
                // Update URL without reloading if not already there
                if (trackingNumber !== urlTrackingNumber) {
                    navigate(`/track/${trackingNumber}`, { replace: true })
                }
            } else {
                setError(data.error === 'Order not found'
                    ? 'عذراً، لم يتم العثور على طلب بهذا الرقم. يرجى التأكد من الرقم والمحاولة مرة أخرى.'
                    : 'حدث خطأ أثناء البحث عن الطلب.')
            }
        } catch (err) {
            setError('فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (urlTrackingNumber) {
            handleTrack()
        }
    }, [urlTrackingNumber])

    // Reveal animations logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active')
                }
            })
        }, { threshold: 0.1 })

        const elements = document.querySelectorAll('.reveal')
        elements.forEach(el => observer.observe(el))

        return () => {
            elements.forEach(el => observer.unobserve(el))
            observer.disconnect()
        }
    }, [order, error, loading])

    return (
        <div style={{ background: '#f8f9fa' }}>
            <Header />

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #2d5a27 0%, #1e3c1a 100%)',
                padding: '120px 0 160px',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container reveal">
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>تتبع طلبك</h1>
                    <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
                        ابقَ على اطلاع دائم بمكان طلبك وحالته الحالية في أي وقت وأي مكان.
                    </p>
                </div>
                {/* Decorative Blobs */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            </div>

            <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10, paddingBottom: '100px' }}>
                {/* Search Box */}
                <div className="reveal" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '40px',
                    borderRadius: '25px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    maxWidth: '800px',
                    margin: '0 auto 40px',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <form onSubmit={handleTrack} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
                            <i className="fas fa-search" style={{ position: 'absolute', right: '20px', top: '18px', color: '#999' }}></i>
                            <input
                                type="text"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                placeholder="أدخل رقم التتبع (مثال: MK-12345678)"
                                style={{
                                    width: '100%',
                                    padding: '15px 50px 15px 20px',
                                    borderRadius: '15px',
                                    border: '2px solid #edf2f7',
                                    fontSize: '18px',
                                    outline: 'none',
                                    transition: 'all 0.3s',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#2d5a27'}
                                onBlur={(e) => e.target.style.borderColor = '#edf2f7'}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{
                                padding: '15px 40px',
                                borderRadius: '15px',
                                fontSize: '18px',
                                boxShadow: '0 10px 20px rgba(45, 90, 39, 0.2)'
                            }}
                        >
                            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'تتبع الآن'}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="reveal" style={{
                        padding: '20px 30px',
                        background: '#fff5f5',
                        color: '#c53030',
                        borderRadius: '15px',
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '0 auto 30px',
                        borderRight: '5px solid #c53030',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <i className="fas fa-exclamation-triangle" style={{ marginLeft: '10px' }}></i>
                        {error}
                    </div>
                )}

                {order && (
                    <div className="reveal" style={{
                        background: 'white',
                        padding: '50px',
                        borderRadius: '25px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
                            <div>
                                <h3 style={{ margin: 0, color: '#2d5a27', fontSize: '1.8rem' }}>طلب رقم: {order.tracking_number}</h3>
                                <p style={{ color: '#718096', marginTop: '10px', fontSize: '1.1rem' }}>
                                    <i className="far fa-calendar-alt" style={{ marginLeft: '8px' }}></i>
                                    تاريخ الطلب: {new Date(order.created_at).toLocaleDateString('ar-SA')}
                                </p>
                            </div>
                            <div style={{
                                background: statusSteps.find(s => s.id === order.status)?.color + '15',
                                color: statusSteps.find(s => s.id === order.status)?.color,
                                padding: '12px 25px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                border: `1px solid ${statusSteps.find(s => s.id === order.status)?.color}40`
                            }}>
                                <i className={statusSteps.find(s => s.id === order.status)?.icon} style={{ marginLeft: '8px' }}></i>
                                {statusSteps.find(s => s.id === order.status)?.label || order.status}
                            </div>
                        </div>

                        {/* Visual Progress Stepper */}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: '60px', padding: '0 20px' }}>
                            <div style={{
                                position: 'absolute',
                                top: '25px',
                                left: '40px',
                                right: '40px',
                                height: '6px',
                                background: '#f0f4f8',
                                borderRadius: '3px',
                                zIndex: 1
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '25px',
                                left: '40px',
                                width: `calc(${Math.max(0, getCurrentStepIndex(order.status)) / (statusSteps.length - 1) * 100}% - 40px)`,
                                height: '6px',
                                background: '#2d5a27',
                                borderRadius: '3px',
                                zIndex: 2,
                                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}></div>

                            {statusSteps.map((step, index) => {
                                const isCompleted = getCurrentStepIndex(order.status) >= index;
                                const isActive = order.status === step.id;

                                return (
                                    <div key={step.id} style={{ zIndex: 3, textAlign: 'center', width: '60px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: isCompleted ? '#2d5a27' : 'white',
                                            border: `4px solid ${isCompleted ? '#2d5a27' : '#f0f4f8'}`,
                                            color: isCompleted ? 'white' : '#cbd5e0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 15px',
                                            fontSize: '18px',
                                            boxShadow: isActive ? '0 0 20px rgba(45, 90, 39, 0.3)' : 'none',
                                            transform: isActive ? 'scale(1.15)' : 'scale(1)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className={step.icon}></i>
                                        </div>
                                        <p style={{
                                            fontSize: '13px',
                                            fontWeight: isActive ? 'bold' : '500',
                                            color: isCompleted ? '#2d5a27' : '#a0aec0',
                                            whiteSpace: 'nowrap'
                                        }}>{step.label}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #edf2f7' }}>
                                <h4 style={{ marginBottom: '20px', color: '#2d5a27', display: 'flex', alignItems: 'center' }}>
                                    <i className="fas fa-shipping-fast" style={{ marginLeft: '10px' }}></i>
                                    تفاصيل التوصيل
                                </h4>
                                <div style={{ lineHeight: '2' }}>
                                    <p><strong><i className="far fa-user" style={{ marginLeft: '8px', color: '#718096' }}></i> الاسم:</strong> {order.delivery_name}</p>
                                    <p><strong><i className="fas fa-map-marker-alt" style={{ marginLeft: '8px', color: '#718096' }}></i> المدينة:</strong> {order.delivery_city}</p>
                                    <p><strong><i className="fas fa-store" style={{ marginLeft: '8px', color: '#718096' }}></i> المزرعة:</strong> {order.farm_name}</p>
                                </div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #edf2f7' }}>
                                <h4 style={{ marginBottom: '20px', color: '#2d5a27', display: 'flex', alignItems: 'center' }}>
                                    <i className="fas fa-shopping-basket" style={{ marginLeft: '10px' }}></i>
                                    المنتجات
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {order.items?.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < order.items.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                                            <span>{item.product_name} x {item.quantity}</span>
                                            <span style={{ fontWeight: 'bold' }}>{item.price} ريال</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default OrderTrackingPage
