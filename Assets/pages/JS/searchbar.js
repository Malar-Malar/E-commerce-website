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
let globalUserEmail = "";

// Normalize email function
const normalizeEmail = (email) => email.replace('.', '_');

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    currentUser = user;
    globalUserEmail = normalizeEmail(user.email);
  } else {
    console.log("No user is logged in.");
    currentUser = null;
    globalUserEmail = "guest";
  }
});

// Array of JSON file paths
const jsonFiles = [
  '../../../Assets/pages/JSON/boxes.json',
  '../../../Assets/pages/JSON/cakeTopper.json',
  '../../../Assets/pages/JSON/mould.json',
  '../../../Assets/pages/JSON/ingredient.json',
  '../../../Assets/pages/JSON/kitchenware.json',
  '../../../Assets/pages/JSON/piping.json',
  '../../../Assets/pages/JSON/stand_mixers.json',
  '../../../Assets/pages/JSON/tin.json'
];

// Fetch products from multiple JSON files
async function fetchProducts() {
  const allProducts = [];

  try {
    for (let file of jsonFiles) {
      const response = await fetch(file);
      const data = await response.json();
      if (data.products) {
        allProducts.push(...data.products);
      } else {
        console.warn(`No products found in ${file}`);
      }
    }

    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", function () {
      searchProducts(allProducts);
    });

    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = '<p>Start typing to search for products...</p>';
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function displayProducts(products) {
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = "";

  products.forEach(product => {
    const name = product.name || "Unnamed Product";
    const price = product.price || "0.00";
    const image1 = product.image1 || "./default-image.jpg";

    console.log("Rendering product:", { name, price, image1 });

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <p class="product-name">${name}</p>
      <p class="price">${price}</p>
      <img src="${image1}" alt="Product Image">
      <button class="Button" onclick="addToCart('${name}', '${price}', '${image1}')">Add to Cart</button>
      <button class="btn" onclick="buyNow('${name}', '${price}', '${image1}')">Buy Now</button>
    `;

    itemsContainer.appendChild(productDiv);
  });
}


// Function to filter products based on search input
function searchProducts(products) {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase().trim();

  if (searchQuery === "") {
    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = '<p>Start typing to search for products...</p>';
    return;
  }

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name && product.name.toLowerCase().includes(searchQuery);
    const priceMatch = product.price && product.price.toLowerCase().includes(searchQuery);
    return nameMatch || priceMatch;
  });

  displayProducts(filteredProducts);

  if (filteredProducts.length === 0) {
    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = '<p>No products found.</p>';
  }
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

  const existingIndex = wishlistItems.findIndex(
    (item) => item.name === name && item.price === price
  );

  if (existingIndex > -1) {
    wishlistItems.splice(existingIndex, 1);
    alert(`${name} removed from your wishlist.`);
  } else {
    wishlistItems.push({ name, price, image });
    alert(`${name} added to your wishlist!`);
  }

  localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
};

function buyNow(name, price, image) {
  // Check if the user is logged in
  if (!currentUser) {
    alert("Please log in to proceed.");
    window.location.href = "../../../Assets/pages/html/login.html";
    return;
  }

  // Prepare product data for storing in sessionStorage
  const productDetails = {
    productName: name,
    productPrice: price,
    productImage: image,
    productQuantity: 1, // Default quantity is 1
    date: new Date().toISOString(), // Store current date
  };

  // Log the product details to ensure correctness
  console.log("Saving Selected Product to SessionStorage:", productDetails);

  // Store the product details in sessionStorage
  sessionStorage.setItem("selectedProduct", JSON.stringify(productDetails));

  // Redirect to the checkout page
  window.location.href = "../../../Assets/pages/html/buy.html";
}








// Call fetchProducts when the page loads
fetchProducts();
