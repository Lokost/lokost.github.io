// necessary imports
import { open_file } from "./app-controller.js";
import { documents, image, audio, video } from "./file_types.js";

function file(name, file, inFolder = false) {
  return {
    name: name,
    path: file.path ?? null,
    type: file.type ?? "file",
    content: file.content ?? null,
    inFolder: inFolder,
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
  file_icon.ondblclick = () => open_file(file);

  file_icon.appendChild(icon);
  file_icon.appendChild(name);

  return file_icon;
}

export { file, file_view };
