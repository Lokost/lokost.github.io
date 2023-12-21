function header() {
  // create main header
  const headerContainer = document.createElement("header");

  // logo container
  const logoContainer = document.createElement("a");
  logoContainer.href = "index.html";
  logoContainer.classList.add("logo");

  // logo
  const logo = document.createElement("img");
  logo.src = "images/logo100.png";
  logoContainer.appendChild(logo);

  headerContainer.appendChild(logoContainer);
  document.body.replaceChild(headerContainer, document.querySelector("header"));
}

function footer() {
  // create main footer
  const footer = document.createElement("footer");

  // create footer text
  const footerText = document.createElement("p");
  footerText.innerHTML = "Copyright &copy; Lokost Games 2023";

  footer.appendChild(footerText);
  document.body.replaceChild(footer, document.querySelector("footer"));
}

function videoSource(src) {
  const video = document.createElement("source");
  video.src = src;
  video.type = `video/${src.split(".").pop()}`;
  return video;
}

class VideoPlayer {
  constructor(
    sources = [],
    autoplay = false,
    muted = true,
    controls = false,
    classes
  ) {
    this.sources = sources;
    this.autoplay = autoplay;
    this.muted = muted;
    this.controls = controls;
    this.classes = classes;
  }

  addSource(src) {
    this.sources.push(src);
  }

  create() {
    const player = document.createElement("video");
    player.autoplay = this.autoplay;
    player.muted = this.muted;
    player.controls = this.controls;
    player.classList.add(...this.classes);

    for (let i = 0; i < this.sources.length; i++) {
      player.appendChild(videoSource(this.sources[i]));
    }
    return player;
  }
}

class Charcard {
  constructor(img, name, height, age, sexuality, likes, dislikes) {
    this.img = img;
    this.name = name;
    this.height = height;
    this.age = age;
    this.sexuality = sexuality;
    this.likes = likes;
    this.dislikes = dislikes;
  }

  create() {
    // principal card
    const card = document.createElement("div");
    card.classList.add("char-card");

    // image content
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("char-img");

    const image = document.createElement("img");
    image.src = this.img;
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    // char description
    const descContainer = document.createElement("div");
    descContainer.classList.add("char-desc");

    const name = document.createElement("h3");
    name.classList.add("char-name");
    name.innerText = this.name;
    descContainer.appendChild(name);

    const simpleDesc = document.createElement("p");
    simpleDesc.innerHTML = `<b>Idade</b>: ${this.age}<br><b>Altura</b>: ${this.height}<br><b>Sexualidade</b>: ${this.sexuality}`;
    descContainer.appendChild(simpleDesc);

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-list");
    const likesText = document.createElement("p");
    likesText.innerHTML = "<b>Gostos</b>";
    likesContainer.appendChild(likesText);
    const likesList = document.createElement("ul");
    for (let i in this.likes) {
      let item = document.createElement("li");
      item.innerText = this.likes[i];
      likesList.appendChild(item);
    }
    likesContainer.appendChild(likesList);
    descContainer.appendChild(likesContainer);

    const dislikesContainer = document.createElement("div");
    dislikesContainer.classList.add("dislikes-list");
    const dislikesText = document.createElement("p");
    dislikesText.innerHTML = "<b>Desgostos</b>";
    dislikesContainer.appendChild(dislikesText);
    const dislikesList = document.createElement("ul");
    for (let i in this.dislikes) {
      let item = document.createElement("li");
      item.innerText = this.dislikes[i];
      dislikesList.appendChild(item);
    }
    dislikesContainer.appendChild(dislikesList);

    descContainer.appendChild(dislikesContainer);
    card.append(descContainer);

    return card;
  }
}

export { header, footer, VideoPlayer, Charcard };
