import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    currentUser = user;  // Set the currentUser variable when the user is logged in
  } else {
    console.log("No user is logged in.");
    currentUser = null;  // Reset the currentUser variable when the user is logged out
  }
});


fetch('../../../Assets/pages/json/tin.json')
  .then(response => response.json())
  .then(jsonData => {

  // Get the container for all products
  const productList = document.getElementById("product-list");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("products");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="Wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="stand_mixer_img" class="products-images">
          
          <!-- Star Rating -->
          <img src="${product.image2}" alt="rating" class="stars_rating">
          
          <!-- Product Price -->
          <p>Price: ${product.price}</p>
          
          <!-- Buttons -->
          <button type="button" class="button" 
                onclick="addToCart('${product.name}', '${product.price}', '${product.image1}')">
                Add to Cart
        </button>
          <button type="button" class="buttons">Buy Now</button>
      `;
      
      productList.appendChild(productDiv);
  })
});

// Expose the addToCart function globally
window.addToCart = function addToCart(name, price, img) {
  console.log("addToCart called with:", name, price, img);

  // Get current user's email, or use 'guest' if not logged in
  const userEmail = currentUser ? currentUser.email.replace('.', '_') : 'guest';
  
  // Get cart items from localStorage
  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find((item) => item.name === name && item.price === price && item.img === img);

  if (existingItem) {
    // If the item exists, increase quantity
    if (existingItem.quantity <= 100) {
      existingItem.quantity += 1;
      alert('Increased quantity of the item in your cart!');
    } 
  } else {
    // If the item doesn't exist, add a new entry
    cart.push({
      name,
      price,
      img,
      quantity: 1
    });
    alert('Product added to cart!');
  }

  // Update cart in localStorage
  localStorage.setItem(userEmail, JSON.stringify(cart));

  console.log("Updated Cart in localStorage:", JSON.parse(localStorage.getItem(userEmail)));

  if (!currentUser) {
    alert('You are not logged in. The item has been added to your cart as a guest.');
  }
};



