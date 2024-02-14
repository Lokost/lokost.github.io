const clock = document.getElementById("clock");

function updateClock() {
  let time = new Date();
  let day = time.getDate().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let month = time.getMonth().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let year = time.getFullYear().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let hour = time.getHours().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let minute = time.getMinutes().toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let seconds = time.getSeconds();

  clock.innerText = `${hour}${
    seconds % 2 == 0 ? ":" : " "
  }${minute}\n${day}/${month}/${year}`;
}

updateClock();

setInterval(() => {
  updateClock();
}, 1000);
