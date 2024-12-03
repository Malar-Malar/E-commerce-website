const API = "https://fakestoreapi.com/products";
const productsContainer = document.querySelector(".products-container");
const spinner = document.querySelector("#loading");
const cartCount = document.querySelector("#cartCount");

//Initialise the Cart array
const storedCartItems = JSON.parse(localStorage.getItem("cart"));

let cart = storedCartItems ? storedCartItems : [];
cartCount.textContent = cart.length;
console.log(cart);
async function fetchDataAndDisplay() {
  try {
    // Fetching Data
    spinner.style.display = "inline-block";
    const response = await fetch(API);
    const data = await response.json();
    // console.log(data);
    // Display data
    displayUI(data);

    //ADD TO CART FUNCTIONALITY
    // Select all Cart Buttons
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    // Loop thru the btns
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const productId = +event.target.dataset.id;
        const product = data.find((product) => product.id === productId);
        cart.push(product);
        // Update the cart Count
        cartCount.textContent = cart.length;
        // Add Items to Local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        //Show Notification
        showNotification("Product Added to Cart");
      });
    });
  } catch (err) {
    console.log("Something went wrong", err);
  }
}

fetchDataAndDisplay();

function displayUI(data) {
  data.forEach((product) => {
    const productTemp = `
    <div class="product">
        <div class="product-image">
          <img
            src=${product.image}
            alt=""
          />
        </div>
        <p class="product-name">${product.title}</p>
        <div class="detail">
          <p>$${product.price}</p>
          <a href="detail.html?id=${product.id}">View Detail</a>
        </div>
        <button data-id=${product.id}  class="add-to-cart">Add to Cart</button>
      </div>
    `;
    spinner.style.display = "none";
    productsContainer.insertAdjacentHTML("beforeend", productTemp);
  });
}

function showNotification(message) {
  const note = document.querySelector(".note");
  note.textContent = message;
  note.style.left = "10px";
  setTimeout(() => {
    note.style.left = "-300px";
  }, 3000);
}