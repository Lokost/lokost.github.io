// Get variables from URL
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const course = urlParams.get("course");

// Get elements from HTML with DOM
const classesGrid = document.querySelector(".classes");
const courseName = document.querySelectorAll(".course-name");

// Get menu buttons and set active button based on course
const menuButtons = document
  .querySelectorAll(".menu-button")
  .forEach((element) => {
    if (element.getAttribute("course") == course) {
      console.log(element.getAttribute("course"));
      element.classList.add("active");
    }
  });

// Change primary color and the course name
if (course == "informatica") {
  courseName.forEach((element) => (element.innerText = "Informática"));
  setPrimary("#9a0000");
} else if (course == "design") {
  courseName.forEach((element) => (element.innerText = "Design Gráfico"));
  setPrimary("#00ba18");
} else if (course == "programacao") {
  courseName.forEach((element) => (element.innerText = "Programação"));
  setPrimary("#00F");
}

// Classes main class
class Class {
  constructor(course, ID, title, desc) {
    this.course = course;
    this.id = ID;
    this.title = title;
    this.desc = desc;
  }

  // Return the class as a HTML element
  build() {
    return `<a
            href="video-class.html?course=${this.course}&video=${this.id}"
            class="class-button"
          >
            <img src="https://img.youtube.com/vi/${this.id}/maxresdefault.jpg"" alt="" />
            <h3>${this.title}</h3>
            <p>${this.desc}</p>
          </a>`;
  }
}

// Classes list (Just tests any official)
const classes = [
  new Class(
    "programacao",
    "zcl8DcEoymw",
    "Programação para internet 1",
    "Introdução completa ao curso."
  ),
  new Class(
    "informatica",
    "364P1moc3G0",
    "Criação de jogos com Renpy 1",
    "Inicie a criar o seu próprio jogo com Renpy"
  ),
];

// Insert the classes into the page
function buildClasses() {
  classesGrid.innerHTML = "";
  if (classes.length > 0) {
    classes.forEach((element) => {
      if (element.course == course) {
        classesGrid.innerHTML += element.build();
      }
    });
  } else {
    classesGrid.innerHTML += `<h1>Nenhuma aula encontrada</h1>`;
  }
}

// load the classes on load completed
document.onload = buildClasses();
