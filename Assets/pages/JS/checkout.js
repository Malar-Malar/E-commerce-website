
    import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

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

    function renderCheckoutPage() {
      const order = JSON.parse(localStorage.getItem("currentOrder"));
      console.log("Retrieved currentOrder:", order); // Debugging log

      const checkoutList = document.getElementById("products-list");
      if (!checkoutList) return;

      checkoutList.innerHTML = "";

      if (!order || order.length === 0) {
        checkoutList.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      let totalAmount = 0;

      order.forEach((item) => {
        console.log("Processing item:", item); // Debugging log

        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
        const itemTotal = itemPrice * item.quantity;
        totalAmount += itemTotal;

        const itemHTML = `
          <div class="checkout-item">
            <img src="${item.img}" alt="${item.name}" class="checkout-item-img"
                 onerror="this.src='../../../Assets/images/placeholder.png'">
            <p>Name: ${item.name}</p>
            <p>Price: ₹${itemPrice.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: ₹${itemTotal.toFixed(2)}</p>
          </div>
        `;

        checkoutList.innerHTML += itemHTML;
      });

      const totalAmountDiv = document.createElement("div");
      totalAmountDiv.classList.add("total-amount");
      totalAmountDiv.innerHTML = `<h3>Total Amount: ₹${totalAmount.toFixed(2)}</h3>`;
      checkoutList.appendChild(totalAmountDiv);
    }

    function handleOrderConfirmation(event) {
      event.preventDefault(); // Prevent the form from submitting normally

      const order = JSON.parse(localStorage.getItem("currentOrder"));
      if (!order || order.length === 0) {
        alert("No items in your cart.");
        return;
      }

      // Save the order to localStorage or a database
      console.log("Order confirmed:", order); // Debugging log

      // Clear the cart after placing the order
      localStorage.removeItem("currentOrder");

      // Optionally, you can redirect the user to an order confirmation page or show a success message
      alert("Your order has been placed successfully!");
      location.href = "../../../Assets/pages/html/successful.html"; // Redirect to a confirmation page
    }

    window.onload = function () {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          alert("Please log in to proceed.");
          return;
        }

        // Render the checkout page
        renderCheckoutPage();

        // Attach event listener for the form submission
        const paymentForm = document.getElementById("payment-form");
        if (paymentForm) {
          paymentForm.addEventListener("submit", handleOrderConfirmation);
        }
      });
    };
  
