// timer

const timer = (ms) => new Promise((r) => setTimeout(r, ms));

// create popup
async function Notify(text, seconds = 5) {
  const notify = document.createElement("div");
  notify.style = `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: black;
    position: fixed;
    color: white;
    bottom: 60px;
    left: 50%;
    animation: slide-in 1s ease-out forwards;
    width: 300px;
    margin-left: -150px;
    border-radius: 20px 20px 2px 2px;
    z-index: 905;
  `;

  const container = document.createElement("div");
  container.style = `
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: black;
            color: white;
            text-align: center;
            padding: 1.5rem;
            border-radius: 30px;
        `;
  container.innerText = text;

  const timebar = document.createElement("div");
  timebar.style.height = "2px";
  timebar.style.background = "blue";
  timebar.style.borderRadius = "20px";
  timebar.style.width = "0%";
  timebar.style.alignSelf = "start";

  notify.append(container, timebar);

  document.querySelector("main").appendChild(notify);
  await timer(500);
  const audio = new Audio("sounds/notification.wav");
  audio.volume = 0.5;
  audio.play();
  await timer(500);
  timebar.style.animation = `spread ${seconds}s linear forwards`;

  await timer(seconds * 1000);

  notify.style.animation = "slide-out 1s ease-in forwards";
  await timer(2000);
  notify.remove(notify);
}

export { Notify };
