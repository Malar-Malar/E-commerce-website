
fetch('../../../Assets/pages/json/cakeTopper.json')
  .then(response => response.json())
  .then(jsonData => {
    

  // Get the container for all products
  const productList = document.getElementById("product-list");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("products");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="Wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="cake_topper_img" class="products-images">
          
          <!-- Star Rating -->
          <img src="${product.image2}" alt="rating" class="stars_rating">
          
          <!-- Product Price -->
          <p>Price: ${product.price}</p>
          
          
      `;
      // Add "Add to Cart" button
      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.classList.add("button");
      addToCartButton.addEventListener("click", () => {
        addToCart(`Product ${index + 1}`, product.image1, product.price, "#");
      });
      productDiv.appendChild(addToCartButton);

      // Add "Buy Now" button
      const buyNowButton = document.createElement("button");
      buyNowButton.textContent = "Buy Now";
      buyNowButton.classList.add("buttons");
      productDiv.appendChild(buyNowButton);

      // Append the product to the container
      productList.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching the product data:", error);
  });

  const isUserLoggedIn = () => {
    return localStorage.getItem('userLoggedIn') === 'true';
  };
  
   function addToCart(name, image, price, link) {
     const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
     if (!isLoggedIn) {
         alert('You need to be logged in to add items to your cart.');
         window.location.href="./Assets/pages/html/login.html";
         return;
     }
  
     // Get cart data from localStorage
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
     // Check if product already exists in cart
     const existingItem = cart.find(item => item.name === name);
     if (existingItem) {
         alert(`${name} is already in your cart!`);
     } else {
         // Add new product to cart
         const product = { name, image, price, link, quantity: 1 };
         cart.push(product);
         localStorage.setItem('cart', JSON.stringify(cart));
         alert(`${name} has been added to your cart!`);
     }
   }
  
   
  
   function login(username, password) {
    // Replace this with actual authentication logic
    if (username === 'user' && password === 'password') {
        localStorage.setItem('userLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = './index.html'; // Redirect to the main page
    } else {
        alert('Invalid login credentials!');
    }
  }
  
  // Simulated logout functionality
  function logout() {
    localStorage.removeItem('userLoggedIn');
    alert('You have been logged out.');
    window.location.href = ''; // Redirect to login page
  }
  
  
   // Function to load cart items in cart.html
   function loadCart() {
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
     const cartContainer = document.getElementById('cart-container');
     
     if (!cartContainer) return;
  
     if (cart.length === 0) {
         cartContainer.innerHTML = '<p>Your cart is empty!</p>';
         return;
     }
  
     cartContainer.innerHTML = ''; // Clear existing items
  
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
                 <button onclick="removeFromCart(${index})">Remove</button>
             </div>
         `;
  
         cartContainer.appendChild(productDiv);
  
         totalPrice += parseFloat(product.price.slice(1)) * product.quantity;
     });
  
     const totalDiv = document.createElement('div');
     totalDiv.classList.add('cart-total');
     totalDiv.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
     cartContainer.appendChild(totalDiv);
   }
  
   function removeFromCart(index) {
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
     cart.splice(index, 1); // Remove item by index
     localStorage.setItem('cart', JSON.stringify(cart));
     loadCart(); // Reload the cart page
   }
  
  
  