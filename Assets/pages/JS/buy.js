import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Function to normalize email for localStorage key
function normalizeEmail(email) {
  return email.replace(".", "_");
}

// Handle user state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadBuyNowProduct(user.email);
  } else {
    window.location.href = "../../../Assets/pages/html/login.html";
  }
});

function loadBuyNowProduct(email) {
  const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));

  if (!buyNowProduct) {
    console.error("No product found for 'Buy Now'.");
    return;
  }

  const productsList = document.getElementById("products-list");
  productsList.innerHTML = `
    <div class="product-item">
      <img src="${buyNowProduct.img}" alt="${buyNowProduct.name}" style="width: 50px; height: 50px;">
      <p><strong>${buyNowProduct.name}</strong></p>
      <p>Price: <span id="total-price">${buyNowProduct.price}</span></p>
     
    </div>
  `;

 

  setupBillingForm(email, buyNowProduct);
}



function saveOrderToLocalHistory(email, orderDetails) {
  const userEmail = normalizeEmail(email);
  const ordersKey = `purchases_${userEmail}`;
  let orderHistory = JSON.parse(localStorage.getItem(ordersKey)) || [];
  orderHistory.push(orderDetails);
  localStorage.setItem(ordersKey, JSON.stringify(orderHistory));
}

function setupBillingForm(userEmail, product) {
  const paymentForm = document.getElementById("payment-form");

  paymentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const pincode = document.getElementById("pincode").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.getElementById("payment-method").value;

    const orderDetails = {
      productName: product.name,
      productPrice: product.price,
      productImage: product.img,
      billingInfo: { firstName, lastName, address, city, state, pincode, phone, email },
      paymentInfo: { method: paymentMethod },
      date: new Date().toISOString(),
    };

    if (paymentMethod === "credit-card" || paymentMethod === "debit-card") {
      orderDetails.paymentInfo.cardNumber = document.getElementById("card-number").value;
      orderDetails.paymentInfo.expiryDate = document.getElementById("expiry-date").value;
      orderDetails.paymentInfo.cvv = document.getElementById("cvv").value;
    }

    try {
      const orderRef = doc(collection(db, "users", normalizeEmail(userEmail), "orders"));
      await setDoc(orderRef, orderDetails);

      // Save order to localStorage
      saveOrderToLocalHistory(userEmail, orderDetails);

      localStorage.removeItem("buyNowProduct");
      showMessage("Order placed successfully!", "success");

      setTimeout(() => {
        window.location.href = "../../../index.html";
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      showMessage("Failed to place the order. Please try again later.", "error");
    }
  });

  document.getElementById("payment-method").addEventListener("change", function () {
    const cardDetails = document.getElementById("card-details");
    if (this.value === "credit-card" || this.value === "debit-card") {
      cardDetails.style.display = "block";
    } else {
      cardDetails.style.display = "none";
    }
  });

  document.getElementById("card-details").style.display = "none";
}

function showMessage(message, type) {
  const container = document.getElementById("message-container");
  if (!container) {
    console.error("Message container not found");
    return;
  }

  // Clear any previous message and set new content
  container.textContent = message;

  // Add styling class based on the type
  container.className = `message ${type}`; // e.g., "message success" or "message error"

  // Ensure visibility
  container.style.display = "block";

  // Hide the message after 3 seconds
  setTimeout(() => {
    container.style.display = "none";
  }, 3000);
}

