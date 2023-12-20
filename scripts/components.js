function header() {
  // create main header
  const header = document.createElement("header");

  // create logo container
  const logoContainer = document.createElement("a");
  logoContainer.classList.add("logo");
  logoContainer.href = "index.html";

  // add image logo
  const logo = document.createElement("img");
  logo.src = "images/logo128.png";
  logoContainer.appendChild(logo);

  // add logo text
  const logoText = document.createElement("h1");
  logoText.innerText = "Lokost";
  logoContainer.appendChild(logoText);

  // create menu container
  const menuContainer = document.createElement("nav");
  menuContainer.classList.add("menu");

  // add toggle menu button to header
  const toggleMenu = document.createElement("span");
  toggleMenu.classList.add("material-symbols-outlined");
  toggleMenu.classList.add("toggle-menu");
  toggleMenu.innerText = "menu";

  // add elements to header
  header.appendChild(logoContainer);
  header.appendChild(menuContainer);
  header.appendChild(toggleMenu);

  // create the aside menu
  const asideMenu = document.createElement("aside");
  const asideToggleMenu = document.createElement("span");
  asideToggleMenu.classList.add("material-symbols-outlined");
  asideToggleMenu.classList.add("toggle-menu");
  asideToggleMenu.innerText = "menu";
  asideMenu.classList.add("menu");
  asideMenu.style.display = "none";
  asideMenu.appendChild(asideToggleMenu);

  // create back shadow for the side menu
  const backshadow = document.createElement("div");
  backshadow.classList.add("back-shadow");

  // add header to page
  document.body.replaceChild(header, document.querySelector("header"));
  document.body.appendChild(backshadow);
  document.body.appendChild(asideMenu);
}

function footer() {
  // create footer
  const footer = document.createElement("footer");

  // create footer text
  const footerText = document.createElement("p");
  footerText.innerHTML = "Copyright &copy; Gabriel Gomes 2023";

  footer.appendChild(footerText);
  document.body.replaceChild(footer, document.querySelector("footer"));
}

class MenuButton {
  constructor(icon, text, href) {
    this.icon = icon;
    this.text = text;
    this.href = href;
    const actualPage = sessionStorage.getItem("activePage");
    if (actualPage == null) {
      this.active = this.text.toLowerCase() == "home";
    } else {
      this.active = this.text.toLowerCase() == actualPage;
    }
  }

  build() {
    // principal container
    const container = document.createElement("a");
    container.classList.add("menu-button");
    this.active ? container.classList.add("active") : "";
    container.href = this.href;

    // Button icon
    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.innerText = this.icon;

    // Button text
    const text = document.createElement("p");
    text.innerText = this.text;

    // Add components
    container.appendChild(icon);
    container.appendChild(text);

    // Return the container
    return container;
  }
}

function setIcon() {
  const head = document.querySelector("head");
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/png";
  icon.href = "images/logo32.png";
  head.appendChild(icon);
}

class projectCard {
  constructor(title, description, img, link) {
    this.title = title;
    this.description = description;
    this.img = img;
    this.link = link;
  }

  build() {
    // Create container
    const container = document.createElement("a");
    container.classList.add("card");
    container.href = this.link;

    // set title
    const title = document.createElement("h2");
    title.innerText = this.title;
    container.appendChild(title);

    // set image
    const image = document.createElement("img");
    image.src = this.img;
    container.appendChild(image);

    //set description
    const description = document.createElement("p");
    description.innerText = this.description;
    container.appendChild(description);

    // return container
    return container;
  }
}

export { header, footer, MenuButton, setIcon, projectCard };
