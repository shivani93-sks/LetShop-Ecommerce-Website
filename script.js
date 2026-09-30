// ===================================================
// LetShop - Main JavaScript
// ===================================================

// 1. Local Sample Product Data (Exact products from samples/product_details.txt)
const initialProducts = [
    {
        id: 1,
        name: "Apple Watch Series 9",
        brand: "Apple",
        description: "Smartwatch with fitness tracking.",
        price: 41999.00,
        category: "phone",
        stockQuantity: 15,
        releaseDate: "15-09-2024",
        productAvailable: true,
        imageUrl: "samples/Apple_Watch_Series_9.jpg",
        shoppulse: {
            signal: "green",
            rating: 4.7,
            reviews: [
                "Excellent quality.",
                "Exactly as described.",
                "Very happy with the product."
            ],
            recommendation: "✓ Looks promising based on available feedback."
        }
    },
    {
        id: 2,
        name: "Sony WH-1000XM5 Headphones",
        brand: "Sony",
        description: "Wireless noise canceling headphones.",
        price: 29990.00,
        category: "audio",
        stockQuantity: 25,
        releaseDate: "20-05-2024",
        productAvailable: true,
        imageUrl: "samples/Sony_WH_1000XM5_Headphones.jpg",
        shoppulse: {
            signal: "yellow",
            rating: 3.5,
            reviews: [
                "Good product overall.",
                "Quality could be better.",
                "Expected something different."
            ],
            recommendation: "⚠ Check the reviews before buying."
        }
    },
    {
        id: 3,
        name: "Nike Air Zoom Sneakers",
        brand: "Nike",
        description: "Lightweight running shoes.",
        price: 10495.00,
        category: "fashion",
        stockQuantity: 40,
        releaseDate: "10-03-2024",
        productAvailable: true,
        imageUrl: "samples/Nike_Air_Zoom_Sneakers.jpg",
        shoppulse: {
            signal: "red",
            rating: 2.4,
            reviews: [
                "Product quality was poor.",
                "Product was different from description.",
                "Not as shown in picture."
            ],
            recommendation: "⚠ Consider avoiding this product based on the available feedback."
        }
    },
    {
        id: 4,
        name: "Keychron Mechanical Keyboard",
        brand: "Keychron",
        description: "Wireless mechanical keyboard.",
        price: 16999.00,
        category: "laptop",
        stockQuantity: 18,
        releaseDate: "18-02-2024",
        productAvailable: true,
        imageUrl: "samples/Keychron_Mechanical_Keyboard.jpg",
        shoppulse: {
            signal: "gray",
            rating: 4.0,
            reviews: [
                "Good product."
            ],
            recommendation: "ℹ Not enough reviews to make a strong recommendation."
        }
    },
    {
        id: 5,
        name: "Canon EOS R50 Camera",
        brand: "Canon",
        description: "Compact 4K mirrorless camera.",
        price: 58990.00,
        category: "camera",
        stockQuantity: 8,
        releaseDate: "01-06-2024",
        productAvailable: true,
        imageUrl: "samples/Canon_EOS_R50_Camera.jpg",
        shoppulse: {
            signal: "green",
            rating: 4.8,
            reviews: [
                "Crystal clear 4K video quality.",
                "Fast autofocus and easy to carry.",
                "Very happy with the product."
            ],
            recommendation: "✓ Looks promising based on available feedback."
        }
    },
    {
        id: 6,
        name: "Logitech Gaming Mouse",
        brand: "Logitech",
        description: "Wireless gaming mouse.",
        price: 11490.00,
        category: "toy",
        stockQuantity: 30,
        releaseDate: "12-04-2024",
        productAvailable: true,
        imageUrl: "samples/Logitech_Gaming_Mouse.jpg",
        shoppulse: {
            signal: "yellow",
            rating: 3.6,
            reviews: [
                "Very responsive sensor for gaming.",
                "Quality could be better.",
                "Expected something different."
            ],
            recommendation: "⚠ Check the reviews before buying."
        }
    }
];

