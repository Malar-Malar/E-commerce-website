const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers2.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$9000"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/stand_mixers4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$8200"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/stand_mixers3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$5000"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/stand_mixers5.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$8500"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/stand_mixers1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$9000"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/stand_mixers6.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$32000"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/stand_mixers7.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$35000"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/stand_mixers8.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$9000"
        }
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("product-list");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("products");

      productDiv.innerHTML = `
          
           <img src="${product.image}" alt="wishlist_img" class="Wishlist-img">
        
          <!-- Product Image -->
           <img src="${product.image1}" alt="stand_mixer_img" class="products-images">
          
          <!-- Star Rating -->
           <img src="${product.image2}" alt="rating" class="stars_rating">
          
          <!-- Product Price -->
           <p>Price: ${product.price}</p> 
          
          <!-- Buttons -->
           <button type="button" class="button">Add to Cart</button>
          <button type="button" class="buttons">Buy Now</button>
      `;
      
      productList.appendChild(productDiv);
  });