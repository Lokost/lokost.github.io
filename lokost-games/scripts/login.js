const passinput = document.getElementById("password");
const password = "lokostgames2024";
const keyPress = document.createElement("audio");
const loginButton = document.getElementById("login");
const loginForm = document.forms["login"];
keyPress.src = "sounds/keypress.ogg";
keyPress.autoplay = true;
document.body.appendChild(keyPress);

var index = 0;
addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    if (index < password.length) {
      passinput.value += password[index];
      index++;
      keyPress.play();
    } else {
      loginButton.classList.remove("disabled");
      loginButton.disabled = false;
    }
  }, 200);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  location.href = "desktop.html";
});
