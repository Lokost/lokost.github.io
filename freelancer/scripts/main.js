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

document.querySelector(".backdrop").onclick = () => toggle_menu();

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

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});
