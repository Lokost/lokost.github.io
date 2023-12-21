import { VideoPlayer, Charcard } from "./components.js";
const intro = document.getElementById("intro");
const mainBody = document.querySelector("main");
const charactersShow = document.getElementsByClassName("characters");

const videoPlayer = new VideoPlayer(
  ["images/lnovel intro.mp4"],
  true,
  true,
  false,
  ["intro"]
);

const characters = [
  new Charcard(
    "images/Lokost1.png",
    "Lokost",
    1.72,
    20,
    "Heterossexual",
    ["Exercícios físicos", "Dança", "Canto", "Bastidores de qualquer tipo"],
    ["Injustiças de qualquer tipo"]
  ),
  new Charcard(
    "images/Felix1.png",
    "Felix",
    1.65,
    19,
    "Bisexual",
    ["Esportes", "Dança", "Filmes de comédia, romance e ação"],
    ["..."]
  ),
  new Charcard(
    "images/Leonice1.png",
    "Leonice",
    1.65,
    19,
    "Bisexual",
    ["Filmes de terror e gore", "Músicas de Rock e metal"],
    ["..."]
  ),
  new Charcard(
    "images/Rebeca1.png",
    "Rebeca",
    1.7,
    20,
    "Heterossexual",
    ["Filmes de romance, comédia", "Músicas animadas, pop e eletrônica"],
    ["..."]
  ),
  new Charcard(
    "images/Hector1.png",
    "Hector",
    1.83,
    20,
    "Homossexual",
    ["Literatura", "escrita", "música clássica, calma e MPB"],
    ["..."]
  ),
  new Charcard(
    "images/Ruty1.png",
    "Ruty",
    1.75,
    20,
    "Homossexual",
    ["Música de rock e pop", "filmes de romance e comédia"],
    ["..."]
  ),
  new Charcard(
    "images/Kuks1.png",
    "Kuks",
    1.72,
    15,
    "eita bixo sexo kkkkkk",
    ["tenho"],
    ["muitos"]
  ),
];

characters.forEach((character) => {
  charactersShow[0].appendChild(character.create());
});

mainBody.replaceChild(
  videoPlayer.create(),
  mainBody.querySelector("div.intro")
);
