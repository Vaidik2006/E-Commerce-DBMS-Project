// Select elements
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

// Load cart items for order summary
function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    checkoutItems.innerHTML = `<p class="empty-cart">Your cart is empty 🛒</p>`;
    checkoutTotal.textContent = "Total: ₹0";
    return;
  }

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <h3>${item.title}</h3>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>
      </div>`
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutTotal.textContent = `Total: ₹${total.toLocaleString()}`;
}

// Handle order submission
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    name,
    email,
    address,
    payment,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toLocaleString(),
  };

  console.log("Order Placed:", order);

  // Clear cart
  localStorage.removeItem("cart");

  // Show success message
  alert("Order placed successfully! Thank you for shopping with us.");

  // Redirect to home
  window.location.href = "index.html";
});

// Initialize
loadCheckout();
