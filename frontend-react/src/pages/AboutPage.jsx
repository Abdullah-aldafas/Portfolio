import Header from '../components/Header'
import Footer from '../components/Footer'

function AboutPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        marginTop: '70px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>من نحن</h1>
          <p style={{ fontSize: '1.2rem' }}>قصة نجاحنا في ربط المزارعين بالمستهلكين</p>
        </div>
      </section>

      {/* About Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">قصتنا</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
              تأسست "مزارع المملكة" عام 2025 برؤية طموحة تهدف إلى إحداث ثورة في القطاع الزراعي 
              من خلال ربط المزارعين المحليين مباشرة بالمستهلكين. نحن نؤمن بأن الجودة تبدأ من التربة 
              وتنتهي على مائدة طعامكم.
            </p>
          </div>

          {/* Mission and Vision */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            margin: '60px 0'
          }}>
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <i className="fas fa-bullseye" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
              <h3>رسالتنا</h3>
              <p>تمكين المزارعين المحليين وتوفير منتجات زراعية طازجة وعالية الجودة للمستهلكين، 
                 مع الحفاظ على الاستدامة البيئية ودعم الاقتصاد المحلي.</p>
            </div>
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <i className="fas fa-eye" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
              <h3>رؤيتنا</h3>
              <p>أن نكون المنصة الرائدة في الربط بين المزارعين والمستهلكين في الوطن العربي، 
                 وأن نساهم في تحقيق الأمن الغذائي من خلال دعم الزراعة المستدامة.</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div style={{ margin: '80px 0' }}>
            <h2 className="section-title">لماذا تختار مزارع المملكة؟</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginTop: '40px'
            }}>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <i className="fas fa-shield-alt" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                <h3>جودة مضمونة</h3>
                <p>جميع منتجاتنا تخضع لرقابة جودة صارمة لضمان Freshness والجودة</p>
              </div>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <i className="fas fa-truck" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                <h3>توصيل سريع</h3>
                <p>نوصل طلباتكم خلال 24 ساعة للحفاظ على نضارة المنتجات</p>
              </div>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <i className="fas fa-hand-holding-usd" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                <h3>أسعار منافسة</h3>
                <p>أسعارنا مناسبة بدون وسطاء، فائدة أكثر للمزارع والمستهلك</p>
              </div>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <i className="fas fa-heart" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
                <h3>دعم محلي</h3>
                <p>ندعم المزارعين المحليين ونشارك في تنمية المجتمع</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: 'var(--primary-color)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>أرقامنا تتحدث</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginTop: '40px'
          }}>
            <div>
              <h3 style={{ fontSize: '3rem', marginBottom: '10px' }}>500+</h3>
              <p>مزارع منضم</p>
            </div>
            <div>
              <h3 style={{ fontSize: '3rem', marginBottom: '10px' }}>10,000+</h3>
              <p>عميل سعيد</p>
            </div>
            <div>
              <h3 style={{ fontSize: '3rem', marginBottom: '10px' }}>50,000+</h3>
              <p>طلب مكتمل</p>
            </div>
            <div>
              <h3 style={{ fontSize: '3rem', marginBottom: '10px' }}>15+</h3>
              <p>مدينة مغطاة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">فريقنا</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                height: '200px',
                background: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-user-circle" style={{ fontSize: '100px', color: 'white' }}></i>
              </div>
              <div style={{ padding: '20px' }}>
                <h3>رغد البلادي</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>عضو فريق</p>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                height: '200px',
                background: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-user-circle" style={{ fontSize: '100px', color: 'white' }}></i>
              </div>
              <div style={{ padding: '20px' }}>
                <h3>عبدالله الدعفس</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>عضو فريق</p>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                height: '200px',
                background: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-user-circle" style={{ fontSize: '100px', color: 'white' }}></i>
              </div>
              <div style={{ padding: '20px' }}>
                <h3>نجوى الجنيدل</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>عضو فريق</p>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                height: '200px',
                background: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-user-circle" style={{ fontSize: '100px', color: 'white' }}></i>
              </div>
              <div style={{ padding: '20px' }}>
                <h3>هيفاء بن حشر</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>عضو فريق</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutPage

