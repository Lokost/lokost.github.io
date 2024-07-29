const toggleMenuButton = document.querySelector(".menu-toggle span");
const menu = document.querySelector(".side-menu");
const menuBackdrop = document.querySelector(".backdrop");
let showMenu = false;

function toggle_menu() {
  showMenu = !showMenu;
  console.log(showMenu);

  if (showMenu) {
    menu.style.display = "block";
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

toggleMenuButton.addEventListener("click", toggle_menu);
document.onclick = (e) => {
  if (
    !menu.contains(e.target) &&
    !toggleMenuButton.contains(e.target) &&
    showMenu
  ) {
    toggle_menu();
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

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});
