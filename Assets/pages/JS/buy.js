// Define normalizeEmail function
function normalizeEmail(email) {
  return email.replace(/\./g, '_'); // Normalize email by replacing dots with underscores
}

// Add event listener to the form submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Capture user inputs from the form
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();
  const address = document.getElementById('customer-address').value.trim();
  const country = document.getElementById('customer-country').value.trim();
  const state = document.getElementById('customer-state').value.trim();
  const paymentMethod = document.getElementById('payment-method').value;

  const emailError = document.getElementById('emailError');
  emailError.textContent = ""; // Clear previous error messages

  // Email validation regex
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email) || email.length > 255) {
    emailError.textContent = "Please enter a valid email address (max 255 characters).";
    return;
  }

  if (!name || !email || !address || !country || !state || !paymentMethod) {
    alert('Please fill out all fields.');
    return;
  }

  // Retrieve the selected product details from sessionStorage
  const selectedProduct = JSON.parse(sessionStorage.getItem("selectedProduct"));

  if (!selectedProduct || !selectedProduct.productName || !selectedProduct.productPrice || !selectedProduct.productImage) {
    alert("No product selected. Redirecting to homepage.");
    window.location.href = '../../../index.html';
    return;
  }

  // Log customer details
  console.log("Customer Details: ", { name, email, address, country, state, paymentMethod });
  console.log("Selected Product Details: ", selectedProduct);

  // Normalize email for use in keys
  const userEmail = normalizeEmail(email);
  const ordersKey = `purchases_${userEmail}`;
  let orderHistory = JSON.parse(localStorage.getItem(ordersKey)) || [];

  // Create the order object with both product and customer details
  const order = {
    items: [selectedProduct], // Store the selected product in the order
    customerDetails: {
      name,
      email,
      address,
      country,
      state,
      paymentMethod,
    },
    date: new Date().toISOString(),
  };

  // Add the new order to the order history
  orderHistory.push(order);

  // Save updated order history in localStorage
  localStorage.setItem(ordersKey, JSON.stringify(orderHistory));

  // Clear the sessionStorage for the selected product
  sessionStorage.removeItem("selectedProduct");

  // Redirect to success page
  window.location.href = '../../../Assets/pages/html/successful.html';
});

// Function to validate and redirect based on selectedProduct
function validateSelectedProduct() {
  const selectedProduct = JSON.parse(sessionStorage.getItem("selectedProduct"));

  // Log the product details for debugging
  console.log("Validating selectedProduct from sessionStorage:", selectedProduct);

  if (!selectedProduct || !selectedProduct.productName || !selectedProduct.productPrice || !selectedProduct.productImage) {
    console.error("Invalid or missing selectedProduct in sessionStorage:", selectedProduct);
    alert("No product selected. Redirecting to homepage.");
    window.location.href = '../../../index.html';
    return null; // Return null if no valid product
  }

  return selectedProduct;
}


// Call the validation function on page load to ensure the product exists
document.addEventListener('DOMContentLoaded', () => {
  const selectedProduct = validateSelectedProduct();
  if (selectedProduct) {
    // Populate product details on the checkout page (if applicable)
    document.getElementById('product-name').textContent = selectedProduct.productName;
    document.getElementById('product-price').textContent = selectedProduct.productPrice;
    document.getElementById('product-image').src = selectedProduct.productImage;
  }
});
