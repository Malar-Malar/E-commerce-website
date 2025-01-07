import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const wishlistContainer = document.getElementById("wishlist-container");
let currentUser = null;
let globalUserEmail = "";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    currentUser = user;
    globalUserEmail = normalizeEmail(user.email);
  } else {
    console.log("No user is logged in.");
    currentUser = null;
    globalUserEmail = "";
  }
});

function normalizeEmail(email) {
  return email.replace(/\./g, '_');
}

const safeParse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return [];
  }
};

const loadWishlist = () => {
  if (!currentUser) {
    wishlistContainer.innerHTML = `<p>Please log in to view your wishlist.</p>`;
    return;
  }

  const wishlistKey = `wishlist_${globalUserEmail}`;
  const wishlistItems = safeParse(wishlistKey);

  if (wishlistItems.length === 0) {
    wishlistContainer.innerHTML = `<p>Your wishlist is empty.</p>`;
    return;
  }

  wishlistContainer.innerHTML = ""; // Clear existing items
  wishlistItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("wishlist-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="wishlist-img">
      <p class="product-name"><strong>${item.name}</strong></p>
      <p class="product-price">Price: ${item.price}</p>
      <button class="Button" onclick="addToCart('${item.name}', '${item.price}', '${item.image}')">Add to Cart</button>
      <button type="button" class="Buttons" onclick="buyNow('${item.name}', '${item.price}', '${item.image}')">Buy Now</button>
      <button onclick="removeFromWishlist('${item.name}', '${item.price}')" class="remove">Remove</button>
    `;
    wishlistContainer.appendChild(itemDiv);
  });
};



// Remove item from wishlist
window.removeFromWishlist = (name, price) => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in to remove items from your wishlist.");
    return;
  }

  const userEmail = normalizeEmail(user.email);
  const wishlistKey = `wishlist_${userEmail}`;
  let wishlistItems = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  // Remove the item
  wishlistItems = wishlistItems.filter((item) => item.name !== name || item.price !== price);

  // Save updated wishlist
  localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));

  // Reload the wishlist
  loadWishlist();
};

// Load wishlist on page load
auth.onAuthStateChanged((user) => {
  if (user) {
    loadWishlist();
  } else {
    wishlistContainer.innerHTML = `<p>Please log in to view your wishlist.</p>`;
  }
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
  window.location.href = "../../../Assets/pages/html/buy.html";
};


