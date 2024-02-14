// module imports
import { file, file_view } from "./file-model.js";
import { updateApps } from "./app-controller.js";

// JSON files import
import json_files from "../contents.json" assert { type: "json" };

changeBack();

const desktop_files = [];
const desktop = document.getElementById("desktop-icons");
const home_button = document.getElementById("home");
const back_button = document.getElementById("back");
const main = document.querySelector("main");

for (let i in Object.keys(json_files.desktop)) {
  let file_name = Object.keys(json_files.desktop)[i];
  let file_content = json_files.desktop[file_name];
  desktop_files.push(file(file_name, file_content));
}

desktop_files.forEach((file) => {
  desktop.appendChild(file_view(file));
});

home_button.onclick = () => {
  main.querySelectorAll(".app").forEach((app) => {
    app.onanimationend = () => {
      app.remove(app);
      updateApps();
    };
    app.style.animation = "show-app 0.3s ease reverse";
  });
};

back_button.onclick = () => {
  const app = main.querySelector(".active");
  app.onanimationend = () => {
    app.remove(app);
    updateApps();
  };
  app.style.animation = "show-app 0.3s ease reverse";
};

function changeBack() {
  const background = localStorage.getItem("background");
  if (background) {
    document.body.style.background = `url("${background}") no-repeat fixed`;
    document.body.style.backgroundSize = "cover";
  }
}
