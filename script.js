// Get Elements

const productsContainer =
document.getElementById("productsContainer");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");


// Display Products

function displayProducts(items){

    if(!productsContainer) return;

    productsContainer.innerHTML = "";

    items.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}"
                 onclick="showProduct(${product.id})">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">

                Add To Cart

            </button>

        </div>

        `;
    });
}


// Initial Products

if(productsContainer){

    displayProducts(products);

}


// Search

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        filterProducts();

    });
}


// Category Filter

if(categoryFilter){

    categoryFilter.addEventListener("change", () => {

        filterProducts();

    });
}


// Filter Function

function filterProducts(){

    const searchText =
    searchInput.value.toLowerCase();

    const selectedCategory =
    categoryFilter.value;

    const filteredProducts =
    products.filter(product => {

        const matchesSearch =
        product.name.toLowerCase()
        .includes(searchText);

        const matchesCategory =
        selectedCategory === "All"
        || product.category === selectedCategory;

        return matchesSearch
        && matchesCategory;

    });

    displayProducts(filteredProducts);

}


// Shopping Cart

let cart =
JSON.parse(localStorage.getItem("cart")) || [];


// Add To Cart

function addToCart(id){

    const selectedProduct =
    products.find(product => product.id === id);

    const existingProduct =
    cart.find(item => item.id === id);

    if(existingProduct){

        existingProduct.quantity += 1;

    }
    else{

        selectedProduct.quantity = 1;

        cart.push(selectedProduct);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    showToast();

}


// Toast

function showToast(){

    const toast =
    document.getElementById("toast");

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);

}


// Product Popup

function showProduct(id){

    const product =
    products.find(item => item.id === id);

    document.getElementById("productModal")
    .style.display = "flex";

    document.getElementById("modalImage")
    .src = product.image;

    document.getElementById("modalTitle")
    .innerHTML = product.name;

    document.getElementById("modalPrice")
    .innerHTML = `₹${product.price}`;

}


// Close Modal

const closeModal =
document.getElementById("closeModal");

if(closeModal){

    closeModal.addEventListener("click", () => {

        document.getElementById("productModal")
        .style.display = "none";

    });

}


// Dark Mode

const darkModeToggle =
document.getElementById("darkModeToggle");

if(darkModeToggle){

    darkModeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}