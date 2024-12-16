// Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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

// Global Username Storage
let globalUsername = "";

// Fetch and Display User Data
const fetchUserData = async (user) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                usernameElement.textContent = data.username || "N/A";
                emailElement.textContent = data.email || "N/A";

                globalUsername = data.username; // Store username globally
                console.log("Fetched username:", globalUsername);

                displayWishlist(globalUsername); // Load wishlist
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

// Display Wishlist
const displayWishlist = (username) => {
    const wishlistKey = `wishlist_${username}`;
    const wishlistItems = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    console.log("Wishlist Key:", wishlistKey);
    console.log("Wishlist Data:", wishlistItems);

    wishlistContainer.innerHTML = `<h3>Your Wishlist</h3>`; // Reset container

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML += `<p>Your wishlist is empty.</p>`;
        return;
    }

    wishlistItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("wishlist-item");
        itemDiv.innerHTML = `
            <img src="${item.image1}" alt="${item.name}" style="width: 100px; height: 100px;">
            <p><strong>${item.name}</strong></p>
            <p>Price: ${item.price}</p>
        `;
        wishlistContainer.appendChild(itemDiv);
    });
};

// Authentication State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User authenticated:", user.uid);
        fetchUserData(user);
    } else {
        console.warn("No user is signed in.");
        window.location.href = "../../../Assets/pages/html/login.html"; // Redirect to login page
    }
});
