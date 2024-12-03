// JSON data for products
const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/bread_tin2.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$100"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/bread_tin1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$159"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/bread_tin3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$899"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/bread_tin4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$299"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cake_tin1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$250"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cake_tin2.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$300"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cake_tin3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$180"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cake_tin4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$600"
        }
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("bread_tin_container");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="stand_mixer_img" class="product-image">
          
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

