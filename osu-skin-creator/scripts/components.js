function mainHeader(menuButtons) {
  let header = document.createElement("header");

  let logoContainer = document.createElement("div");
  logoContainer.classList.add("logo");

  let logo = document.createElement("img");
  logo.src = "../images/logo128.png";
  logo.alt = "logo";
  logoContainer.appendChild(logo);

  let title = document.createElement("h1");
  title.textContent = "OSU Skin Creator";
  logoContainer.appendChild(title);

  header.appendChild(logoContainer);

  let header_menu = document.createElement("div");
  header_menu.classList.add("header-menu");
  if (menuButtons) {
    menuButtons.forEach((button) => {
      header_menu.appendChild(button);
    });
  }
  header.appendChild(header_menu);

  return header;
}

function mainFooter() {
  let footer = document.createElement("footer");

  let credits = document.createElement("p");
  credits.innerHTML = "Copyright &copy; Gabriel Gomes 2024";
  footer.appendChild(credits);

  return footer;
}

function menuButton(label, icon, onClick) {
  let button = document.createElement("a");
  button.classList.add("menu-button");
  button.onclick = onClick;

  let icon_span = document.createElement("span");
  icon_span.classList.add("material-symbols-outlined");
  icon_span.innerHTML = icon;
  button.appendChild(icon_span);

  let text = document.createElement("span");
  text.textContent = label;
  button.appendChild(text);

  return button;
}

function floatButton(icon, onClick) {
  let button = document.createElement("a");
  button.classList.add("float-button");
  button.onclick = onClick;

  let icon_span = document.createElement("i");
  icon_span.classList.add("material-symbols-outlined");
  icon_span.innerHTML = icon;
  button.appendChild(icon_span);

  return button;
}

function floatingButtons(buttons) {
  let container = document.createElement("div");
  container.classList.add("floating-action-buttons");
  buttons.forEach((button) => {
    container.appendChild(button);
  });
  document.body.appendChild(container);
}

export { mainHeader, mainFooter, menuButton, floatButton, floatingButtons };
