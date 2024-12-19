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
    currentUser = user;
    globalUserEmail = user.email.replace('.', '_');  // Set the currentUser variable when the user is logged in
  } else {
    console.log("No user is logged in.");
    currentUser = null;
    globalUserEmail = "";  // Reset the currentUser variable when the user is logged out
  }
});

fetch('../../../Assets/pages/json/boxes.json')
  .then((response) => response.json())
  .then((jsonData) => {
    const productList = document.getElementById("product-list");

    jsonData.products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("products");

      productDiv.innerHTML = `
        <img src="${product.image}" alt="wishlist_img" class="Wishlist-img" id="wishlist-${product.id}" draggable="false">
        <img src="${product.image1}" alt="stand_mixer_img" class="products-images" draggable="false">
        <img src="${product.image2}" alt="rating" class="stars_rating">
        <p>Price: ${product.price}</p> 
        <button type="button" class="button" onclick="addToCart('${product.name}', '${product.price}', '${product.image1}')">Add to Cart</button>
        <button type="button" class="buttons">Buy Now</button>
      `;

      productList.appendChild(productDiv);

      // Adding event listener for wishlist click
      const wishlistImg = productDiv.querySelector('.Wishlist-img');
      wishlistImg.addEventListener("click", () => {
        console.log(`Adding ${product.name} to wishlist`);
        addToWishlist(product); // Call to add product to wishlist
      });
      
    });
  })
  .catch((error) => console.error("Error loading product data:", error));

// Function to add to wishlist
let globalUserEmail = "";

const addToWishlist = (product) => {
  if (!globalUserEmail) {
      console.error("User email not available. Cannot save to wishlist.");
      return;
  }
  
  const wishlistKey = `wishlist_${globalUserEmail}`;
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  // Check if item already exists
  if (!wishlist.some(item => item.name === product.name)) {
      wishlist.push(product);
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      alert("Item added to wishlist!");
  } else {
      alert("Item is already in your wishlist!");
  }
};

// Function to render products and set up click events
const renderProducts = () => {
  const container = document.getElementById("products-container");

  productData.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");
      productDiv.innerHTML = `
          <img src="${product.image1}" alt="${product.name}" style="width: 100px; height: 100px; cursor: pointer;">
          <p><strong>${product.name}</strong></p>
          <p>Price: ${product.price}</p>
      `;

      // Add click event listener to save item to wishlist
      productDiv.querySelector("img").addEventListener("click", () => {
          addToWishlist(product);
      });

      container.appendChild(productDiv);
  });
};

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


