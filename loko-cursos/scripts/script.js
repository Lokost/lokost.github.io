// Get elements from HTML with DOM
const menu = document.getElementById("side-menu");
const shadowBlock = document.getElementById("shadow-block");
const rootCss = document.querySelector(":root");

// Auxiliar variable to show menu
var showingMenu = false;

// Insert the toggle menu action into the icon button and the back shadow
document
  .querySelectorAll(".toggle-menu")
  .forEach((element) => element.addEventListener("click", () => toggleMenu()));

shadowBlock.addEventListener("click", () => {
  if (showingMenu) toggleMenu();
});

// Change primary color
function setPrimary(color) {
  rootCss.style.setProperty("--primary-color", color);
}

// Toggle menu show and the back shadow with animations
function toggleMenu() {
  showingMenu = !showingMenu;
  if (showingMenu) {
    menu.style.display = "flex";
    menu.style.animation = ".5s menu-show backwards";
    shadowBlock.style.display = "block";
    menu.onanimationend = () => {
      menu.style.animation = "none";
    };
  } else {
    menu.onanimationend = () => {
      menu.style.animation = "none";
      menu.style.display = "none";
      shadowBlock.style.display = "none";
    };
    menu.style.animation = ".5s menu-show backwards reverse";
  }
}
