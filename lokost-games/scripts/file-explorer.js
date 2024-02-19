import { App } from "./app.js";
import data from "../contents.json" assert { type: "json" };
import { file_view } from "./file-model.js";

function fileExplorer(folder) {
  var items = 0;
  const container = document.createElement("div");

  const pathBar = document.createElement("input");
  pathBar.classList.add("path-bar");
  pathBar.readOnly = true;
  const folderPath = folder.path.length >= 1 ? [...folder.path] : folder.path;
  folderPath.push(folder.name);
  pathBar.value =
    folderPath.length >= 1 ? folderPath.join(" > ") : folderPath[0];

  const files = document.createElement("div");
  files.classList.add("files");

  const filesGrid = document.createElement("div");
  filesGrid.classList.add("files-grid");

  console.log(folderPath);

  const content = data.files.filter((val) =>
    folderPath.length <= 1 && val.path.length <= 1
      ? val.path[0] == folderPath
      : val.path.join(",") == folderPath.join(",")
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
