const menu = document.getElementById("side-menu");
const shadowBlock = document.getElementById("shadow-block");
const rootCss = document.querySelector(":root");

document
  .querySelectorAll(".toggle-menu")
  .forEach((element) => element.addEventListener("click", () => toggleMenu()));

shadowBlock.addEventListener("click", () => {
  if (showingMenu) toggleMenu();
});

function setPrimary(color) {
  rootCss.style.setProperty("--primary-color", color);
}

var showingMenu = false;

function toggleMenu() {
  console.log("toggle menu");

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
