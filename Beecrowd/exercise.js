const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");
const language = searchParams.get("lang");

const title = document.getElementById("title"),
  description = document.getElementById("description"),
  input = document.getElementById("input"),
  output = document.getElementById("output"),
  codeShow = document.getElementById("codeShow"),
  exerciseCode = document.getElementById("code"),
  uriBtt = document.getElementById("uri-button"),
  gitBtt = document.getElementById("github-button");

fetch("data.json", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    const exercise = data[code];
    setInfo(exercise);
    console.log(exercise["languages"], language);
    loadCode(exercise["languages"][language]);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function setInfo(exercise) {
  document.title = `Beecrowd - ${code} - ${language.toUpperCase()}`;
  exerciseCode.innerText = `${code} - ${language.toUpperCase()}`;
  title.innerText = exercise.title.replaceAll("\n", "<br />");
  description.innerText = exercise.description;
  input.innerText = exercise.input;
  output.innerText = exercise.output;
  uriBtt.onclick = () => {
    open(`https://judge.beecrowd.com/pt/problems/view/${code}`);
  };
  gitBtt.onclick = () => {
    const githubPath = exercise["languages"][language].replace(
      "https://raw.githubusercontent.com/Lokost/beecrowd-resolutions/main/",
      "https://github.com/lokost/beecrowd-resolutions/tree/main/"
    );
    open(githubPath, "_blank");
  };
}

function loadCode(code) {
  fetch(code, { method: "GET" })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      codeShow.value = data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
