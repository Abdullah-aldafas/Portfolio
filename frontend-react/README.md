# مزارع الوادي - Frontend (React)

مشروع Frontend مبني بـ React + Vite لمشروع مزارع الوادي.

## المتطلبات

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

## التثبيت

```bash
cd frontend-react
npm install
```

## التشغيل

```bash
npm run dev
```

سيتم تشغيل المشروع على `http://localhost:3000`

## البناء للإنتاج

```bash
npm run build
```

## الميزات

- ✅ React 18
- ✅ React Router للتنقل بين الصفحات
- ✅ تصميم متجاوب (RTL)
- ✅ ربط مع Backend API
- ✅ إدارة حالة عربة التسوق
- ✅ صفحات تسجيل الدخول والتسجيل مع معالجة الأخطاء

## البنية

```
src/
├── components/      # المكونات المشتركة
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/          # صفحات التطبيق
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ProductsPage.jsx
│   └── CartPage.jsx
├── App.jsx         # المكون الرئيسي
├── main.jsx        # نقطة الدخول
└── index.css       # التنسيقات العامة
```

## ملاحظات

- تأكد من تشغيل Backend على `http://127.0.0.1:8001`
- تم إعداد Proxy في `vite.config.js` لتوجيه طلبات `/api` إلى Backend

