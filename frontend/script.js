// Selectors
const productGrid = document.getElementById("productGrid");
const cartBadge = document.getElementById("cart-badge");
const cartIcon = document.getElementById("cart-icon");

// Load and display products
async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/listings");
    const products = await response.json();

    productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${
          product.images_url && product.images_url[0]
            ? product.images_url[0]
            : 'https://placehold.co/200'
        }" alt="${product.title}">
        
        <div class="product-info">
          <h3>${product.title}</h3>
          <p>${product.category || 'No Category'}</p>
          <p class="price">₹${product.price}</p>
          <button class="add-to-cart" 
            data-title="${product.title}" 
            data-price="${product.price}" 
            data-image="${
              product.images_url && product.images_url[0]
                ? product.images_url[0]
                : 'https://placehold.co/200'
            }">Add to Cart</button>
        </div>
      </div>
    `).join('');

    attachCartListeners();
  } catch (error) {
    console.error("Error fetching products:", error);
    productGrid.innerHTML = `<p>Unable to load products.</p>`;
  }
}

// Attach event listeners for all Add to Cart buttons
function attachCartListeners() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      const price = parseFloat(btn.getAttribute("data-price"));
      const image = btn.getAttribute("data-image");

      addToCart({ title, price, image });
      showToast(`${title} added to cart 🛒`);
      animateCartIcon(); // Fun animation
    });
  });
}

// Add item to localStorage cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.title === product.title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// Update cart badge count
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "block" : "none";
  }
}

// Toast notification (bottom-right popup)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 1800);
}

// Small bounce animation for cart icon
function animateCartIcon() {
  if (cartIcon) {
    cartIcon.classList.add("bounce");
    setTimeout(() => cartIcon.classList.remove("bounce"), 400);
  }
}

// Cart icon click -> navigate to cart page
if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

// Initialize on page load
loadProducts();
updateCartBadge();
