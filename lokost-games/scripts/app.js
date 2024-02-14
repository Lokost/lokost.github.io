// Import functions
import { updateApps, setActive } from "./app-controller.js";

function id_gen() {
  // Alphabet to help
  const letters = "abcdefghijklmnopqrstuvwxyz";

  // Main var
  var id = "app";

  // Randomize 8 alfanumeric chars
  for (let i = 0; i < 8; i++) {
    if (Math.floor(Math.random() * 2) == 1) {
      id += letters[Math.floor(Math.random() * letters.length)];
    } else {
      id += Math.floor(Math.random() * 10);
    }
  }

  // return the id
  return id;
}

function App(content, title) {
  // Window main div
  const app = document.createElement("div");
  app.id = id_gen();
  app.classList.add("app");
  app.onanimationend = () => {
    app.style.animation = "none";
  };
  app.onclick = () => setActive(app.id());

  // Window title bar
  const titleBar = document.createElement("div");
  titleBar.id = app.id + "-bar";
  titleBar.classList.add("app-bar");
  titleBar.innerText = title;

  // Window close button
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("material-symbols-outlined");
  closeBtn.innerText = "close";
  closeBtn.addEventListener("click", () => {
    app.onanimationend = () => {
      app.remove(app);
      updateApps();
    };
    app.style.animation = "show-app 0.3s ease reverse";
  });
  titleBar.appendChild(closeBtn);

  // Add content class
  content.classList.add("content");

  // Append elements to the app
  app.appendChild(titleBar);
  app.appendChild(content);

  return app;
}

export { App };
