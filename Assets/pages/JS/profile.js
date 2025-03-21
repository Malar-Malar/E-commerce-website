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
  measurementId: "G-KEVGH6JRX7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const logoutButton = document.getElementById("logout-btn");
const ordersList = document.getElementById("orders-list");

// Fetch and Display User Data
const fetchUserData = async (user) => {
  console.log("Fetching user data for UID:", user.uid);
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Fetched user data:", data);
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

// Authentication State Listener
onAuthStateChanged(auth, async (user) => {
  console.log("Auth state changed. User:", user);
  if (user) {
    const userEmail = user.email.replace(".", "_");
    console.log("User is signed in. Email:", userEmail);
    await fetchUserData(user);
    loadOrderHistory(user.email); // Load Order History after user login
  } else {
    console.warn("No user is signed in.");
    window.location.href = "../../../Assets/pages/html/login.html"; // Redirect to login
  }
});

// Logout Functionality
logoutButton.addEventListener("click", () => {
  console.log("Logging out user...");
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

// Normalize Email Function
function normalizeEmail(email) {
  return email.replace(".", "_");
}

// Function to load order history
function loadOrderHistory() {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to view your order history.");
    window.location.href = "../../../Assets/pages/html/login.html";
    return;
  }

  const userEmail = normalizeEmail(user.email); // Normalize email
  const ordersKey = `purchases_${userEmail}`;
  let orderHistory = JSON.parse(localStorage.getItem(ordersKey)) || [];

  console.log("Order History Retrieved:", orderHistory);

  ordersList.innerHTML = ""; // Clear existing content

  if (orderHistory.length === 0) {
    ordersList.innerHTML = "<p>No orders found.</p>";
    return;
  }

  // Display each order with name, price, date, time, and remove button
  orderHistory.forEach((order, index) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order");

    // Check if the order contains a list of products (array) or a single product
    if (order.products && Array.isArray(order.products)) {
      // Handle orders with multiple products
      orderDiv.innerHTML = `
        <div class="order-details">
          ${order.products.map(product => `
            <div class="product-item">
              <img src="${product.productImage}" alt="${product.productName}" class="order-img">
              <p><strong>${product.productName}</strong></p>
              <p>Price: ${product.productPrice}</p>
              <p>Quantity: ${product.productQuantity}</p>
              <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
            </div>
          `).join('')}
          <p><strong>Total Amount: ₹${order.totalAmount}</strong></p>
          
        </div>
      `;
    } else {
      // Handle orders with a single product
      orderDiv.innerHTML = `
        <div class="order-details">
          <img src="${order.productImage}" alt="${order.productName}" class="order-img">
          <p><strong>${order.productName}</strong></p>
          <p>Price: ${order.productPrice}</p>
          <p>Quantity: 1</p>
          <p>Date: ${new Date(order.date).toLocaleDateString()}</p>

          <p><strong>Total Amount: ${order.productPrice}</strong></p>
        </div>
      `;
    }

    // Add event listener to remove button
    // const removeButton = orderDiv.querySelector(".remove-btn");
    // removeButton.addEventListener("click", () => {
    //   removeOrder(index); // Remove the order at this index
    // });
    // <button type="button" class="remove-btn" data-index="${index}">Delete</button>

    ordersList.appendChild(orderDiv);
  });
}

// // Function to remove order from history
// function removeOrder(index) {
//   const user = auth.currentUser;

//   if (!user) {
//     alert("Please log in to remove an order.");
//     window.location.href = "../../../Assets/pages/html/login.html";
//     return;
//   }

//   const userEmail = normalizeEmail(user.email); // Normalize email
//   const ordersKey = `purchases_${userEmail}`;
//   let orderHistory = JSON.parse(localStorage.getItem(ordersKey)) || [];

//   // Remove the order at the specified index
//   orderHistory.splice(index, 1);

//   // Update localStorage with the updated order history
//   localStorage.setItem(ordersKey, JSON.stringify(orderHistory));
//   console.log("Order removed. Updated order history:", orderHistory);

//   // Reload order history to update the UI
//   loadOrderHistory();
// }
