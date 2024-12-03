// JSON data for products
const jsonData = {
    "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/piping_bag1.jpg",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$9000"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/piping_bag2.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$8200"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/nozzile_img1.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$5000"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/nozzile_img2.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$8500"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/nozzile_img3.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$9000"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/nozzile_img4.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$32000"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/nozzile_img5.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$35000"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/nozzile_img6.jpg",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "$9000"
        }
        

    ]
  };

  // Get the container for all products
  const productList = document.getElementById("piping_product_container" );

  // Loop through the products and generate product cards
  jsonData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
          <!-- Wishlist Icon -->
          <img src="${product.image}" alt="wishlist_img" class="wishlist-img">
          
          <!-- Product Image -->
          <img src="${product.image1}" alt="nozzile_img" class="product-image">
          
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

