const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");
const language = searchParams.get("lang");

const title = document.getElementById("title");
const description = document.getElementById("description");
const input = document.getElementById("input");
const output = document.getElementById("output");
const codeShow = document.getElementById("codeShow");
const exerciseCode = document.getElementById("code");

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
  exerciseCode.innerHTML = `${code} - ${language.toUpperCase()}`;
  title.innerHTML = exercise.title;
  description.innerHTML = exercise.description;
  input.innerHTML = exercise.input;
  output.innerHTML = exercise.output;
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


