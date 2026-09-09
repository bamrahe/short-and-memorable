// NAVBAR HAMBURGER

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
const subtotalEl = document.querySelector(".subtotal");

let cartData = [];

// Cart Open/Close
cartBtn.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Add to Cart
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

// Render Cart
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

  subtotalEl.innerHTML = `IDR ${subtotal.toLocaleString()}`;
  cartCount.innerHTML = totalQty;
}

// Change Quantity
function changeQty(index, amount) {
  cartData[index].qty += amount;

  if (cartData[index].qty <= 0) {
    cartData.splice(index, 1);
  }

  renderCart();
}

// Remove Item
function removeItem(index) {
  cartData.splice(index, 1);
  renderCart();
}

// Scroll Navbar
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // scroll kebawah
    navbar.classList.add("hide");
  } else {
    // scroll ke atas
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

// POP UP DETAILS PRODUCT CODE

const detailBtn = document.querySelector(".hero a");
const popup = document.getElementById("popup");
const closePopup = document.querySelector(".close-popup");

const mainImage = document.getElementById("mainImg");
const thumbnailContainer = document.getElementById("thumbnailContainer");

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

// DATA GAMBAR
const images = [
  "./assets/jaket1.jpg",
  "./assets/jaket2.jpg",
  "./assets/jaket3.jpg",
  "./assets/jaket4.png",
  "./assets/jaket4.png",
];

const productNames = [
  "Jacket Style A",
  "Jacket Style B",
  "Jacket Style C",
  "Jacket Style D",
  "Jacket Style D",
];

let currentIndex = 0;

// open pop up
detailBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("active");
  loadImages();
  updateView();
});

// close pop up

closePopup.addEventListener("click", () => {
  popup.classList.remove("active");
});

// Load Thumbnail

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

// UPDATE VIEW
function updateView() {
  mainImage.src = images[currentIndex];

  // UPDATE NAMA PRODUK
  productTitle.innerText = productNames[currentIndex];

  const thumbs = document.querySelectorAll(".popup-right img");
  thumbs.forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });

  btnPrev.style.display = currentIndex === 0 ? "none" : "block";
  btnNext.style.display = currentIndex === images.length - 1 ? "none" : "block";
}

// NEXT
btnNext.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateView();
  }
});

// PREV
btnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateView();
  }
});

// need update detail products js

// CHECK OUT CODE
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutPopup = document.getElementById("checkoutPopup");
const closeCheckout = document.querySelector(".close-checkout");
const payNow = document.getElementById("payNow");

// Open Checkout
checkoutBtn.addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("Anda belum memesan Product apapun !");
    return;
  }
  cart.classList.remove("active");
  checkoutPopup.classList.add("active");
});

// Close Checkout
closeCheckout.addEventListener("click", () => {
  checkoutPopup.classList.remove("active");
});

// Paynow
payNow.addEventListener("click", () => {
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const number = document.getElementById("hp").value;
  const shipping = document.getElementById("shipping").value;

  if (!nama || !alamat || !number) {
    alert("Isi semua data dulu !");
    return;
  }

  alert(`Order berhasil, Thankyou Sudah Checkout :D
  Nama : ${nama}
  Shipping : ${shipping}
  Payment : ${selectedPayment.toUpperCase()}
  Tota : ${subtotalEl.innerText}`);

  cartData = [];
  renderCart();
  checkoutPopup.classList.remove("active");
});

const paymentOptions = document.querySelectorAll(".payment-option");
let selectedPayment = "qris";

paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // hapus semua active
    paymentOptions.forEach((o) => o.classList.remove("active"));

    // aktifkan kembali
    option.classList.add("active");

    // simpan pilihan
    selectedPayment = option.dataset.method;
  });
});

// CHECK OUT CODE
