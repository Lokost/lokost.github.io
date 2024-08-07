import { contact_popup } from "./contact_popup.js";

const menu = document.querySelector(".side-menu");
const menuBackdrop = document.querySelector(".backdrop");
let showMenu = false;

function toggle_menu() {
  showMenu = !showMenu;
  console.log(showMenu);

  if (showMenu) {
    menu.style.display = "flex";
    menu.classList.add("enter");
    menu.onanimationend = () => menu.classList.remove("enter");

    menuBackdrop.style.display = "block";
    menuBackdrop.classList.add("enter");
    menuBackdrop.onanimationend = () => menuBackdrop.classList.remove("enter");
  } else {
    menu.classList.add("close");
    menu.onanimationend = () => {
      menu.classList.remove("close");
      menu.style.display = "none";
    };

    menuBackdrop.classList.add("close");
    menuBackdrop.onanimationend = () => {
      menuBackdrop.classList.remove("close");
      menuBackdrop.style.display = "none";
    };
  }
}

document
  .querySelectorAll(".menu-toggle")
  .forEach((btn) => (btn.onclick = () => toggle_menu()));

document.querySelector(".backdrop").onclick = () => {
  if (menu.style.display == "none") toggle_menu();
  else if (document.querySelector(".contact-popup")) {
    document.querySelector(".contact-popup").remove();
    menuBackdrop.style.display = "none";
  }
};

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, options);

document
  .querySelectorAll("#contact")
  .forEach((button) => (button.onclick = () => contact_popup()));

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});
