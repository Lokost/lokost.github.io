import { mediaViewer } from "./media-viewer.js";
import { dragElement } from "./draggable.js";
import { fileType } from "./file_types.js";
import { settings } from "./settings.js";
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
  if (file.type == "folder") openFolder(file);
  else if (["image", "video", "audio"].includes(fileType(file)))
    openMedia(file);
  else if (file.kind == "option") openSettings(file);
}

const openFolder = (file) => {
  const app = fileExplorer(file);
  mainContainer.appendChild(app);
  app.onclick = () => {
    setActive(app.id);
  };
  dragElement(app);
  setActive(app.id);
  updateApps();
};

const openMedia = (file) => {
  var type = fileType(file);
  const app = mediaViewer(file, type);
  mainContainer.appendChild(app);
  app.onclick = () => {
    setActive(app.id);
  };
  dragElement(app);
  setActive(app.id);
  updateApps();
};

const openSettings = (file) => {
  if (file.name == "Configurações") {
    const app = settings();
    mainContainer.appendChild(app);
    app.onclick = () => {
      setActive(app.id);
    };
    dragElement(app);
    setActive(app.id);
    updateApps();
  }
};

export { updateApps, setActive, open_file };
