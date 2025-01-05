
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


// Array of JSON file paths
const jsonFiles = [
    '../../../Assets/pages/JSON/boxes.json',
    '../../../Assets/pages/JSON/cakeTopper.json',
    '../../../Assets/pages/JSON/chocolate-mould.json',
    '../../../Assets/pages/JSON/ingredient.json',
    '../../../Assets/pages/JSON/kitchenware.json',
    '../../../Assets/pages/JSON/pipingNozzile.json',
    '../../../Assets/pages/JSON/stand_mixers.json',
    '../../../Assets/pages/JSON/tin.json'
];

// Fetch products from multiple JSON files
async function fetchProducts() {
    const allProducts = [];

    try {
        // Fetch data from each JSON file and combine them
        for (let file of jsonFiles) {
            const response = await fetch(file);
            const data = await response.json();
            if (data.products) {
                allProducts.push(...data.products); // Combine products from all JSON files
            } else {
                console.warn(`No products found in ${file}`);
            }
        }

        // Add the search event listener after loading all products
        const searchBar = document.getElementById("searchBar");
        searchBar.addEventListener("input", function () {
            searchProducts(allProducts);
        });

        // Display an initial message or placeholder
        const itemsContainer = document.getElementById("items");
        itemsContainer.innerHTML = '<p>Start typing to search for products...</p>';
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Function to display products
function displayProducts(products) {
    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = ""; // Clear previous products

    // Loop through products and create HTML elements for each
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // Safeguard for missing image or price
        const image = product.image || './default-image.jpg'; // fallback image
        const name = product.name || 'Unnamed Product';
        const price = product.price || 'N/A';
        const image1 = product.image1 || './default-image.jpg'; // fallback image
        const image2 = product.image2 || './default-image.jpg'; // fallback image

        productDiv.innerHTML = `
            <img src="${image}" alt="Product Image" class="wishlist-img">
            <img src="${image1}" alt="Product Image" class="product-image">
            <p class="product-name">${name}</p>
            <img class="star_rating" src="${image2}" alt="Star Rating">
            <p class="price">${price}</p>
            <button class="Button" onclick="addToCart('${product.name}', '${product.price}', '${product.image1}')">Add to Cart</button>
             <button type="button" class="btn" onclick="buyNow('${product.name}', '${product.price}', '${product.image1}')">Buy Now</button>
        `;

        itemsContainer.appendChild(productDiv);
    });
}

// Function to filter products based on search input (name or price)
function searchProducts(products) {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase().trim();

    // If search query is empty, show a placeholder message
    if (searchQuery === "") {
        const itemsContainer = document.getElementById("items");
        itemsContainer.innerHTML = '<p>Start typing to search for products...</p>';
        return;
    }

    // Filter products based on search query (case-insensitive)
    const filteredProducts = products.filter(product => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchQuery);
        const priceMatch = product.price && product.price.toLowerCase().includes(searchQuery);
        return nameMatch || priceMatch; // Match by name OR price
    });

    // Display filtered products
    displayProducts(filteredProducts);

    // If no products are found, show a message
    if (filteredProducts.length === 0) {
        const itemsContainer = document.getElementById("items");
        itemsContainer.innerHTML = '<p>No products found.</p>';
    }
}

// Call fetchProducts when the page loads
fetchProducts();

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
  