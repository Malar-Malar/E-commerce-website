// Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGtCmw3QskPI9jyB-BB5LHN3IkqhwPerk",
    authDomain: "bakery-shop-59e3c.firebaseapp.com",
    projectId: "bakery-shop-59e3c",
    storageBucket: "bakery-shop-59e3c.appspot.com",
    messagingSenderId: "144499188515",
    appId: "1:144499188515:web:53ea8d9b0eb845a45a6296",
    measurementId: "G-KEVGH6JRX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const wishlistContainer = document.getElementById("wishlist-container");
const logoutButton = document.getElementById("logout-btn");
const productList = document.getElementById("product-list");

// Normalize Email Function
function normalizeEmail(email) {
    return email.replace('.', '_');
}

// Fetch and Display User Data
const fetchUserData = async (user) => {
    console.log("Fetching user data for UID:", user.uid); // Log UID
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log("Fetched user data:", data); // Log the user data
                usernameElement.textContent = data.username || "N/A";
                emailElement.textContent = data.email || "N/A";
            });
        } else {
            console.error("No user data found for UID:", user.uid);
            usernameElement.textContent = "N/A";
            emailElement.textContent = "N/A";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        usernameElement.textContent = "Error loading data.";
        emailElement.textContent = "Error loading data.";
    }
};


// Display Wishlist Items
const displayWishlist = (userEmail) => {
  const wishlistKey = `wishlist_${normalizeEmail(userEmail)}`;
  const wishlistItems = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  wishlistContainer.innerHTML = `<h3>Your Wishlist</h3>`;

  if (wishlistItems.length === 0) {
    wishlistContainer.innerHTML += `<p>Your wishlist is empty.</p>`;
    return;
  }

  wishlistItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("wishlist-item");

    // Check if all the required fields (image, name, price, rating) are present before displaying
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="wishlist-img">
      <p class="product-name"><strong>${item.name}</strong></p>
      <p class="product-price">Price: ${item.price}</p>
      <p class="product-rating">Rating: ${item.rating}</p>
      <button class="Button">Add to Cart</button>
      <button type="button" class="Buttons">Buy Now</button>
    `;

    wishlistContainer.appendChild(itemDiv);
  });

  console.log("Wishlist Items:", wishlistItems); // Log the wishlist items for debugging
};

// Authentication State Listener
onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed. User:", user); // Log user state
    if (user) {
        const userEmail = user.email.replace('.', '_');
        console.log("User is signed in. Email:", userEmail);
        await fetchUserData(user);
        displayWishlist(user.email);
    } else {
        console.warn("No user is signed in.");
        window.location.href = "../../../Assets/pages/html/login.html"; // Redirect to login
    }
});




// Logout Functionality
logoutButton.addEventListener("click", () => {
    console.log("Logging out user..."); // Log logout attempt
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
            alert("Logged out successfully!");
            window.location.href = "../../../index.html";
        })
        .catch((error) => {
            console.error("Sign out error:", error.message);
            alert("Error during logout. Please try again.");
        });
});

// Load products and wishlist
loadProducts(); 
