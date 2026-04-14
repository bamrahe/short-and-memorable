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
