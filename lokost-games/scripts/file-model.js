// necessary imports
import { open_file } from "./app-controller.js";
import { fileType } from "./file_types.js";

function file_view(file) {
  const file_icon = document.createElement("div");
  file_icon.classList.add("file-icon");
  const icon = document.createElement("img");
  const name = document.createElement("p");

  if (file.type === "folder") icon.src = "images/icons/folder.png";
  else if (fileType(file) == "image") icon.src = "images/icons/image_file.png";
  else if (fileType(file) == "video") icon.src = "images/icons/video_file.png";
  else if (fileType(file) == "audio") icon.src = "images/icons/music_file.png";
  else if (fileType(file) == "document")
    icon.src = "images/icons/document_file.png";
  else if (fileType(file) == "unknown") icon.src = "images/icons/unknown.png";

  name.textContent = file.name;
  file_icon.ondblclick = () => open_file(file);

  file_icon.appendChild(icon);
  file_icon.appendChild(name);

  return file_icon;
}

export { file_view };
