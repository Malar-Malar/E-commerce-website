// Import Firebase modules
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

// Function to remove an item from the cart
function removeFromCart(index) {
  if (!currentUser) {
    alert("Please log in to modify your cart.");
    return;
  }

  const userEmail = currentUser.email.replace(/\./g, "_");
  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  // Remove the item at the specified index
  cart.splice(index, 1);

  // Update the cart in localStorage
  localStorage.setItem(userEmail, JSON.stringify(cart));

  // Reload the cart page to reflect the changes
  location.reload();
}

// Function to increase item quantity
function increaseQuantity(index) {
  const userEmail = currentUser.email.replace(/\./g, "_");
  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  cart[index].quantity += 1;

  // Save updated cart to localStorage
  localStorage.setItem(userEmail, JSON.stringify(cart));

  // Reload the page to update UI
  location.reload();
}

// Function to decrease item quantity
function decreaseQuantity(index) {
  const userEmail = currentUser.email.replace(/\./g, "_");
  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;

    // Save updated cart to localStorage
    localStorage.setItem(userEmail, JSON.stringify(cart));

    // Reload the page to update UI
    location.reload();
  } else {
    alert("Quantity cannot be less than 1.");
  }
}

// Function to place an order
function placeOrder() {
  if (!currentUser) {
    alert("Please log in to place an order.");
    return;
  }

  const userEmail = currentUser.email.replace(/\./g, "_");
  const cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  // Save the current order to localStorage
  localStorage.setItem("currentOrder", JSON.stringify(cart));

  // Clear the cart from localStorage
  localStorage.removeItem(userEmail);

  // Redirect to the checkout page
  location.href = "../../../Assets/pages/html/checkout.html";
}

// On page load
window.onload = function () {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("Please log in to view your cart.");
      return;
    }

    currentUser = user;
    const userEmail = currentUser.email.replace(/\./g, "_");
    const cart = JSON.parse(localStorage.getItem(userEmail)) || [];

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const cartList = document.getElementById("cart-list");
    let totalAmount = 0;

    cart.forEach((item, index) => {
      const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
      const itemTotal = itemPrice * item.quantity;
      totalAmount += itemTotal;

      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <p>Name: ${item.name}</p>
        <p>Price: ₹${itemPrice.toFixed(2)}</p>
        <p>Quantity: 
          <button class="decrease-btn" data-index="${index}">-</button>
          ${item.quantity}
          <button class="increase-btn" data-index="${index}">+</button>
        </p>
        <p>Total: ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartList.appendChild(cartItemDiv);
    });

    // Display total amount
    const totalAmountDiv = document.createElement("div");
    totalAmountDiv.classList.add("total-amount");
    totalAmountDiv.innerHTML = `<h3>Total Amount: ₹${totalAmount.toFixed(2)}</h3>`;
    cartList.appendChild(totalAmountDiv);

    // Add Place Order Button
    const placeOrderButton = document.createElement("button");
    placeOrderButton.textContent = "Place Order";
    placeOrderButton.classList.add("place-order");
    placeOrderButton.onclick = placeOrder;
    cartList.appendChild(placeOrderButton);

    // Event delegation for "+" and "-" buttons and "Remove" button
    cartList.addEventListener("click", function (event) {
      const target = event.target;

      if (target.classList.contains("increase-btn")) {
        const index = target.getAttribute("data-index");
        increaseQuantity(index);
      }

      if (target.classList.contains("decrease-btn")) {
        const index = target.getAttribute("data-index");
        decreaseQuantity(index);
      }

      if (target.classList.contains("remove-btn")) {
        const index = target.getAttribute("data-index");
        removeFromCart(index);
      }
    });
  });
};
