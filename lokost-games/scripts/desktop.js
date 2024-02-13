// Clock controllers
const clock = document.getElementById("clock");

function updateClock() {
  let time = new Date();
  let day = time.getDate().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let month = time.getMonth().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let year = time.getFullYear().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let hour = time.getHours().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let minute = time.getMinutes().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let seconds = time.getSeconds();
  clock.innerText = `${hour}${
    seconds % 2 == 0 ? ":" : " "
  }${minute}\n${day}/${month}/${year} `;
}

updateClock();

setInterval(() => {
  updateClock();
}, 1000);

// module imports
import { file, file_view } from "./app-controller.js";

// JSON files import
import json_files from "../contents.json" assert { type: "json" };

const desktop_files = [];
const desktop = document.getElementById("desktop-icons");

for (let i in Object.keys(json_files.desktop)) {
  let file_name = Object.keys(json_files.desktop)[i];
  let file_content = json_files.desktop[file_name];
  desktop_files.push(file(file_name, file_content));
}

desktop_files.forEach((file) => {
  desktop.appendChild(file_view(file));
});