// 2. In-memory Application State
let allProducts = [...initialProducts]; // Stores all products locally
let cart = [];                           // Stores selected items in the user's shopping cart

// 3. Select DOM Elements: Navbar & Header
const cartBadge = document.querySelector(".cart-badge");
const navBrand = document.querySelector("#navBrand");
const navHome = document.querySelector("#navHome");
const navAddProduct = document.querySelector("#navAddProduct");
const navCategories = document.querySelector("#navCategories");
const navCart = document.querySelector("#navCart");

// 4. Select DOM Elements: Search Form
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

// 5. Select DOM Elements: View Sections
const homeSection = document.querySelector("#homeSection");
const addProductSection = document.querySelector("#addProductSection");
const categoriesSection = document.querySelector("#categoriesSection");
const cartSection = document.querySelector("#cartSection");
const productsContainer = document.querySelector(".products-container");
const homeTitle = document.querySelector("#homeTitle");

// 6. Select DOM Elements: Cart View Elements
const cartEmptyState = document.querySelector("#cartEmptyState");
const cartContentWrapper = document.querySelector("#cartContentWrapper");
const cartItemsList = document.querySelector("#cartItemsList");
const summaryTotalItems = document.querySelector("#summaryTotalItems");
const summaryTotalPrice = document.querySelector("#summaryTotalPrice");
const btnContinueShopping = document.querySelector("#btnContinueShopping");
const btnContinueAlt = document.querySelector("#btnContinueAlt");
const btnCheckout = document.querySelector("#btnCheckout");

// 7. Select DOM Elements: Add Product Form
const addProductForm = document.querySelector("#addProductForm");
const addCategorySelect = document.querySelector("#addCategory");
const customCategoryInput = document.querySelector("#customCategoryInput");
const addImageInput = document.querySelector("#addImage");
const imagePreviewContainer = document.querySelector("#imagePreviewContainer");
const imagePreview = document.querySelector("#imagePreview");
const imagePreviewName = document.querySelector("#imagePreviewName");
const imagePreviewSize = document.querySelector("#imagePreviewSize");
const btnClearImage = document.querySelector("#btnClearImage");

// ===================================================
// Section Navigation
// ===================================================
function showSection(sectionName) {
    // 1. Hide all sections
    homeSection.style.display = "none";
    addProductSection.style.display = "none";
    categoriesSection.style.display = "none";
    cartSection.style.display = "none";

    // 2. Remove active highlight from all nav links
    navHome.classList.remove("active-link");
    navAddProduct.classList.remove("active-link");
    navCategories.classList.remove("active-link");

    // 3. Show selected section and highlight matching link
    if (sectionName === "home") {
        homeSection.style.display = "block";
        navHome.classList.add("active-link");
    } else if (sectionName === "addProduct") {
        addProductSection.style.display = "block";
        navAddProduct.classList.add("active-link");
    } else if (sectionName === "categories") {
        renderCategories(); // Refresh category cards when opening categories view
        categoriesSection.style.display = "block";
        navCategories.classList.add("active-link");
    } else if (sectionName === "cart") {
        renderCart(); // Refresh cart items when opening cart view
        cartSection.style.display = "block";
    }

    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Nav link event listeners
navBrand.addEventListener("click", function (e) {
    e.preventDefault();
    homeTitle.textContent = "Latest Products";
    searchInput.value = "";
    showSection("home");
    renderProducts(allProducts);
});

navHome.addEventListener("click", function (e) {
    e.preventDefault();
    homeTitle.textContent = "Latest Products";
    searchInput.value = "";
    showSection("home");
    renderProducts(allProducts);
});

navAddProduct.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("addProduct");
});

navCategories.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("categories");
});

navCart.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("cart");
});

btnContinueShopping.addEventListener("click", function () {
    homeTitle.textContent = "Latest Products";
    showSection("home");
    renderProducts(allProducts);
});

btnContinueAlt.addEventListener("click", function () {
    homeTitle.textContent = "Latest Products";
    showSection("home");
    renderProducts(allProducts);
});

