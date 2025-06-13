// Order page functionality

// DOM Elements
const orderForm = document.getElementById('orderForm');
const orderItems = document.getElementById('orderItems');
const orderSubtotal = document.getElementById('orderSubtotal');
const orderTotal = document.getElementById('orderTotal');

// Initialize Order Page
document.addEventListener('DOMContentLoaded', function() {
    const cart = getCart();
    
    // Redirect to cart if empty
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        window.location.href = 'cart.html';
        return;
    }
    
    renderOrderSummary();
    updateCartCount();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    orderForm.addEventListener('submit', handleOrderSubmission);
}

// Order Summary Rendering
function renderOrderSummary() {
    const cart = getCart();
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="order-item-image" style="background-image: url('${item.image}')"></div>
            <div class="order-item-info">
                <div class="order-item-title">${item.title}</div>
                <div class="order-item-details">
                    <span>Qty: ${item.quantity}</span>
                    <span>${formatPrice(item.price)} each</span>
                </div>
            </div>
            <div class="order-item-total">
                ${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');

    const subtotal = getCartTotal();
    const shipping = 4.99;
    const total = subtotal + shipping;
    
    orderSubtotal.textContent = formatPrice(subtotal);
    orderTotal.textContent = formatPrice(total);
}

// Order Form Handling
function handleOrderSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            country: formData.get('country')
        },
        payment: formData.get('payment'),
        items: getCart(),
        subtotal: getCartTotal(),
        shipping: 4.99,
        total: getCartTotal() + 4.99,
        orderNumber: generateOrderNumber(),
        orderDate: new Date()
    };
    
    // Store order data for confirmation page
    localStorage.setItem('stickme_last_order', JSON.stringify(orderData));
    
    // Clear cart
    clearCart();
    
    // Redirect to confirmation
    window.location.href = 'confirmation.html';
}