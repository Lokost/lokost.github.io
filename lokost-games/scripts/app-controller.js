import { mediaViewer } from "./media-viewer.js";
import { dragElement } from "./draggable.js";
import { documents, image, audio, video } from "./file_types.js";
import { fileExplorer } from "./file-explorer.js";
const mainContainer = document.querySelector("main");

var opened_windows = document.querySelectorAll(".app");

function updateApps() {
  opened_windows = document.querySelectorAll(".app");
  return opened_windows;
}

function setActive(elementId) {
  opened_windows.forEach((element) => {
    if (element.id != elementId) element.classList.remove("active");
    else element.classList.add("active");
  });
}

function open_file(file) {
  if (file.type === "folder") {
    const app = fileExplorer(file);
    mainContainer.appendChild(app);
    app.onclick = () => {
      setActive(app.id);
    };
    dragElement(app);
    setActive(app.id);
    updateApps();
  } else {
    var type = "";
    if (image.includes(file.type)) type = "image";
    else if (video.includes(file.type)) type = "video";
    else if (audio.includes(file.type)) type = "audio";

    const app = mediaViewer(file, type);
    mainContainer.appendChild(app);
    app.onclick = () => {
      setActive(app.id);
    };
    dragElement(app);
    setActive(app.id);
    updateApps();
  }
}

export { updateApps, setActive, open_file };
