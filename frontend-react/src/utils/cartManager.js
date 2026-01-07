// CartManager للـ React - مدمج من cart.js
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.listeners = [];
    }

    // إضافة مستمع للتغييرات
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // إشعار جميع المستمعين
    notify() {
        this.listeners.forEach(listener => listener(this.cart));
    }

    // إضافة منتج للسلة
    addItem(product, price, image = '', farm = '') {
        const existingItem = this.cart.find(item => item.product === product);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                product: product,
                price: parseFloat(price),
                image: image,
                farm: farm,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.notify();
        return true;
    }

    // تحديث الكمية
    updateQuantity(product, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(product);
            return;
        }
        
        const item = this.cart.find(item => item.product === product);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.notify();
        }
    }

    // إزالة منتج
    removeItem(product) {
        this.cart = this.cart.filter(item => item.product !== product);
        this.saveCart();
        this.notify();
    }

    // حفظ السلة
    async saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            
            // مزامنة مع الباك إند إذا المستخدم مسجل
            await this.syncWithBackendIfLoggedIn();
            
        } catch (e) {
            console.error('خطأ في حفظ السلة:', e);
            throw new Error('عذراً، لا يمكن إضافة المزيد من المنتجات');
        }
    }

    // تفريغ السلة
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.notify();
    }

    // الحصول على إجمالي السلة
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // الحصول على عدد المنتجات
    getItemsCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // الحصول على عناصر السلة
    getCartItems() {
        return [...this.cart];
    }

    // مزامنة مع الباك إند
    async syncWithBackendIfLoggedIn() {
        const token = localStorage.getItem('access_token');
        if (!token) return;
        
        try {
            const response = await fetch('http://127.0.0.1:8001/api/cart/sync/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: this.cart })
            });
            
            if (!response.ok) {
                console.warn('فشل في مزامنة السلة مع الخادم');
            }
        } catch (error) {
            console.error('خطأ في المزامنة:', error);
        }
    }

    // تحميل السلة من الباك إند
    async loadFromBackend() {
        const token = localStorage.getItem('access_token');
        if (!token) return;
        
        try {
            const response = await fetch('http://127.0.0.1:8001/api/cart/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.cart && Array.isArray(data.cart)) {
                    this.cart = data.cart;
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                    this.notify();
                }
            }
        } catch (error) {
            console.error('خطأ في تحميل السلة:', error);
        }
    }
}

// إنشاء instance واحد مشترك
const cartManager = new CartManager();

export default cartManager;

