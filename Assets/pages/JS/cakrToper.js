// JSON data for products
const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/cakeTopper_img2.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$39"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$100"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$79"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/cakeTopper_img5.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$110"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/cakeTopper_img6.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$60"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img7.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$139"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img8.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$120"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$99"
        }
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("cakeTopper-container");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="cake_topper_img" class="product-image">
          
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

