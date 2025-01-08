// Firebase Modules
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global variables
let currentUser = null;
let globalUserEmail = "";

// Normalize email function
function normalizeEmail(email) {
  return encodeURIComponent(email);
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    currentUser = user;
    globalUserEmail = normalizeEmail(user.email);
    loadProducts(); // Load products after login
  } else {
    console.log("No user is logged in.");
    currentUser = null;
    globalUserEmail = "guest"; // Use 'guest' for non-authenticated users
    loadProducts(); // Load products even if the user is not logged in
  }
});

// Fetch product data and render products
function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) {
    console.error("Product list element not found.");
    return;
  }

  // Clear previous products
  productList.innerHTML = "";

  fetch("../../../Assets/pages/json/boxes.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products: " + response.statusText);
      }
      return response.json();
    })
    .then((jsonData) => {
      jsonData.products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("products");

        productDiv.innerHTML = `
          <img src="${product.image}" alt="wishlist_img" class="Wishlist-img" id="wishlist-${product.id}" 
               data-name="${product.name}" data-price="${product.price}" data-img="${product.image1}" draggable="false" 
               onerror="this.onerror=null;this.src='fallback-image.png';">
          <img src="${product.image1}" alt="stand_mixer_img" class="products-images" draggable="false" 
               onerror="this.onerror=null;this.src='fallback-image.png';">
          <p>${product.name}</p>
          <img src="${product.image2}" alt="rating" class="stars_rating" onerror="this.onerror=null;this.src='fallback-image.png';">
          <p>Price: ${product.price}</p> 
          <button type="button" class="button" onclick="addToCart('${product.name}', '${product.price}', '${product.image1}')">Add to Cart</button>
          <button type="button" class="buttons" onclick="buyNow('${product.name}', '${product.price}', '${product.image1}')">Buy Now</button>
        `;

        productList.appendChild(productDiv);
      });

      // Attach event listeners for wishlist functionality
      document.querySelectorAll(".Wishlist-img").forEach((wishlistImg) => {
        wishlistImg.removeEventListener("click", handleWishlistClick);
        wishlistImg.addEventListener("click", handleWishlistClick);
      });
    })
    .catch((error) => {
      console.error("Error loading products:", error);
      alert("Failed to load products. Please try again later.");
    });
}

// Function to handle wishlist click
function handleWishlistClick(event) {
  const { name, price, img } = event.target.dataset;
  toggleWishlistItem(name, price, img);
}

// Function to add items to the cart
window.addToCart = function addToCart(name, price, img) {
  const userEmail = globalUserEmail;
  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  const existingItem = cart.find((item) => item.name === name && item.price === price);
  if (existingItem) {
    existingItem.quantity += 1;
    alert("Increased quantity of the item in your cart!");
  } else {
    cart.push({ name, price, img, quantity: 1 });
    alert("Product added to cart!");
  }

  localStorage.setItem(userEmail, JSON.stringify(cart));
};

// Function to toggle wishlist items
const toggleWishlistItem = (name, price, image = "N/A") => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to use the wishlist feature.");
    window.location.href = "../../../Assets/pages/html/login.html";
    return;
  }

  const userEmail = normalizeEmail(user.email);
  const wishlistKey = `wishlist_${userEmail}`;
  let wishlistItems = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  const existingIndex = wishlistItems.findIndex((item) => item.name === name && item.price === price);

  if (existingIndex > -1) {
    wishlistItems.splice(existingIndex, 1);
    alert(`${name} removed from your wishlist.`);
  } else {
    wishlistItems.push({ name, price, image });
    alert(`${name} added to your wishlist!`);
  }

  localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
};

// Function to handle Buy Now
window.buyNow = function buyNow(name, price, img) {
  const user = auth.currentUser;
  if (!user) {
    alert("You need to log in to make a purchase.");
    window.location.href = "../../../Assets/pages/html/login.html";
    return;
  }

  const userEmail = normalizeEmail(user.email);
  let purchases = JSON.parse(localStorage.getItem(`purchases_${userEmail}`)) || [];

  purchases.push({
    name: name,
    price: price,
    img: img,
    date: new Date().toISOString(),
  });

  localStorage.setItem(`purchases_${userEmail}`, JSON.stringify(purchases));
  window.location.href = "../../../Assets/pages/html/buy.html";
};
