import { projectCard } from "./components.js";

const projectGrid = document.getElementById("projects");

const projects = [
  new projectCard(
    "Loko Cursos",
    "Cursos particulares sendo eles pagos ou gratuitos!",
    "images/available courses.png",
    "loko-cursos/index.html"
  ),
  new projectCard(
    "Lokost Games",
    "Grupo de desenvolvimento de jogso com alguns amigos.",
    "images/Lokost Games new logo by clay.png",
    "https://youtube.com/@lokostgames"
  ),
  new projectCard(
    "Lnovel",
    "Jogo novel baseado no DDLC, procurando ter mais mecânicas que o mesmo",
    "images/Lnovel_logo.png",
    "lnovel/index.html"
  ),
  new projectCard(
    "Canal Lokost",
    "Canal de gameplays e lives, apenas para descontrair mesmo, nada demais",
    "images/Lokost Games new logo.png",
    "https://youtube.com/@lokosttv"
  ),
  new projectCard(
    "Loko QR",
    "Aplicativo de leitura de qr  do Lokost Games",
    "images/Loko QR.png",
    "Loko%20qr/index.html"
  ),
  new projectCard(
    "Palestra de HTML",
    "Palestra rápida introdutória ao HTML 5, CSS 3 e JS básico.",
    "images/html5-logo.png",
    "Palestras/HTML/index.html"
  ),
];

console.log(projectGrid);

projects.forEach((project) => {
  projectGrid.appendChild(project.build());
});
