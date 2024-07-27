const idadeShow = document.getElementById("idade");

const today = new Date();
const birthDay = Date.parse("2001-09-28");
var age;

if (today.getDay() >= 28 && today.getMonth() >= 9) {
  age = today.getFullYear() - 2001;
} else {
  age = today.getFullYear() - 2001 - 1;
}

idadeShow.innerText = age;