btnCheckout.addEventListener("click", function () {
    alert("Checkout functionality will be connected in future steps!");
});

// ===================================================
// Dynamic Categories & Filtering
// ===================================================
function renderCategories() {
    const categoryGrid = document.querySelector(".category-grid");
    if (!categoryGrid) return;

    // Map of popular category icons
    const categoryIcons = {
        phone: "📱",
        phones: "📱",
        laptop: "💻",
        laptops: "💻",
        fashion: "👕",
        clothing: "👕",
        toy: "🧸",
        toys: "🧸",
        audio: "🎧",
        headphones: "🎧",
        gaming: "🎮",
        games: "🎮",
        book: "📚",
        books: "📚",
        sports: "⚽",
        shoes: "👟"
    };

    // Build unique categories and counts dynamically from loaded products
    const categoryMap = new Map();

    // Count products for each category, and dynamically add newly discovered categories
    allProducts.forEach(function (product) {
        if (!product.category) return;
        const catKey = product.category.toLowerCase().trim();
        if (categoryMap.has(catKey)) {
            categoryMap.get(catKey).count += 1;
        } else {
            const capitalized = catKey.charAt(0).toUpperCase() + catKey.slice(1);
            const icon = categoryIcons[catKey] || "📦";
            categoryMap.set(catKey, { name: capitalized, count: 1, icon: icon });
        }
    });

    // Generate HTML for category cards
    let gridHTML = "";
    categoryMap.forEach(function (info, key) {
        gridHTML += `
            <div class="category-card" data-category="${key}">
                <span class="category-icon">${info.icon}</span>
                <h3 class="category-name">${info.name}</h3>
                <p class="category-count">${info.count} Product${info.count === 1 ? "" : "s"}</p>
            </div>
        `;
    });
    categoryGrid.innerHTML = gridHTML;

    // Attach click listeners to all category cards
    const newCategoryCards = categoryGrid.querySelectorAll(".category-card");
    newCategoryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const selectedCategory = card.getAttribute("data-category");
            const categoryName = card.querySelector(".category-name").textContent;

            const filtered = allProducts.filter(function (product) {
                return product.category && product.category.toLowerCase().trim() === selectedCategory;
            });

            homeTitle.textContent = `Category: ${categoryName}`;
            showSection("home");
            renderProducts(filtered);
        });
    });
}

// Dynamically populate Add Product category select dropdown from existing database categories
function updateCategoryDropdown() {
    if (!addCategorySelect) return;
    const currentVal = addCategorySelect.value;
    const categories = new Set();
    allProducts.forEach(function (p) {
        if (p.category) categories.add(p.category.toLowerCase().trim());
    });

    let html = `<option value="">Select a category</option>`;
    categories.forEach(function (cat) {
        const label = cat.charAt(0).toUpperCase() + cat.slice(1);
        html += `<option value="${cat}">${label}</option>`;
    });
    html += `<option value="new">+ Add New Category...</option>`;
    addCategorySelect.innerHTML = html;
    if (currentVal && currentVal !== "new") addCategorySelect.value = currentVal;
}

