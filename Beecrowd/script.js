const exercisesGrid = document.getElementById("exercises");
const search = document.getElementById("search");
let exercises;
let sortExercises;

fetch("./data.json", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    exercises = data;
    console.log(exercises);
    sortExercises = Object.keys(data).sort();
    listExercises();
  })
  .catch((error) => console.log(error));

function createLanguageIcon(language, exercise) {
  let icon;
  let path;
  const languages = {
    python: {
      icon: "python.svg",
      path: `exercise.html?code=${exercise}&lang=python`,
    },
    java: {
      icon: "java.svg",
      path: `exercise.html?code=${exercise}&lang=java`,
    },
    kotlin: {
      icon: "kotlin.svg",
      path: `exercise.html?code=${exercise}&lang=kotlin`,
    },
    lua: {
      icon: "lua.svg",
      path: `exercise.html?code=${exercise}&lang=lua`,
    },
    cpp: {
      icon: "cpp.svg",
      path: `exercise.html?code=${exercise}&lang=cpp`,
    },
    go: {
      icon: "go.svg",
      path: `exercise.html?code=${exercise}&lang=go`,
    },
    javascript: {
      icon: "JS.svg",
      path: `exercise.html?code=${exercise}&lang=javascript`,
    },
  };

  const container = document.createElement("div");
  container.classList.add("language");
  if (language in languages) {
    icon = languages[language]["icon"];
    path = languages[language]["path"];
  } else {
    console.log(language);
    icon = "question.svg";
    path = "#";
  }

  container.innerHTML = `
    <a href="${path}">
      <img src="../images/icons/${icon}" alt="${language}">
    </a>
    `;

  console.log(container);

  return container;
}

function createExercise(code, exercise) {
  const container = document.createElement("div");
  container.classList.add("exercise", "card");
  container.innerHTML = `
      <h1>${code}</h1>
      <h2>${exercise.title}</h2>
      <div class="languages">
        ${Object.keys(exercise.languages)
          .map((language) => createLanguageIcon(language, code).outerHTML)
          .join("")}
      </div>
    </div>
  `;

  return container;
}

function listExercises(search = "") {
  exercisesGrid.innerHTML = "";
  if (search.length < 1) {
    sortExercises.forEach((exercise) => {
      exercisesGrid.append(createExercise(exercise, exercises[exercise]));
    });
    return;
  } else {
    sortExercises
      .filter((exercise) => exercise.includes(search))
      .forEach((exercise) => {
        exercisesGrid.append(createExercise(exercise, exercises[exercise]));
      })
      .forEach((exercise) => {
        exercisesGrid.append(createExercise(exercise, exercises[exercise]));
      });
  }
}

search.onkeyup = (e) => {
  if (e.key == "Enter") listExercises(search.value);
};
