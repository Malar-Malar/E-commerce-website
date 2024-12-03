//  JSON data for products
const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/baking_powder.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$29"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/baking_soda.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$32"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/brown_sugar.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$79"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/flour_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$39"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/food_colour_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$22"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/food_colour_img2.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$20"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/food_colour_img3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$25"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/food_colour_img4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$30"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/gluten_img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$299"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/milk_maid_img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$147"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/oil.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$60"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/salt_img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$19"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/sprinkles_img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$300"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/sugar.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$29"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/whipping_img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$220"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/yeast_img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$300"
        }
        
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("Ingredient_container");

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

