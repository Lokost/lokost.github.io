const idadeShow = document.getElementById("idade");

const today = new Date();
const birthDay = new Date(Date.parse("2001-09-28"));
var age;

if (
  today.getDay() >= birthDay.getDay() &&
  today.getMonth() >= birthDay.getMonth()
) {
  age = today.getFullYear() - birthDay.getFullYear();
} else {
  age = today.getFullYear() - birthDay.getFullYear() - 1;
}

idadeShow.innerText = `${age} anos`;
