// mmm chezburger

const hamburger = document.querySelector(".ri-menu-line");
const menu = document.querySelector(".menu");

// popup menu if small resolution can
// activated on clicked hamburger bar
hamburger.addEventListener("click", () => {
  menu.classList.toggle("menu-active");
});
// pop up menu remove if user scrolling the website
window.onscroll = () => {
  menu.classList.remove("menu-active");
};

// CART ELEMNTS
const cartBtn = document.getElementById("cart-btn");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");
const addCartBtns = document.querySelectorAll(".add-cart");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const subTotalEl = document.querySelector(".subtotal");

let cartData = [];

// fart open close
cartBtn.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// add to cart but there is no cart
addCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    const existingItem = cartData.find((item) => item.name === name);

    if (existingItem) {
      existingItem.qty++;
    } else {
      cartData.push({
        name: name,
        price: price,
        qty: 1,
      });
    }

    renderCart();
    cart.classList.add("active");
  });
});

// render fart (takes 4 days) aka DONT LET ME OPEN UP MY INNER HTML
function renderCart() {
  cartItems.innerHTML = "";
  let subtotal = 0;
  let totalQty = 0;

  cartData.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    totalQty += item.qty;

    cartItems.innerHTML += `
    <div class="cart-item">
      <div class="cart-item-top">
        <h4>${item.name}</h4>
        <span class="remove" onclick="removeItem(${index})">REMOVE</span>
      </div>

      <p class="price">Price: IDR ${item.price.toLocaleString()}</p>

      <div class="cart-item-bottom">
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, +1)">+</button>
        </div>

      <p class="item-total">
      Total: IDR ${itemTotal.toLocaleString()}
      </p>
      </div>
    </div>
    `;
  });

  subTotalEl.innerHTML = `IDR ${subtotal.toLocaleString()}`;
  cartCount.innerHTML = totalQty;
}

// change quantity (vs quality. THE ENDER DRAGON)
function changeQty(index, amount) {
    cartData[index].qty += amount;

    if (cartData[index].qty <= 0) {
        cartData.splice(index, 1);
    }

    renderCart();
}

// remove item (no jokes)
function removeItem(index) {
    cartData.splice(index, 1);
    renderCart();
}

// scroll
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        //down
        navbar.classList.add("hide");
    } else {
        //up
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;
});

// poop up product code

const detailBtn = document.querySelector(".hero a");
const popup = document.getElementById("popup");
const closePopup = document.querySelector(".close-popup");

const mainImage = document.getElementById("mainImg");
const thumbnailContainer = document.getElementById("thumbnailContainer");

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

// data hlkjdssytdf
const images = [
  "./assets/rubic.png",
  "./assets/marbles.png",
  "./assets/unostacko.jpg",
];

const productNames = [
  "Rubic Cube",
  "Marbles",
  "Uno Stacko",
];

let currentIndex = 0;

// open up poop
detailBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("active");
  loadImages();
  updateView();
});

// close now

closePopup.addEventListener("click", () => {
  popup.classList.remove("active");
});

//load thumbnail

function loadImages() {
  thumbnailContainer.innerHTML = "";

  images.forEach((img, index) => {
    const imageEl = document.createElement("img");
    imageEl.src = img;

    imageEl.addEventListener("click", () => {
      currentIndex = index;
      updateView();
    });

    thumbnailContainer.appendChild(imageEl);
  });
}

const productTitle = document.getElementById("productTitle");

// UPDATE 2.3: VIEW
function updateView() {
  mainImage.src = images[currentIndex];

  // UPDATE 2.4: PRODUCT
  productTitle.innerText = productNames[currentIndex];

  const thumbs = document.querySelectorAll(".popup-right img");
  thumbs.forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });

  btnPrev.style.display = currentIndex === 0 ? "none" : "block";
  btnNext.style.display = currentIndex === images.length - 1 ? "none" : "block";
}

// NEXT thing
btnNext.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateView();
  }
});

// PREV thing
btnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateView();
  }
});

// PLEASE update detail products js I NEED THIS


// check out code
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutPopup = document.getElementById("checkoutPopup");
const closeCheckout = document.querySelector(".close-checkout");
const payNow = document.getElementById("payNow");

// open checkout
checkoutBtn.addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("NO PRODUCTS?");
    return;
  }
  cart.classList.remove("active");
  checkoutPopup.classList.add("active");
});

// close checkout
closeCheckout.addEventListener("click", () => {
  checkoutPopup.classList.remove("active");
});

// iwfiuh now
payNow.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const number = document.getElementById("hp").value;
  const shipping = document.getElementById("shipping").value;

  if (!name || !address || !number) {
    alert("need data or else 93749")
    return;
  }

  //why is this case sensitive bro
  alert(`thank you for playing i mean checkout done smth
  Name : ${name}
  Shipping : ${shipping}
  Payment : ${selectedPayment.toUpperCase()}
  Total : ${subTotalEl.innerText}`);
  
  cartData = [];
  renderCart();
  checkoutPopup.classList.remove("active");
});

const paymentOptions = document.querySelectorAll(".payment-option");
let selectedPayment = "qris";

paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // thanos snap active
    paymentOptions.forEach((o) => o.classList.remove("active"));

    // active back or smth
    option.classList.add("active");

    //simpan pilihan liwe sfcaisdbjacwecbew
    selectedPayment = option.dataset.method;
  });
});