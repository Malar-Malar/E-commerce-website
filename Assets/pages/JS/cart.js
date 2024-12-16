
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global variable to track the current user
let currentUser = null;

window.onload = function () {
  // Listen for authentication state change
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert('Please log in to view your cart.');
      return;
    }

    currentUser = user; // Track the logged-in user
    const userEmail = user.email.replace('.', '_');
    const cart = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Populate the cart list
    const cartList = document.getElementById("cart-list");

    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <p>Name: ${item.name}</p>
        <p>Price: ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart(${index})" class="remove" >Remove</button>
      `;

      cartList.appendChild(cartItemDiv);
    });
  });
};

// Remove item from cart
window.removeFromCart = function (index) {
  if (!currentUser) {
    alert('Please log in to remove items from your cart.');
    return;
  }

  const userEmail = currentUser.email.replace('.', '_'); // Ensure you're using currentUser
  const cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  // Remove the item at the given index
  cart.splice(index, 1);

  // Save the updated cart back to localStorage
  localStorage.setItem(userEmail, JSON.stringify(cart));

  // Reload the cart
  loadCart();
};

// Reload the cart page to reflect changes
function loadCart() {
  location.reload();
}


  
  