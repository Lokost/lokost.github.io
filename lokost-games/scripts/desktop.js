// module imports
import { file_view } from "./file-model.js";
import { updateApps } from "./app-controller.js";
import { Notify } from "./notify.js";
import { startMenu } from "./start-menu.js";

const timer = (ms) => new Promise((r) => setTimeout(r, ms));

// JSON files import
const req = new Require("../contents.json", {headers: {"Content-Header": "application/JSON");
var json_files;
await fetch(req).then((e) => e.json()).then((data) => json_files = data)

changeBack();
startingNotifications();

async function startingNotifications() {
  Notify("Use em tela cheia para melhor experiência");
  await timer(6500);
  Notify("Use os botões da barra de tarefas em caso de travamento");
  await timer(6500);
  Notify("Aproveite seu novo sistema!");
}

const desktop = document.getElementById("desktop-icons");
const start_button = document.getElementById("start-menu");
const home_button = document.getElementById("home");
const back_button = document.getElementById("back");
const main = document.querySelector("main");
var startOpened = false;

json_files.files.forEach((item) => {
  if (item.path.join(",") == "desktop") {
    desktop.appendChild(file_view(item));
  }
});

home_button.onclick = async () => {
  const opened_apps = main.querySelectorAll(".app");
  if (opened_apps.length > 0) {
    Notify(`${opened_apps.length} app(s) fechado(s)`, 2);
    opened_apps.forEach((app) => {
      app.style.animation = "show-app 0.3s ease reverse";
      app.onanimationend = () => {
        app.remove(app);
        updateApps();
      };
    });
  } else {
    Notify("Não há apps a serem fechados!", 2);
  }
};

back_button.onclick = () => {
  const app = main.querySelector(".active");
  if (app) {
    app.onanimationend = () => {
      app.remove(app);
      updateApps();
    };
    app.style.animation = "show-app 0.3s ease reverse";
    Notify("App mais recente fechado!", 2);
  } else {
    Notify("Selecione um app antes!", 2);
  }
};

start_button.onclick = () => {
  const app = main.querySelector(".start-menu");
  if (!app) {
    const start = startMenu();
    startOpened = true;
    start.onanimationend = () => {
      start.style.animation = "None";
    };
    main.appendChild(start);
  } else {
    startOpened = false;
    app.style.animation = "slide-out 1s ease";
    app.onanimationend = () => {
      app.style.animation = app.remove(app);
    };
  }
};

function changeBack() {
  const background = localStorage.getItem("background");
  if (background) {
    document.body.style.background = `url("${background}") no-repeat fixed`;
    document.body.style.backgroundSize = "cover";
  }
}

main.onclick = (e) => {
  if (startOpened) {
    const app = document.querySelector(".start-menu");
    if (app) {
      app.style.animation = "slide-out 1s ease";
      app.onanimationend = () => {
        app.style.animation = app.remove(app);
      };
    }
  }
};
