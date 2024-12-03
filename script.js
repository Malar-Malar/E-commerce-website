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
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/oven_img.jpg",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$29000"
      },
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },{
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$9000"
      },
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
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

function addToCart(name, image, price, link) {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('You need to be logged in to add items to your cart.');
        return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { name, image, price, link };
    if (!cart.find(item => item.name === name)) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} has been added to your cart!`);
    } else {
        alert(`${name} is already in your cart!`);
    }
}
