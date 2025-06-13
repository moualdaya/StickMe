// Shop page functionality

let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productCount = document.getElementById('productCount');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');

// Initialize Shop
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    const debouncedSearch = debounce((query) => {
        searchQuery = query.toLowerCase();
        renderProducts();
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.dataset.category;
            updateCategoryButtons();
            renderProducts();
        });
    });
}

// Product Rendering
function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery) || 
                            product.category.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card animate-fadeInUp">
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    productCount.textContent = `Showing ${filteredProducts.length} stickers`;

    // Animate new products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function updateCategoryButtons() {
    categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === currentCategory);
    });
}