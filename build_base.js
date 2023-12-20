import { header, footer, MenuButton, setIcon } from "./components.js";
// site routes
const routes = {
  "index.html": "home",
  "projects.html": "projetos",
};

// Principal variables
var showingMenu = false;
const activePage = routes[location.href.split("/").pop()];
sessionStorage.setItem("activePage", activePage);

// start elements
setIcon();
header();
footer();

// Get DOM elements
const menus = document.querySelectorAll(".menu");
const toggleMenu = document.querySelectorAll(".toggle-menu");

// Menu buttons
const menuButtons = [
  new MenuButton("home", "Home", "index.html"),
  new MenuButton("work", "Projetos", "projects.html"),
];

// Add the buttons on the menus
menus.forEach((menu) => {
  menuButtons.forEach((button) => {
    menu.appendChild(button.build());
  });
});

function showMenu() {
  showingMenu = !showingMenu;
  if (showingMenu) {
    document.querySelector("aside.menu").style.display = "flex";
  } else {
    document.querySelector("aside.menu").style.display = "none";
  }
}

toggleMenu.forEach((toggle) => {
  toggle.addEventListener("click", showMenu);
});

window.onresize = () => {
  if (window.innerWidth > 700) {
    document.querySelector("aside.menu").style.display = "none";
    showingMenu = false;
  }
};
