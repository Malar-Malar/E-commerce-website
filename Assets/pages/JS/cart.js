import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGtCmw3QskPI9jyB-BB5LHN3IkqhwPerk",
  authDomain: "bakery-shop-59e3c.firebaseapp.com",
  projectId: "bakery-shop-59e3c",
  storageBucket: "bakery-shop-59e3c.appspot.com",
  messagingSenderId: "144499188515",
  appId: "1:144499188515:web:53ea8d9b0eb845a45a6296",
  measurementId: "G-KEVGH6JRX7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global variable to track the current user
let currentUser = null;

// On page load
window.onload = function () {
  // Listen for authentication state changes
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("Please log in to view your cart.");
      return;
    }

    currentUser = user; // Track the logged-in user
    const userEmail = currentUser.email.replace(/\./g, "_");
    const cart = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Populate the cart list
    const cartList = document.getElementById("cart-list");
    let totalAmount = 0; // Initialize total amount

    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      // Parse the price (remove "$" symbol if present)
      const itemPrice = parseFloat(item.price.replace(/^\$/, "")) || 0;
      const itemTotal = itemPrice * item.quantity;
      totalAmount += itemTotal; // Add to the total amount

      cartItemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <p>Name: ${item.name}</p>
        <p>Price: $${itemPrice.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${itemTotal.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})" class="remove">Remove</button>
      `;

      cartList.appendChild(cartItemDiv);
    });

    // Display the total amount
    const totalAmountDiv = document.createElement("div");
    totalAmountDiv.classList.add("total-amount");
    totalAmountDiv.innerHTML = `<h3>Total Amount: $${totalAmount.toFixed(2)}</h3>`;
    cartList.appendChild(totalAmountDiv);
  });
};

// Remove item from cart
window.removeFromCart = function (index) {
  if (!currentUser) {
    alert("Please log in to remove items from your cart.");
    return;
  }

  const userEmail = currentUser.email.replace(/\./g, "_");
  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  console.log("Cart before removal:", cart);

  // Validate index
  if (index < 0 || index >= cart.length) {
    alert("Invalid cart item index.");
    return;
  }

  // Remove the item at the specified index
  cart.splice(index, 1);

  console.log("Cart after removal:", cart);

  // Save the updated cart back to localStorage
  localStorage.setItem(userEmail, JSON.stringify(cart));

  console.log("Updated cart in localStorage:", localStorage.getItem(userEmail));

  // Reload the cart to reflect changes
  loadCart();
};

// Reload the cart page to reflect changes
function loadCart() {
  location.reload();
}
