import data from "../contents.json" assert { type: "json" };
import { fileType } from "./file_types.js";
import { open_file } from "./app-controller.js";

const start_items = data.startMenu;

function startShortcut(file) {
  const shortcut = document.createElement("div");
  shortcut.classList.add("start-shortcut");

  const icon = document.createElement("img");
  icon.classList.add("start-shortcut-icon");
  if (fileType(file) == "folder") icon.src = "images/icons/folder.png";
  else if (fileType(file) == "image") icon.src = "images/icons/image_file.png";
  else if (fileType(file) == "video") icon.src = "images/icons/video_file.png";
  else if (fileType(file) == "audio") icon.src = "images/icons/music_file.png";
  else if (fileType(file) == "document")
    icon.src = "images/icons/document_file.png";
  else if (fileType(file) == "unknown")
    icon.src = "images/icons/unknown_file.png";

  const name = document.createElement("p");
  name.innerText = file.name;

  shortcut.append(icon, name);

  shortcut.onclick = () => {
    open_file(file);
    const start = document.querySelector(".start-menu");
    start.style.animation = "slide-out 1s ease";
    start.onanimationend = () => {
      start.remove(start);
    };
  };

  return shortcut;
}

function startOption(file) {
  const startOption = document.createElement("div");
  startOption.classList.add("start-option");

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  icon.innerText = file.icon;

  const name = document.createElement("p");
  name.innerText = file.name;

  startOption.append(icon, name);
  startOption.onclick = () => {
    open_file(file);
    const start = document.querySelector(".start-menu");
    start.style.animation = "slide-out 1s ease";
    start.onanimationend = () => {
      start.remove(start);
    };
  };

  return startOption;
}

function startMenu() {
  const startMenu = document.createElement("div");
  startMenu.classList.add("start-menu");

  const menuContent = document.createElement("div");
  menuContent.classList.add("startmenu-content");

  const shortcuts = document.createElement("div");
  shortcuts.classList.add("startmenu-shortcuts");

  const options = document.createElement("div");
  options.classList.add("startmenu-options");

  start_items.forEach((item) => {
    if (item.kind == "shortcut") shortcuts.appendChild(startShortcut(item));
    else if (item.kind == "option") options.appendChild(startOption(item));
  });

  const footer = document.createElement("div");
  footer.classList.add("startmenu-footer");

  const actions = document.createElement("div");
  actions.classList.add("startmenu-actions");
  footer.appendChild(actions);

  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerText = "Administrador";
  footer.appendChild(userInfo);

  const userImage = document.createElement("img");
  userImage.src = "images/lokost-logo-mono.png";
  userImage.classList.add("user-image");
  userInfo.appendChild(userImage);

  const powerBtt = document.createElement("button");
  powerBtt.classList.add("material-symbols-outlined", "powerBtt");
  powerBtt.innerText = "power_settings_new";
  powerBtt.onclick = () => {
    location.href = "index.html";
  };
  actions.appendChild(powerBtt);

  menuContent.append(shortcuts, options);
  startMenu.append(menuContent, footer);

  return startMenu;
}

export { startMenu };
