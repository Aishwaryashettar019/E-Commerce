const productsContainer = document.getElementById("productsContainer");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");


// Display Products

function displayProducts(items){

    productsContainer.innerHTML = "";

    items.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button>Add to Cart</button>

        </div>

        `;
    });
}


// Initial Products

displayProducts(products);


// Search Functionality

searchInput.addEventListener("keyup", () => {

    filterProducts();

});


// Category Filter

categoryFilter.addEventListener("change", () => {

    filterProducts();

});


// Combined Filter Function

function filterProducts(){

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch = product.name
        .toLowerCase()
        .includes(searchText);

        const matchesCategory = selectedCategory === "All"
        || product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}