// Search functionality
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        homeTitle.textContent = "Latest Products";
        showSection("home");
        renderProducts(allProducts);
        return;
    }

    const results = allProducts.filter(function (product) {
        const nameMatch = product.name && product.name.toLowerCase().includes(query);
        const brandMatch = product.brand && product.brand.toLowerCase().includes(query);
        const descMatch = product.description && product.description.toLowerCase().includes(query);
        return nameMatch || brandMatch || descMatch;
    });

    homeTitle.textContent = `Search Results for "${searchInput.value.trim()}"`;
    showSection("home");

    if (results.length === 0) {
        productsContainer.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; color: #888; font-size: 16px; margin: 40px 0;">
                🔍 No products found matching "<strong>${searchInput.value.trim()}</strong>".
            </p>
        `;
    } else {
        renderProducts(results);
    }
});

// ===================================================
// Add Product: Handle New Category & Form Submission
// ===================================================

// Reveal or hide custom category input when "+ Add New Category..." is selected
addCategorySelect.addEventListener("change", function () {
    if (addCategorySelect.value === "new") {
        customCategoryInput.style.display = "block";
        customCategoryInput.required = true;
        customCategoryInput.focus();
    } else {
        customCategoryInput.style.display = "none";
        customCategoryInput.required = false;
        customCategoryInput.value = "";
    }
});

// Helper function to format HTML date (YYYY-MM-DD) to backend format (DD-MM-YYYY)
function formatDateForBackend(dateString) {
    if (!dateString) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    }
    const parts = dateString.split("-"); // [YYYY, MM, DD]
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY
}

// ---------------------------------------------------
// Image File Upload & Instant Preview Handlers
// ---------------------------------------------------
let selectedImageFile = null;
let selectedImageDataUrl = null;

function resetImagePreview() {
    selectedImageFile = null;
    selectedImageDataUrl = null;
    if (addImageInput) addImageInput.value = "";
    if (imagePreviewContainer) imagePreviewContainer.style.display = "none";
    if (imagePreview) imagePreview.src = "";
    if (imagePreviewName) imagePreviewName.textContent = "";
    if (imagePreviewSize) imagePreviewSize.textContent = "";
}

// Handle file selection from local computer
if (addImageInput) {
    addImageInput.addEventListener("change", function () {
        const file = addImageInput.files && addImageInput.files[0];
        if (file) {
            // Verify file is an image by MIME type OR file extension
            const isImage = (file.type && file.type.startsWith("image/")) || 
                            /\.(jpe?g|png|gif|webp|bmp|svg|avif)$/i.test(file.name);
            if (!isImage) {
                alert("Please select a valid image file (JPG, PNG, WEBP, etc.)");
                resetImagePreview();
                return;
            }

            // Keep reference in variable
            selectedImageFile = file;

            // Read file into DataURL for instant local preview
            const reader = new FileReader();
            reader.onload = function (e) {
                selectedImageDataUrl = e.target.result;
                imagePreview.src = selectedImageDataUrl;
                imagePreviewName.textContent = file.name;
                imagePreviewSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
                imagePreviewContainer.style.display = "flex";
            };
            reader.readAsDataURL(file);
        } else {
            resetImagePreview();
        }
    });
}

// Handle image removal button
if (btnClearImage) {
    btnClearImage.addEventListener("click", function () {
        resetImagePreview();
    });
}

// ---------------------------------------------------
// Add Product: Local In-Memory Storage (No Backend)
// ---------------------------------------------------
addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Gather all form inputs
    const name = document.querySelector("#addName").value.trim();
    const brand = document.querySelector("#addBrand").value.trim();
    const description = document.querySelector("#addDescription").value.trim();
    const price = parseFloat(document.querySelector("#addPrice").value);
    const stockQuantity = parseInt(document.querySelector("#addStock").value, 10);
    const rawDate = document.querySelector("#addReleaseDate").value;
    const productAvailable = document.querySelector("#addAvailable").checked;

    // Handle Category: check if user picked an existing category or entered a new one
    let category = addCategorySelect.value;
    if (category === "new") {
        category = customCategoryInput.value.trim().toLowerCase();
        if (!category) {
            alert("Please type a name for your new category!");
            customCategoryInput.focus();
            return;
        }
    }

    // 2. Build product data object matching original product model
    const newProduct = {
        id: Date.now(),
        name: name,
        brand: brand,
        description: description,
        price: price,
        category: category,
        stockQuantity: stockQuantity,
        releaseDate: formatDateForBackend(rawDate),
        productAvailable: productAvailable,
        imageUrl: selectedImageDataUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        shoppulse: {
            signal: "gray",
            rating: 4.0,
            reviews: [
                "Good product."
            ],
            recommendation: "ℹ Not enough reviews to make a strong recommendation."
        }
    };

    // 3. Add to local product list
    allProducts.unshift(newProduct);

    alert("Product is added successfully");
    addProductForm.reset();
    resetImagePreview();
    customCategoryInput.style.display = "none";
    customCategoryInput.required = false;

    // Refresh products and categories
    renderProducts(allProducts);
    renderCategories();
    updateCategoryDropdown();

    // Navigate back to Home view
    showSection("home");
});

// ===================================================
// Product Card Rendering
// ===================================================
function getProductImage(product) {
    if (product.imageUrl) {
        return product.imageUrl;
    }
    // Fallback placeholder images for default sample products
    const placeholderImages = {
        1: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&auto=format&fit=crop&q=60", // iPhone 14
        2: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&auto=format&fit=crop&q=60", // Galaxy S22
        3: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=60", // MacBook Pro
        4: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&auto=format&fit=crop&q=60", // Dell XPS 13
        5: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",                               // Levi Jeans
        6: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&auto=format&fit=crop&q=60"  // Lego Set
    };
    return placeholderImages[product.id] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400";
}

function renderProducts(products) {
    let cardsHTML = "";

    products.forEach(function (product) {
        // A product is in stock only if productAvailable is true AND stockQuantity > 0
        const isInStock = product.productAvailable && Number(product.stockQuantity) > 0;

        cardsHTML += `
            <div class="product-card">
                <img src="${getProductImage(product)}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">by ${product.brand}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-stock-row">
                    <span class="product-stock ${isInStock ? "in-stock" : "out-of-stock"}">
                        ${isInStock ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
                    </span>
                    <button type="button" class="btn-shoppulse shoppulse-${product.shoppulse ? product.shoppulse.signal : 'gray'}" data-id="${product.id}" title="View ShopPulse">
                        〽 ShopPulse
                    </button>
                </div>
                <div class="card-footer">
                    <span class="product-price">₹${Number(product.price).toFixed(2)}</span>
                    <div class="card-actions">
                        ${isInStock ? 
                            `<button type="button" class="btn-add-to-cart" data-id="${product.id}">Add To Cart</button>` : 
                            `<button type="button" class="btn-add-to-cart btn-out-of-stock" disabled>Out of Stock</button>`
                        }
                        <button type="button" class="btn-delete-product" data-id="${product.id}" title="Delete Product">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    productsContainer.innerHTML = cardsHTML;
    setupCartButtons();
    setupDeleteButtons();
    setupShopPulseButtons();
}

function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".btn-delete-product");
    deleteButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const productId = parseInt(btn.getAttribute("data-id"));
            const product = allProducts.find(p => p.id === productId);
            const productName = product ? product.name : "this product";

            const confirmDelete = confirm(`Are you sure you want to delete "${productName}" from the store?`);
            if (!confirmDelete) return;

            // Remove product from local list
            allProducts = allProducts.filter(p => p.id !== productId);

            // Remove from cart if item was in cart
            cart = cart.filter(item => item.id !== productId);
            updateCartBadge();

            // Refresh UI
            renderProducts(allProducts);
            renderCategories();
            updateCategoryDropdown();

            alert(`"${productName}" deleted successfully`);
        });
    });
}

