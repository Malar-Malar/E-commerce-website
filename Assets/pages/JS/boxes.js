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
  return email.replace('.', '_');
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    currentUser = user;
    globalUserEmail = user.email.replace('.', '_'); // Normalize email for use as a key
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
  fetch('../../../Assets/pages/json/boxes.json')
    .then((response) => response.json())
    .then((jsonData) => {
      const productList = document.getElementById("product-list");

      jsonData.products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("products");

        productDiv.innerHTML = `
          <img src="${product.image}" alt="wishlist_img" class="Wishlist-img" id="wishlist-${product.id}" 
               data-name="${product.name}" data-price="${product.price}" data-img="${product.image1}" draggable="false">
          <img src="${product.image1}" alt="stand_mixer_img" class="products-images" draggable="false">
          <p>${product.name}</p>
          <img src="${product.image2}" alt="rating" class="stars_rating">
          <p>Price: ${product.price}</p> 
          <button type="button" class="button" onclick="addToCart('${product.name}', '${product.price}', '${product.image1}')">Add to Cart</button>
          <button type="button" class="buttons" onclick="buyNow('${product.name}', '${product.price}', '${product.image1}')">Buy Now</button>
        `;

        productList.appendChild(productDiv);
      });

      // Attach event listeners for wishlist functionality
      document.querySelectorAll(".Wishlist-img").forEach((wishlistImg) => {
        wishlistImg.addEventListener("click", (event) => {
          const { name, price, img } = event.target.dataset;
          toggleWishlistItem(name, price, img);
        });
      });
    });
}

// Function to add items to the cart
window.addToCart = function addToCart(name, price, img) {
  const userEmail = globalUserEmail;

  let cart = JSON.parse(localStorage.getItem(userEmail)) || [];

  const existingItem = cart.find((item) => item.name === name && item.price === price);

  if (existingItem) {
    existingItem.quantity += 1;
    alert('Increased quantity of the item in your cart!');
  } else {
    cart.push({ name, price, img, quantity: 1 });
    alert('Product added to cart!');
  }

  localStorage.setItem(userEmail, JSON.stringify(cart));
};


const toggleWishlistItem = (name, price, image = "N/A") => {
  const user = auth.currentUser;

  // Redirect to login if user is not logged in
  if (!user) {
    alert("Please log in to use the wishlist feature.");
    window.location.href = "../../../Assets/pages/html/login.html";
    return;
  }

  const userEmail = user.email;
  console.log("Toggling wishlist item:", name, price, userEmail); // Log wishlist toggle

  // Normalize email to handle it as a unique key
  const wishlistKey = `wishlist_${normalizeEmail(userEmail)}`;
  let wishlistItems = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  // Find the index of the item in the wishlist
  const existingIndex = wishlistItems.findIndex((item) => item.name === name && item.price === price);

  const wishlistImg = document.querySelector(`img[data-name="${name}"][data-price="${price}"]`);

  if (existingIndex > -1) {
    // Remove the item from the wishlist if it exists
    wishlistItems.splice(existingIndex, 1);
    console.log(`${name} removed from wishlist.`);
    alert(`${name} removed from your wishlist.`);
  } else {
    // Add the item to the wishlist
    wishlistItems.push({ name, price, image });
    console.log(`${name} added to wishlist.`);
    alert(`${name} added to your wishlist!`);
  }

  // Save the updated wishlist to local storage
  localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));

  // Call displayWishlist to update the UI with the new wishlist items
  displayWishlist(userEmail);
};


window.buyNow = function buyNow(name, price, img) {
  const user = auth.currentUser;

  // Check if the user is logged in
  if (!user) {
    alert("You need to log in to make a purchase.");
    console.log("User not logged in, redirecting to login page...");
    window.location.href = "../../../Assets/pages/html/login.html";
    return; // Stop further execution
  }

  console.log("User is logged in. Proceeding to add purchase...");

  // User is logged in, proceed with Buy Now functionality
  const userEmail = user.email.replace('.', '_'); // Normalize email
  let purchases = JSON.parse(localStorage.getItem(`purchases_${userEmail}`)) || [];

  purchases.push({
    name: name,
    price: price,
    img: img,
    date: new Date().toISOString(),
  });

  // Save updated purchases to localStorage
  localStorage.setItem(`purchases_${userEmail}`, JSON.stringify(purchases));
  console.log("Purchase added to localStorage:", purchases);

  // Redirect to checkout page
  window.location.href = "../../../Assets/pages/html/checkout.html";
};
