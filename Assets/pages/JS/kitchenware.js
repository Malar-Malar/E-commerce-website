
fetch('../../../Assets/pages/json/kitchenware.json')
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
          <img src="${product.image1}" alt="kitchenware_img" class="products-images">
          
          <!-- Star Rating -->
          <img src="${product.image2}" alt="rating" class="stars_rating">
          
          <!-- Product Price -->
          <p>Price: ${product.price}</p>
          
          <!-- Buttons -->
          <button type="button" class="button">Add to Cart</button>
          <button type="button" class="buttons">Buy Now</button>
      `;
      
      productList.appendChild(productDiv);
  })
});

