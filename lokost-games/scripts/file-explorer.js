import { App } from "./app.js";
import { file, file_view } from "./file-model.js";

function fileExplorer(folder) {
  var items = 0;
  const container = document.createElement("div");

  const pathBar = document.createElement("input");
  pathBar.classList.add("path-bar");
  pathBar.readOnly = true;
  pathBar.value = folder.path.join(" > ");

  const files = document.createElement("div");
  files.classList.add("files-grid");
  for (let i in Object.keys(folder.content)) {
    items++;
    let file_name = Object.keys(folder.content)[i];
    let file_content = folder.content[file_name];
    files.appendChild(file_view(file(file_name, file_content, true)));
  }

  const lowerBar = document.createElement("div");
  lowerBar.classList.add("folder-lowerBar");
  lowerBar.innerText = `${items} iten(s) encontrado(s)`;

  container.append(pathBar, files, lowerBar);
  return App(container, folder.name);
}

export { fileExplorer };
