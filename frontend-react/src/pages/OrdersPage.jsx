import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function OrdersPage() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('purchases') // 'purchases' or 'sales'
    const [updatingStatus, setUpdatingStatus] = useState(null)

    const statusMap = {
        'pending': { label: 'قيد الانتظار', color: '#f39c12' },
        'confirmed': { label: 'تم التأكيد', color: '#27ae60' },
        'preparing': { label: 'قيد التجهيز', color: '#2ecc71' },
        'ready': { label: 'جاهز للتوصيل', color: '#3498db' },
        'completed': { label: 'تم التوصيل', color: '#2c3e50' },
        'cancelled': { label: 'ملغي', color: '#e74c3c' }
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token')
            if (!token) {
                navigate('/login')
                return
            }

            try {
                // 1. Fetch Profile to distinguish orders
                const profileRes = await fetch('/api/auth/profile/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const profileData = await profileRes.json()
                setProfile(profileData)

                // 2. Fetch Orders
                const response = await fetch('/api/orders/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                if (response.ok) {
                    const data = await response.json()
                    setOrders(data.results || data)
                } else {
                    setError('فشل في تحميل الطلبات')
                }
            } catch (err) {
                setError('حدث خطأ في الاتصال بالسيرفر')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [navigate])

    const handleUpdateStatus = async (orderId, newStatus) => {
        setUpdatingStatus(orderId)
        try {
            const token = localStorage.getItem('access_token')
            const response = await fetch(`/api/orders/${orderId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            })

            if (response.ok) {
                const updatedOrder = await response.json()
                setOrders(orders.map(o => o.id === orderId ? updatedOrder : o))
            } else {
                alert('فشل في تحديث الحالة')
            }
        } catch (err) {
            alert('خطأ في الاتصال')
        } finally {
            setUpdatingStatus(null)
        }
    }

    const myPurchases = orders.filter(o => o.consumer === profile?.id)
    const mySales = orders.filter(o => o.consumer !== profile?.id)

    const displayedOrders = activeTab === 'purchases' ? myPurchases : mySales

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
            <div style={{ textAlign: 'center' }}>
                <i className="fas fa-spinner fa-spin fa-3x" style={{ color: '#2d5a27', marginBottom: '20px' }}></i>
                <h3>جاري تحميل طلباتك...</h3>
            </div>
        </div>
    )

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <Header />
            <div style={{ padding: '120px 0 60px' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2d5a27', fontWeight: 'bold', fontSize: '2.5rem' }}>
                        {profile?.is_farmer ? 'إدارة الطلبات' : 'مشترياتي'}
                    </h2>

                    {profile?.is_farmer && (
                        <div style={{
                            display: 'flex',
                            background: 'white',
                            padding: '10px',
                            borderRadius: '15px',
                            marginBottom: '40px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}>
                            <button
                                onClick={() => setActiveTab('purchases')}
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: activeTab === 'purchases' ? '#2d5a27' : 'transparent',
                                    color: activeTab === 'purchases' ? 'white' : '#718096',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <i className="fas fa-shopping-bag" style={{ marginLeft: '8px' }}></i>
                                مشترياتي ({myPurchases.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('sales')}
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: activeTab === 'sales' ? '#2d5a27' : 'transparent',
                                    color: activeTab === 'sales' ? 'white' : '#718096',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <i className="fas fa-store" style={{ marginLeft: '8px' }}></i>
                                طلبات الزبائن ({mySales.length})
                            </button>
                        </div>
                    )}

                    {error && <div style={{ padding: '20px', background: '#fff5f5', color: '#c53030', borderRadius: '15px', textAlign: 'center', marginBottom: '30px' }}>{error}</div>}

                    {displayedOrders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'white', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '4rem', color: '#edf2f7', marginBottom: '20px' }}>
                                <i className="fas fa-receipt"></i>
                            </div>
                            <h3 style={{ color: '#a0aec0' }}>لا يوجد طلبات في هذا القسم حالياً</h3>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '25px' }}>
                            {displayedOrders.map(order => (
                                <div key={order.id} style={{
                                    background: 'white',
                                    padding: '30px',
                                    borderRadius: '25px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                                    border: '1px solid #edf2f7',
                                    transition: 'transform 0.3s',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                                <h4 style={{ margin: 0, fontSize: '1.4rem', color: '#2d3748' }}>طلب #{order.id}</h4>
                                                <span style={{
                                                    background: statusMap[order.status]?.color + '15',
                                                    color: statusMap[order.status]?.color,
                                                    padding: '5px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {statusMap[order.status]?.label}
                                                </span>
                                            </div>
                                            <p style={{ color: '#718096', margin: 0, fontSize: '0.9rem' }}>
                                                <i className="far fa-calendar-alt" style={{ marginLeft: '5px' }}></i>
                                                {new Date(order.created_at).toLocaleDateString('ar-SA')}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p style={{ margin: 0, color: '#718096', fontSize: '0.85rem' }}>رقم التتبع:</p>
                                            <div style={{
                                                background: '#f8fafc',
                                                padding: '8px 15px',
                                                borderRadius: '10px',
                                                border: '1px solid #e2e8f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <code style={{ fontWeight: 'bold', color: '#2d5a27', fontSize: '1rem' }}>{order.tracking_number}</code>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(order.tracking_number)
                                                        alert('تم نسخ رقم التتبع!')
                                                    }}
                                                    title="نسخ رقم التتبع"
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3182ce' }}
                                                >
                                                    <i className="far fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '20px',
                                        background: '#f8fafc',
                                        padding: '20px',
                                        borderRadius: '15px',
                                        marginBottom: '20px'
                                    }}>
                                        <div>
                                            <p style={{ margin: '0 0 5px 0', color: '#a0aec0', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {activeTab === 'purchases' ? 'المزرعة' : 'الزبون'}
                                            </p>
                                            <p style={{ margin: 0, fontWeight: 'bold', color: '#2d3748' }}>
                                                {activeTab === 'purchases' ? order.farm_name : order.delivery_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 5px 0', color: '#a0aec0', fontSize: '0.8rem', fontWeight: 'bold' }}>المجموع الإجمالي</p>
                                            <p style={{ margin: 0, fontWeight: 'bold', color: '#2d5a27', fontSize: '1.1rem' }}>{order.total_amount} ريال</p>
                                        </div>
                                        {activeTab === 'sales' && (
                                            <div>
                                                <p style={{ margin: '0 0 5px 0', color: '#a0aec0', fontSize: '0.8rem', fontWeight: 'bold' }}>العنوان</p>
                                                <p style={{ margin: 0, fontSize: '0.9rem' }}>{order.delivery_city} - {order.delivery_address}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => navigate(`/track/${order.tracking_number}`)}
                                                className="btn-secondary"
                                                style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                                            >
                                                <i className="fas fa-map-marker-alt" style={{ marginLeft: '5px' }}></i> تتبع الطلب
                                            </button>
                                        </div>

                                        {activeTab === 'sales' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <label style={{ fontSize: '0.9rem', color: '#718096' }}>تحديث الحالة:</label>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                    disabled={updatingStatus === order.id}
                                                    style={{
                                                        padding: '8px',
                                                        borderRadius: '10px',
                                                        border: '1px solid #edf2f7',
                                                        outline: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {Object.entries(statusMap).map(([key, val]) => (
                                                        <option key={key} value={key}>{val.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrdersPage
