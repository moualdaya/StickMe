// Confirmation page functionality

// DOM Elements
const orderNumber = document.getElementById('orderNumber');
const orderDate = document.getElementById('orderDate');
const orderAmount = document.getElementById('orderAmount');

// Initialize Confirmation Page
document.addEventListener('DOMContentLoaded', function() {
    const lastOrder = JSON.parse(localStorage.getItem('stickme_last_order'));
    
    if (!lastOrder) {
        // Redirect to home if no order data
        window.location.href = 'index.html';
        return;
    }
    
    displayOrderConfirmation(lastOrder);
    updateCartCount();
    
    // Clean up order data after displaying
    setTimeout(() => {
        localStorage.removeItem('stickme_last_order');
    }, 1000);
});

// Display Order Confirmation
function displayOrderConfirmation(order) {
    orderNumber.textContent = order.orderNumber;
    orderDate.textContent = formatDate(new Date(order.orderDate));
    orderAmount.textContent = formatPrice(order.total);
}