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
  if (email.includes('@@') || email.includes('.com.com') || email.includes('.net.net')||email.includes("gmail.com.gmail.com")||email.includes("gmail.comgmail.com")) {
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

  // Save details to localStorage (for demo purposes)
  const purchaseDetails = {
    name,
    email,
    address,
    country,
    state,
    paymentMethod,
    date: new Date().toISOString(),
  };

  localStorage.setItem('recentPurchase', JSON.stringify(purchaseDetails));

  // Redirect to success page
  window.location.href = '../../../Assets/pages/html/successful.html';
});
