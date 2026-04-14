//hamburger

const hamburger = document.querySelector(".ri-menu-line");
const menu = document.querySelector(".menu");

//popup menu if small resolution can
//activated on clicked hamburger bar
hamburger.addEventListener("click", () => {
    menu.classList.toggle("menu-active");
}); 
//pop up menu remove if user is scrolling the website
window.onscroll = () => {
    menu.classList.remove("menu-active");
};

//fart elemnts
const cartBtn = document.getElementById("cart-btn");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");
const addCartBtns = document.querySelectorAll(".add-cart");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector("cart-count")
const subtotalEl = document.querySelector(".subtotal");

let cartData = [];

//fart openclose
cartBtn.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// add to cart but there is no cart
addCartBtns.forEach((btn) => {
    btn.addEventListener("click", => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        const existingItem = cartData.find((item) => item.name === name);

        if(existingItem) {
            existingItem.qty++;
        } else {
            cartData.push({
                name: name,
                price: price,
                qty: 1,
            })
        }
    })
})