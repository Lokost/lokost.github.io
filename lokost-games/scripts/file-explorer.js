import { App } from "./app.js";
import data from "../contents.json" assert { type: "json" };
import { file_view } from "./file-model.js";

function fileExplorer(folder) {
  var items = 0;
  const container = document.createElement("div");

  const pathBar = document.createElement("input");
  pathBar.classList.add("path-bar");
  pathBar.readOnly = true;
  const folderPath = Array(folder.path);
  folderPath.push(folder.name);
  pathBar.value = folderPath.join(" > ");

  const files = document.createElement("div");
  files.classList.add("files");

  const filesGrid = document.createElement("div");
  filesGrid.classList.add("files-grid");

  const content = data.files.filter(
    (val) => val.path.join(",") == folderPath.join(",")
  );

  items = content.length;
  content.forEach((item) => {
    filesGrid.appendChild(file_view(item));
  });

  files.appendChild(filesGrid);

  const lowerBar = document.createElement("div");
  lowerBar.classList.add("folder-lowerBar");
  lowerBar.innerText = `${items} iten(s) encontrado(s)`;

  container.append(pathBar, files, lowerBar);
  return App(container, folder.name);
}

export { fileExplorer };
