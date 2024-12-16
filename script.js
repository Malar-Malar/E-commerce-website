
fetch('./product.json')
.then((response) => response.json())
.then((jsonData) => {
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
  })


