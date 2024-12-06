// Fetch product data
fetch('../../../Assets/pages/json/boxes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(jsonData => {
    const productList = document.getElementById("product-list");

    jsonData.products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("products");

      productDiv.innerHTML = `
        <img src="${product.image}" alt="wishlist_img" class="Wishlist-img">
        <img src="${product.image1}" alt="packaging_box_img" class="products-images">
        <img src="${product.image2}" alt="rating" class="stars_rating">
        <p>Price: ${product.price}</p>
      `;

      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.classList.add("button");
      addToCartButton.addEventListener("click", () => {
        addToCart(`Product ${index + 1}`, product.image1, product.price, "#");
      });

      const buyNowButton = document.createElement("button");
      buyNowButton.textContent = "Buy Now";
      buyNowButton.classList.add("buttons");

      productDiv.appendChild(addToCartButton);
      productDiv.appendChild(buyNowButton);
      productList.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching product data:", error);
  });

// Check login status
const isUserLoggedIn = () => localStorage.getItem('userLoggedIn') === 'true';

// Add to cart functionality
function addToCart(name, image, price, link) {
  if (!isUserLoggedIn()) {
    alert('You need to be logged in to add items to your cart.');
    window.location.href = '../../../Assets/pages/html/login.html';
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    alert(`${name} is already in your cart!`);
  } else {
    const product = { name, image, price, link, quantity: 1 };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
  }
}

// Login functionality
function login(username, password) {
  if (username === 'user' && password === 'password') {
    localStorage.setItem('userLoggedIn', 'true');
    alert('Login successful!');
    window.location.href = './index.html';
  } else {
    alert('Invalid login credentials!');
  }
}

// Logout functionality
function logout() {
  localStorage.removeItem('userLoggedIn');
  alert('You have been logged out.');
  window.location.href = './Assets/pages/html/login.html';
}

// Load cart items in cart.html
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    return;
  }

  cartContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('cart-item');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: <span id="quantity-${index}">${product.quantity}</span></p>
      </div>
    `;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromCart(index));

    productDiv.appendChild(removeButton);
    cartContainer.appendChild(productDiv);

    const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    totalPrice += priceValue * product.quantity;
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);
}

// Remove item from cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}
