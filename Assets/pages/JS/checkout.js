document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Capture user inputs
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();
  const address = document.getElementById('customer-address').value.trim();
  const country = document.getElementById('customer-country').value.trim();
  const state = document.getElementById('customer-state').value.trim();
  const paymentMethod = document.getElementById('payment-method').value;

  const emailError = document.getElementById('emailError');
  emailError.textContent = ""; // Clear previous error messages

  // Enhanced email validation regex
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if email contains invalid patterns
  if (email.includes('@@') || email.includes('.com.com') || email.includes('.net.net') || email.includes("gmail.com.gmail.com") || email.includes("gmail.comgmail.com")) {
    emailError.textContent = "Enter a valid email address";
    return;
  }

  // Check for duplicate domains (e.g., gmail.comgmail.com)
  const domainPattern = /\b([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b.*\1\b/;
  if (domainPattern.test(email)) {
    emailError.textContent = "Email address cannot contain duplicate domains.";
    return;
  }

  // Validate against email format
  if (!emailPattern.test(email) || email.length > 255) {
    emailError.textContent = "Please enter a valid email address (max 255 characters).";
    return;
  }

  // Check for empty fields
  if (!name || !email || !address || !country || !state || !paymentMethod) {
    alert('Please fill out all fields.');
    return;
  }

  // Retrieve cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("currentOrder")) || [];

  // Log cart data to verify if it's correctly stored
  console.log('Cart Data:', cart);

  // If cart is empty, show an alert
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  // Save purchase details to localStorage
  const purchaseDetails = {
    name,
    email,
    address,
    country,
    state,
    paymentMethod,
    date: new Date().toISOString(),
  };

  const userEmail = email.replace(/\./g, "_");
  const ordersKey = `purchases_${userEmail}`;

  // Retrieve existing orders or initialize with an empty array
  const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  // Log existing orders for debugging
  console.log('Existing Orders:', existingOrders);

  // Create the updated orders array with user info and cart items
  const updatedOrders = [
    ...existingOrders,
    ...cart.map(item => ({
      productName: item.name,  // Include the product name
      productImage: item.img,  // Include the product image
      productPrice: item.price,  // Include the product price
      productQuantity: item.quantity,  // Include the product quantity
      ...purchaseDetails,  // Add user details (name, email, etc.)
    }))
  ];

  // Log updated orders for debugging
  console.log('Updated Orders:', updatedOrders);

  // Save updated orders to localStorage
  localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));

  // Clear the cart after processing the order
  localStorage.removeItem("currentOrder");

  // Debugging logs
  console.log("Cart after clearing:", localStorage.getItem("currentOrder"));

  // Redirect to success page
  window.location.href = '../../../Assets/pages/html/successful.html';
});
