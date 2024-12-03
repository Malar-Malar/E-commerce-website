// JSON data for products
const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/packaging_box1.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$8"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box2.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$12"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$10"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/packaging_box4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$15"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box5.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$20"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box6.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$40"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box7.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$40"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box8.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$30"
        }
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("boxes-container");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="packaging_box_img" class="product-image">
          
          <!-- Star Rating -->
          <img src="${product.image2}" alt="rating" class="star_rating">
          
          <!-- Product Price -->
          <p>Price: ${product.price}</p>
          
          <!-- Buttons -->
          <button type="button" class="Button">Add to Cart</button>
          <button type="button" class="Buttons">Buy Now</button>
      `;
      
      productList.appendChild(productDiv);
  });