// ===================================================
// ShopPulse: Handlers & Modal Interactions
// ===================================================

function setupShopPulseButtons() {
    const pulseButtons = document.querySelectorAll(".btn-shoppulse");
    pulseButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            const productId = parseInt(btn.getAttribute("data-id"), 10);
            openShopPulseModal(productId);
        });
    });
}

function openShopPulseModal(productId) {
    const product = allProducts.find(function (p) {
        return p.id === productId;
    });
    if (!product) return;

    // Use product's shoppulse data, or default to gray/insufficient
    const pulse = product.shoppulse || {
        signal: "gray",
        rating: 4.0,
        reviews: ["Good product."],
        recommendation: "ℹ Not enough reviews to make a strong recommendation."
    };

    // 1. Populate Rating
    const ratingEl = document.querySelector("#shoppulseRating");
    if (ratingEl) {
        ratingEl.textContent = `Rating: ⭐ ${pulse.rating} / 5`;
    }

    // 2. Populate Reviews list
    const reviewsListEl = document.querySelector("#shoppulseReviewsList");
    if (reviewsListEl) {
        let reviewsHTML = "";
        pulse.reviews.forEach(function (rev) {
            // Strip any existing outer quotes and re-wrap cleanly
            const cleanText = rev.replace(/^"+|"+$/g, "");
            reviewsHTML += `<p class="shoppulse-review-item">"${cleanText}"</p>`;
        });
        reviewsListEl.innerHTML = reviewsHTML;
    }

    // 3. Populate Recommendation
    const recEl = document.querySelector("#shoppulseRecommendation");
    if (recEl) {
        recEl.textContent = pulse.recommendation;
    }

    // 4. Reveal Modal
    const modal = document.querySelector("#shoppulseModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeShopPulseModal() {
    const modal = document.querySelector("#shoppulseModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Modal event listeners (Close button, overlay backdrop click, and Escape key)
const btnShoppulseClose = document.querySelector("#btnShoppulseClose");
const shoppulseModal = document.querySelector("#shoppulseModal");

if (btnShoppulseClose) {
    btnShoppulseClose.addEventListener("click", function () {
        closeShopPulseModal();
    });
}

if (shoppulseModal) {
    shoppulseModal.addEventListener("click", function (e) {
        if (e.target === shoppulseModal) {
            closeShopPulseModal();
        }
    });
}

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeShopPulseModal();
    }
});

