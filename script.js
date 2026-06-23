/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQty = 0;

    cart.forEach(item => {
        totalQty += item.quantity;
    });

    let countElement = document.getElementById("cart-count");
    let floatingCount = document.getElementById("floating-cart-count");

    if(countElement){
        countElement.innerText = totalQty;
    }

    if(floatingCount){
        floatingCount.innerText = totalQty;
    }
}

/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.quantity += 1;
    }
    else{
        cart.push({
            name:name,
            price:price,
            image:image,
            quantity:1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}

/* =========================
   LOAD CART
========================= */

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartContainer =
        document.getElementById("cart-items");

    if(!cartContainer) return;

    let total = 0;
    let totalItems = 0;

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `
        <div class="empty-cart">
            <h2>Your Cart is Empty 🛒</h2>
            <p>Add products to continue shopping.</p>
        </div>
        `;

        document.getElementById("total-price").innerText = "₹0";
        document.getElementById("total-items").innerText = "0";

        return;
    }

    cart.forEach((item,index)=>{

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;
        totalItems += item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p class="cart-price">
                    ₹${item.price}
                </p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">
                    -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">
                    +
                    </button>

                </div>

                <p>
                    Subtotal :
                    ₹${itemTotal}
                </p>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">
            Remove
            </button>

        </div>
        `;
    });

    document.getElementById("total-price")
        .innerText = "₹" + total;

    document.getElementById("total-items")
        .innerText = totalItems;

    updateCartCount();
}

/* =========================
   QUANTITY +
========================= */

function increaseQty(index){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

/* =========================
   QUANTITY -
========================= */

function decreaseQty(index){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

/* =========================
   CLEAR CART
========================= */

function clearCart(){

    if(confirm("Clear entire cart?")){

        localStorage.removeItem("cart");

        loadCart();

        updateCartCount();
    }
}

/* =========================
   WHATSAPP CHECKOUT
========================= */

function checkoutWhatsApp(){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){

        alert("Cart is empty!");

        return;
    }

    let customerName =
        document.getElementById("customerName")?.value || "";

    let customerPhone =
        document.getElementById("customerPhone")?.value || "";

    let customerAddress =
        document.getElementById("customerAddress")?.value || "";

    let message =
        "🛍️ ANUROHI FASHION ORDER%0A%0A";

    if(customerName){
        message +=
        "Name : " + customerName + "%0A";
    }

    if(customerPhone){
        message +=
        "Phone : " + customerPhone + "%0A";
    }

    if(customerAddress){
        message +=
        "Address : " + customerAddress + "%0A";
    }

    message += "%0AORDER ITEMS:%0A";

    let total = 0;

    cart.forEach(item => {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        message +=
        item.name +
        " x " +
        item.quantity +
        " = ₹" +
        itemTotal +
        "%0A";
    });

    message +=
    "%0A💰 Total Amount : ₹" +
    total;

    window.open(
    "https://wa.me/918477075633?text=" + message,
    "_blank"
    );
}

/* =========================
   PRODUCT SEARCH
========================= */

function searchProducts(){

    let input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        let title =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

        if(title.includes(input)){
            product.style.display = "";
        }
        else{
            product.style.display = "none";
        }
    });
}

/* =========================
   PAGE LOAD
========================= */

window.onload = function(){

    updateCartCount();

    if(document.getElementById("cart-items")){
        loadCart();
    }
};