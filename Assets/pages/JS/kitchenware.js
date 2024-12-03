// JSON data for products
const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/bread_proofing_img1.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$1200"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/bread_proofing_img2.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$1500"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/decora_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$150"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/measuring-cup-set.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$150"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/measuring_spoon.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$100"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/palette_knife_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$300"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/ring-img.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$329"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/silicon_brush_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$50"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/spatula_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$70"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/whisk_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$100"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/wooden_board.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$600"
        }
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("kitchenware_container");

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="kitchenware_img" class="product-image">
          
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

