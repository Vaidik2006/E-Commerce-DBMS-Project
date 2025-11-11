// Selectors
const cartItemsContainer = document.getElementById("cart-items");
const totalItemsEl = document.getElementById("total-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// Load and display cart
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty 🛍️</p>`;
    totalItemsEl.textContent = "Total Items: 0";
    totalPriceEl.textContent = "Total: ₹0";
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-details">
        <h3>${item.title}</h3>
        <p>₹${item.price}</p>
        <div class="quantity-control">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-index="${index}">✖</button>
    </div>
  `).join('');

  updateSummary();
  attachCartListeners();
}

// Update summary
function updateSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  totalItemsEl.textContent = `Total Items: ${totalItems}`;
  totalPriceEl.textContent = `Total: ₹${totalPrice.toLocaleString()}`;
}

// Attach listeners to buttons
function attachCartListeners() {
  const incBtns = document.querySelectorAll(".increase");
  const decBtns = document.querySelectorAll(".decrease");
  const removeBtns = document.querySelectorAll(".remove-btn");

  incBtns.forEach(btn => btn.addEventListener("click", increaseQty));
  decBtns.forEach(btn => btn.addEventListener("click", decreaseQty));
  removeBtns.forEach(btn => btn.addEventListener("click", removeItem));
}

function increaseQty(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (!JSON.parse(localStorage.getItem("cart"))?.length) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
});

// Init
loadCart();
