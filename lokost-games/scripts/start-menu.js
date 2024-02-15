import { data } from "start-menu.json" assert { type: "json" };

function startMenu() {
  const startMenu = document.createElement("div");
  startMenu.classList.add("start-menu");

  // UserInfo container
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerText = "Administrador";

  // User image
  const userImage = document.createElement("img");
  userImage.src("images/lokost-logo-mono.png");
  userImage.classList("user-image");

  // User image on the container
  userInfo.appendChild(userImage);

  // Start menu content
  const menuContent = document.createElement("div");
  menuContent.classList.add("content");

  // Start menu shortcuts
  const shortcuts = document.createElement("div");
  shortcuts.classList.add("shortcuts");
}