// ===================================================
// Cart Logic & Management
// ===================================================

function updateCartBadge() {
    const totalCount = cart.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);
    cartBadge.textContent = totalCount;
}

function addToCart(productId) {
    const product = allProducts.find(function (p) {
        return p.id === productId;
    });

    if (!product) return;

    const existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: Number(product.price),
            image: getProductImage(product),
            quantity: 1
        });
    }

    updateCartBadge();
}

function setupCartButtons() {
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = parseInt(button.getAttribute("data-id"));
            addToCart(productId);

            const originalText = button.textContent;
            button.textContent = "Added! ✔";
            setTimeout(function () {
                button.textContent = originalText;
            }, 1000);
        });
    });
}

function renderCart() {
    if (cart.length === 0) {
        cartEmptyState.style.display = "block";
        cartContentWrapper.style.display = "none";
        return;
    }

    cartEmptyState.style.display = "none";
    cartContentWrapper.style.display = "flex";

    let itemsHTML = "";
    let grandTotal = 0;
    let totalItems = 0;

    cart.forEach(function (item) {
        const itemSubtotal = item.price * item.quantity;
        grandTotal += itemSubtotal;
        totalItems += item.quantity;

        itemsHTML += `
            <div class="cart-item-row" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-brand">by ${item.brand}</p>
                    <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-qty-control">
                    <button type="button" class="qty-btn btn-qty-minus" data-id="${item.id}">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button type="button" class="qty-btn btn-qty-plus" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-subtotal">₹${itemSubtotal.toFixed(2)}</div>
                <button type="button" class="btn-remove" data-id="${item.id}">Remove</button>
            </div>
        `;
    });

    cartItemsList.innerHTML = itemsHTML;
    summaryTotalItems.textContent = totalItems;
    summaryTotalPrice.textContent = `₹${grandTotal.toFixed(2)}`;

    setupCartItemActions();
}

function setupCartItemActions() {
    const plusButtons = document.querySelectorAll(".btn-qty-plus");
    plusButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = parseInt(btn.getAttribute("data-id"));
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
                updateCartBadge();
                renderCart();
            }
        });
    });

    const minusButtons = document.querySelectorAll(".btn-qty-minus");
    minusButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = parseInt(btn.getAttribute("data-id"));
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }
                updateCartBadge();
                renderCart();
            }
        });
    });

    const removeButtons = document.querySelectorAll(".btn-remove");
    removeButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = parseInt(btn.getAttribute("data-id"));
            cart = cart.filter(i => i.id !== id);
            updateCartBadge();
            renderCart();
        });
    });
}

// ===================================================
// Initial Application Load (Replaces fetchProducts)
// ===================================================
renderProducts(allProducts);
renderCategories();
updateCategoryDropdown();
