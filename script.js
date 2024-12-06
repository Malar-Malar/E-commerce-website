const jsonData={
    "products":[
        {           
        "name": "Chocolate Mould",
        "image": "./Assets/images/mould_img1.jpg",
        "link":  "./Assets/pages/html/chocolate-mould_page.html"
        },
        {
         "name": "stand mixers",
          "image": "./Assets/images/stand_mixers1.jpg",
          "link":"./Assets/pages/html/stand_mixers.html"
        },
        {
          "name":"Piping bags & Nozzile",
          "image": "./Assets/images/nozzile_img3.jpg",
          "link": "./Assets/pages/html/pipping&nozzile_page.html"
        },
        {
          "name":"Bread & Cake tins",
          "image": "./Assets/images/bread_tin5.jpg",
          "link": "./Assets/pages/html/Tin.html"
        },
        {
          "name": "Packaging Box",
          "image": "./Assets/images/packaging_box9.jpg",
          "link": "./Assets/pages/html/boxes.html"
        },
        {
          "name": "Ingredients",
          "image": "./Assets/images/maida_img.jpg",
          "link":"./Assets/pages/html/ingredient.html"
        },
        {
          "name": "Cake Toppers",
          "image": "./Assets/images/cake_topper1.jpg",
          "link": "./Assets/pages/html/cakeTopper_page.html"
        },
        {
          "name": "Kitchenware",
          "image": "./Assets/images/proof_ring1.jpg",
          "link": "./Assets/pages/html/kitchenware.html"
        }
    ]
};


const jsonDatas={
   "product":[
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {
        "id":2,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/oven_img.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$29000"
      },
      {
        "id":3,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      { 
        "id":4,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      { "id":5,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {  
        "id":6,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      { "id":7,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      { "id":8,
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "standmixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      }

   ]
}



const productList = document.getElementById("product-list");
if (productList) {
    jsonData.products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <button type="button" onclick="location.href='${product.link}'">Click More Product</button>
        `;
        productList.appendChild(productDiv);
    });
}

const best_seller = document.getElementById("best_seller");
if (best_seller) {
    jsonDatas.product.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("products");
        productDiv.innerHTML = `
            <p class="seller">Best Seller</p>
            <img src="${product.image}" alt="Add to Wishlist" class="Wishlist-img">
            <img src="${product.image1}" alt="Product Image ${index + 1}" class="products-images">
            <p class="name">${product.name}</p?
            <img src="${product.image2}" alt="Star Rating" class="stars_rating">
            <p>Price: ${product.price}</p>
        `;
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("button");
        addToCartButton.addEventListener("click", () => addToCart(`Product ${index + 1}`, product.image1, product.price, "#"));
        productDiv.appendChild(addToCartButton);

        const buyNowButton = document.createElement("button");
        buyNowButton.textContent = "Buy Now";
        buyNowButton.classList.add("buttons");
        productDiv.appendChild(buyNowButton);

        best_seller.appendChild(productDiv);
    });
}



