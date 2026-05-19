// Get Elements

const productsContainer =
document.getElementById("productsContainer");

const wishlistContainer =
document.getElementById("wishlistContainer");

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

            <div class="buttons">

                <button onclick="addToCart(${product.id})">

                    Add To Cart

                </button>

                <button class="wishlist-btn"
                        onclick="addToWishlist(${product.id})">

                    ❤️

                </button>

            </div>

        </div>

        `;
    });
}


// Initial Products

if(productsContainer){

    displayProducts(products);

}


// Search Functionality

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


// Filter Products

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



// =======================
// CART
// =======================

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

    showToast("Product Added To Cart");

}



// =======================
// WISHLIST
// =======================

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


// Add To Wishlist

function addToWishlist(id){

    const selectedProduct =
    products.find(product => product.id === id);

    const existingWishlist =
    wishlist.find(item => item.id === id);

    if(existingWishlist){

        showToast("Already In Wishlist");

        return;
    }

    wishlist.push(selectedProduct);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    showToast("Added To Wishlist ❤️");

}



// Display Wishlist

if(wishlistContainer){

    displayWishlist();

}


function displayWishlist(){

    wishlistContainer.innerHTML = "";

    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `

        <h2>

            Wishlist Is Empty

        </h2>

        `;

        return;
    }

    wishlist.forEach((item, index) => {

        wishlistContainer.innerHTML += `

        <div class="product-card">

            <img src="${item.image}">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button onclick="removeWishlist(${index})">

                Remove

            </button>

        </div>

        `;
    });

}



// Remove Wishlist

function removeWishlist(index){

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();

    showToast("Removed From Wishlist");

}



// =======================
// TOAST
// =======================

function showToast(message){

    const toast =
    document.getElementById("toast");

    if(!toast) return;

    toast.innerHTML = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);

}



// =======================
// PRODUCT MODAL
// =======================

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



// =======================
// DARK MODE
// =======================

const darkModeToggle =
document.getElementById("darkModeToggle");

if(darkModeToggle){

    darkModeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}