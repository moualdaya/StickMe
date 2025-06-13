// Contact page functionality

// DOM Elements
const contactForm = document.getElementById('contactForm');

// Initialize Contact Page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    contactForm.addEventListener('submit', handleContactSubmission);
}

// Contact Form Handling
function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date()
    };
    
    // Simulate form submission
    showContactConfirmation();
    contactForm.reset();
}

function showContactConfirmation() {
    // Create confirmation message
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: var(--radius-xl);
        padding: var(--space-8);
        text-align: center;
        z-index: 2000;
        box-shadow: var(--shadow-xl);
        max-width: 400px;
        width: 90%;
    `;
    
    confirmation.innerHTML = `
        <div style="color: var(--success); margin-bottom: var(--space-4);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin: 0 auto;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="9,12 12,15 15,9" stroke="currentColor" stroke-width="2"/>
            </svg>
        </div>
        <h3 style="color: var(--text-primary); margin-bottom: var(--space-4);">Message Sent!</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">
            Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <button onclick="this.parentElement.remove()" class="btn btn-primary">Close</button>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.parentNode.removeChild(confirmation);
        }
    }, 5000);
}