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
  return email.replace(/\./g, "_");
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    globalUserEmail = normalizeEmail(user.email);
    loadProducts();
  } else {
    currentUser = null;
    globalUserEmail = "guest";
    loadProducts();
  }
});

// Fetch and load products
function loadProducts() {
  fetch("../../../Assets/pages/json/boxes.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      showDetails(products);
    })
    .catch((error) => console.error("Error loading products:", error));
}

function showDetails(products) {
  const detail = document.querySelector(".detail");
  const productId = new URLSearchParams(window.location.search).get("id");
  const thisProduct = products.find((product) => product.id == productId);

  if (!thisProduct) {
    window.location.href = "../../../index.html";
    return;
  }

  // Populate product details
  detail.querySelector(".image img").src = thisProduct.image1;
  detail.querySelector(".name").innerText = thisProduct.name;
  detail.querySelector(".price").innerText = `${thisProduct.price}`;
  detail.querySelector(".description").innerText = thisProduct.description;

  // Add to Cart button
  detail.querySelector(".add-to-cart").onclick = () =>
    addToCart(thisProduct.name, thisProduct.price, thisProduct.image1);

  // Buy Now button
  detail.querySelector(".buy-now").onclick = () =>
    buyNow(thisProduct.name, thisProduct.price, thisProduct.image1);
}

window.buyNow = function buyNow(name, price, img) {
  if (!currentUser) {
    alert("You need to log in to proceed.");
    window.location.href = "../../../Assets/pages/html/login.html";
    return;
  }

  const productDetails = { name, price, img };
  localStorage.setItem("buyNowProduct", JSON.stringify(productDetails));
  window.location.href = "../../../Assets/pages/html/buy.html";
};

function addToCart(name, price, img) {
  const userEmail = normalizeEmail(globalUserEmail);
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
}
