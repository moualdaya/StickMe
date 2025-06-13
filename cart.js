// Cart page functionality

// DOM Elements
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize Cart Page
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    updateCartCount();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            renderCartItems();
        }
    });

    checkoutBtn.addEventListener('click', (e) => {
        const cart = getCart();
        if (cart.length === 0) {
            e.preventDefault();
            alert('Your cart is empty. Add some stickers before checkout!');
        }
    });
}

// Cart Rendering
function renderCartItems() {
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h2l.4 2m0 0L8 17h8l2.2-8H5.4z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="9" cy="21" r="1" stroke="currentColor" stroke-width="2"/>
                    <circle cx="20" cy="21" r="1" stroke="currentColor" stroke-width="2"/>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any stickers yet.</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        updateCartSummary(0);
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="remove-btn" onclick="removeCartItem(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="cart-item-total">
                ${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');

    const subtotal = getCartTotal();
    updateCartSummary(subtotal);
}

function updateCartSummary(subtotal) {
    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + shipping;
    
    cartSubtotal.textContent = formatPrice(subtotal);
    cartTotal.textContent = formatPrice(total);
}

function updateCartQuantity(productId, change) {
    updateQuantity(productId, change);
    renderCartItems();
}

function removeCartItem(productId) {
    if (confirm('Remove this item from your cart?')) {
        removeFromCart(productId);
        renderCartItems();
    }
}

// Global functions
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;