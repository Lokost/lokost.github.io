import { mediaViewer } from "./media-viewer.js";
import { dragElement } from "./draggable.js";
const mainContainer = document.querySelector("main");

var opened_windows = document.querySelectorAll(".app");

const image = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".svg",
  ".webp",
  ".ico",
  ".tiff",
  ".tif",
];

const video = [
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".mkv",
  ".mpeg",
  ".mpg",
  ".m4v",
  ".m2ts",
];

const audio = [
  ".mp3",
  ".wav",
  ".wma",
  ".ogg",
  ".m4a",
  ".aac",
  ".flac",
  ".ape",
  ".mid",
  ".midi",
];

const documents = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".pdf",
  ".txt",
  ".rtf",
  ".odt",
  ".ods",
  ".odp",
  ".pages",
];

function updateApps() {
  opened_windows = document.querySelectorAll(".app");
  console.log(opened_windows);
  return opened_windows;
}

function setActive(elementId) {
  opened_windows.forEach((element) => {
    if (element.id != elementId) element.classList.remove("active");
    else element.classList.add("active");
  });
}

function file(name, file) {
  return {
    name: name,
    path: file.path ?? null,
    type: file.type ?? "file",
  };
}

function file_view(file) {
  const file_icon = document.createElement("div");
  file_icon.classList.add("file-icon");
  const icon = document.createElement("img");
  const name = document.createElement("p");

  if (file.type === "folder") icon.src = "images/icons/folder.png";
  else if (image.includes(file.type)) icon.src = "images/icons/image_file.png";
  else if (video.includes(file.type)) icon.src = "images/icons/video_file.png";
  else if (audio.includes(file.type)) icon.src = "images/icons/music_file.png";
  else if (documents.includes(file.type))
    icon.src = "images/icons/document_file.png";
  else icon.src = "images/icons/unknown.png";

  name.textContent = file.name;

  file_icon.addEventListener("dblclick", (event) => {
    if (file.type === "folder") {
      console.log("folder");
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
  });

  file_icon.appendChild(icon);
  file_icon.appendChild(name);

  return file_icon;
}

export { file, file_view, updateApps, setActive };
