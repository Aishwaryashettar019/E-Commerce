// Get Elements

const productsContainer = document.getElementById("productsContainer");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");


// Display Products

function displayProducts(items){

    if(!productsContainer) return;

    productsContainer.innerHTML = "";

    items.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">

                Add To Cart

            </button>

        </div>

        `;
    });
}


// Homepage Products

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
            product.name
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "All"
            || product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}



// ============================
// Shopping Cart
// ============================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Add To Cart

function addToCart(id){

    const selectedProduct =
        products.find(product => product.id === id);

    cart.push(selectedProduct);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product Added To Cart");

}


// Cart Elements

const cartContainer =
    document.getElementById("cartContainer");

const cartTotal =
    document.getElementById("cartTotal");


// Display Cart

if(cartContainer){

    displayCart();

}


function displayCart(){

    cartContainer.innerHTML = "";

    let total = 0;


    if(cart.length === 0){

        cartContainer.innerHTML =
            "<h3>Your cart is empty</h3>";

        cartTotal.innerHTML = "";

        return;
    }


    cart.forEach((item, index) => {

        total += item.price;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}"
                 width="120">

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <button onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;
    });

    cartTotal.innerHTML =
        `Total: ₹${total}`;

}



// Remove Item

function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}