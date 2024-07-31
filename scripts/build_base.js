import { header, footer, MenuButton, setIcon } from "./components.js";
// site routes
const routes = {
  "index.html": "home",
  "projects.html": "projetos",
};

// Principal variables
var showingMenu = false;
const activePage = routes[location.href.split("/").pop()];
sessionStorage.setItem("activePage", activePage != null ? activePage : "home");

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
  new MenuButton("tactic", "Projetos", "projects.html"),
  new MenuButton("work", "Freelancer", "/freelancer"),
];

// Add the buttons on the menus
menus.forEach((menu) => {
  menuButtons.forEach((button) => {
    menu.appendChild(button.build());
  });
});

function showMenu() {
  showingMenu = !showingMenu;
  const sideMenu = document.querySelector("aside.menu");
  const backshadow = document.querySelector("div.back-shadow");
  if (showingMenu) {
    sideMenu.onanimationend = () => {
      sideMenu.style.animation = "none";
      backshadow.style.animation = "none";
    };
    sideMenu.style.display = "flex";
    backshadow.style.display = "block";
    sideMenu.style.animation = ".5s show-menu forwards";
    backshadow.style.animation = ".5s fade forwards";
  } else {
    sideMenu.onanimationend = () => {
      sideMenu.style.animation = "none";
      sideMenu.style.display = "none";
      backshadow.style.animation = "none";
      backshadow.style.display = "none";
    };
    sideMenu.style.animation = ".5s show-menu backwards reverse";
    backshadow.style.animation = ".5s fade backwards reverse";
  }
}

toggleMenu.forEach((toggle) => {
  toggle.addEventListener("click", showMenu);
});

document.querySelector("div.back-shadow").addEventListener("click", showMenu);

window.onresize = () => {
  if (window.innerWidth > 700) {
    document.querySelector("aside.menu").style.display = "none";
    showingMenu = false;
  }
};
