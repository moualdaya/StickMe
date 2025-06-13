// Shared functionality across all pages

// Product Data
const products = [
    {
        id: 1,
        title: "Cosmic Galaxy",
        category: "space",
        price: 39.95,
        image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Cute Cactus",
        category: "plants",
        price: 29.00,
        image: "https://images.pexels.com/photos/6316071/pexels-photo-6316071.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "Retro Wave",
        category: "aesthetic",
        price: 39.49,
        image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "Gaming Controller",
        category: "gaming",
        price: 49.95,
        image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "Mountain Vista",
        category: "nature",
        price: 32.95,
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "Dragon Fantasy",
        category: "fantasy",
        price: 49.95,
        image: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 7,
        title: "Circuit Board",
        category: "tech",
        price: 3.79,
        image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 8,
        title: "Nebula Dreams",
        category: "space",
        price: 4.29,
        image: "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 9,
        title: "Succulent Garden",
        category: "plants",
        price: 2.79,
        image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 10,
        title: "Vaporwave City",
        category: "aesthetic",
        price: 3.89,
        image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 11,
        title: "Pixel Art Hero",
        category: "gaming",
        price: 3.99,
        image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
        id: 12,
        title: "Ocean Waves",
        category: "nature",
        price: 3.19,
        image: "https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    }
];

// Cart Management
function getCart() {
    return JSON.parse(localStorage.getItem('stickme_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('stickme_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showAddToCartFeedback();
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem('stickme_cart');
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function showAddToCartFeedback() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary), var(--primary-light));
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(196, 79, 232, 0.3);
        z-index: 1500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = 'Added to cart!';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatPrice(price) {
    return `${price.toFixed(2)} DH`;
}

function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SM-${timestamp}-${random}`;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Global functions for HTML onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;