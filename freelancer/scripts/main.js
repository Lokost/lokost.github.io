const toggleMenuButton = document.querySelector(".menu-toggle span");
const menu = document.querySelector(".side-menu");

function toggle_menu() {
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

toggleMenuButton.addEventListener("click", toggle_menu);
document.onclick = (e) => {
  if (!menu.contains(e.target) && !toggleMenuButton.contains(e.target)) {
    menu.style.display = "none";
  }
};
