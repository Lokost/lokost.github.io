import FormConstructor from "./formConstructor.js";

const formSetting = document.getElementById("form-setting");
const copySetting = document.getElementById("copy-setting");
const pasteSetting = document.getElementById("paste-setting");
const applySetting = document.getElementById("apply-setting");
const settings = document.getElementById("settings");
const dialog = document.getElementById("dialog");
const settingsBtn = document.getElementById("settings-btn");
const formConstructor = new FormConstructor(notify);
const theme = document.getElementById("theme");
const fontSize = document.getElementById("font-size");
const copyMode = document.getElementById("copy-mode");
const main = document.querySelector("main");
const newForm = document.getElementById("new-form");
const copyForm = document.getElementById("copy-form");
const history = document.getElementById("history");
const clearForm = document.getElementById("clear-form");
let cheatIndex = 0;
const cheat = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
];

function openScreen(element) {
  element.style.display = "flex";
  element.classList.remove("close-screen");
  element.classList.add("open-screen");
}

function closeScreen(element) {
  element.classList.remove("open-screen");
  element.classList.add("close-screen");
}

function openDialog(title, content) {
  const dialogContent = document.getElementById("dialog-content");
  const dialogTitle = document.getElementById("dialog-title");
  dialogTitle.innerText = title;
  dialogContent.innerHTML = "";
  if (typeof content == "string") dialogContent.innerText = content;
  else dialogContent.append(...content);
  dialog.onclick = (e) => {
    if (e.target.id == "dialog") closeScreen(dialog);
  };
  openScreen(dialog);
}

function notify(title, content) {
  const notificationArea = document.querySelector(".notification-area");
  const notification = document.createElement("div");
  notification.classList.add("card");
  notification.innerHTML = `<h2>${title}</h2><div id="notification-content">${content}</div><audio src="assets/notification.wav" autoplay id="audio">`;
  notification.querySelector("#audio").volume = 0.2;
  if (typeof content == "string")
    notification.querySelector("#notification-content").innerText = content;
  else notification.querySelector("#notification-content").append(...content);
  notificationArea.appendChild(notification);
  notification.onanimationend = () => notification.remove();
}

function openSettings() {
  openScreen(settings);
  settings.onclick = (e) => {
    if (e.target.id == "settings") {
      closeScreen(settings);
    }
  };
}

function loadSession() {
  if (!sessionStorage.getItem("settings") && !sessionStorage.getItem("recents"))
    return;
  formConstructor.settings = sessionStorage.getItem("settings");
  formConstructor.recents = JSON.parse(sessionStorage.getItem("recents"));
}

copySetting.onclick = () => {
  navigator.clipboard.writeText(formSetting.value).then(() => {
    openDialog(
      "Copiado",
      "O formulário foi copiado para a área de transferência"
    );
  });
};

pasteSetting.onclick = () => {
  navigator.clipboard.readText().then((clipText) => {
    formSetting.value = clipText;
  });
};

applySetting.onclick = () => {
  formConstructor.settings = formSetting.value;
  if (formSetting.value.length > 0) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(formConstructor.build());
    closeScreen(settings);
    newForm.classList.remove("disabled");
    copyForm.classList.remove("disabled");
    history.classList.remove("disabled");
    clearForm.classList.remove("disabled");
  } else {
    openDialog("Erro", "O formulário não pode estar vazio");
  }
};

settingsBtn.onclick = () => {
  openSettings();
};

theme.onclick = () => {
  document.body.classList.toggle("dark");
};

newForm.onclick = () => {
  if (formConstructor.settings.length > 0) formConstructor.createNew();
};

copyForm.onclick = () => {
  if (formConstructor.settings.length > 0) formConstructor.copy(copyMode.value);
};

history.onclick = () => {
  formConstructor.saveRegister();
  if (formConstructor.recents.length > 0) {
    const firstElementData = {
      label: formConstructor.elements[0].label,
      id: formConstructor.elements[0].id,
    };
    let elements = [];
    const recentView = document.createElement("div");
    recentView.classList.add("recent-grid");
    console.log(formConstructor.elements);
    console.log(formConstructor.recents);

    formConstructor.recents.forEach((recent) => {
      const recentElement = document.createElement("div");
      recentElement.classList.add("card", "recent");
      recentElement.id = recent.id;
      if (recent.id == formConstructor.actual)
        recentElement.classList.add("selected");
      recentElement.onclick = () => {
        formConstructor.loadRecent(recent.id);
        document.getElementById("dialog").style.display = "none";
      };
      recentElement.innerText = `${firstElementData.label}: ${
        recent[firstElementData.id]
      }`.slice(0, 30);
      elements.push(recentElement);
      console.log(recentElement);
    });

    recentView.append(...elements);
    console.log(recentView);
    openDialog("Histórico", [recentView]);
  }
};

clearForm.onclick = () => {
  formConstructor.clearForm();
};

openDialog("Bem vindo", "Loko Form está de cara nova, venha conferir!");

fontSize.onchange = (e) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--font-size", `${e.target.value}`);
};

window.onkeydown = (e) => {
  if (e.altKey) {
    switch (e.key.toLowerCase()) {
      case "n":
        if (formConstructor.settings.length > 0) formConstructor.createNew();
        else openDialog("Erro", "O formulário não pode estar vazio");
        break;

      case "c":
        if (
          formSetting.value.length > 0 &&
          formConstructor.elements.length > 0
        ) {
          console.log(copyMode.value);
          formConstructor.copy(copyMode.value);
        } else notify("Erro", "O formulário não pode estar vazio");
        break;
      case "l":
        formConstructor.clearForm();
      case "/":
        openDialog(
          "Atalhos",
          `Alt + N: Novo formulário\nAlt + C: Copiar formulário\nAlt + L: Limpar formulário\nESC: Configurações\nCódigo Konami: Segredo`
        );
    }
  } else {
    switch (e.key) {
      case "Escape":
        if (dialog.style.display == "flex") dialog.style.display = "none";
        else if (settings.style.display == "flex")
          settings.style.display = "none";
        else openSettings();
        break;
      default:
        if (e.key == cheat[cheatIndex]) cheatIndex++;
        else cheatIndex = 0;
        if (cheatIndex >= cheat.length) {
          const secrets = [
            "assets/secrets/secret.mp4",
            "assets/secrets/lokost.gif",
            "assets/secrets/que.jpeg",
          ];
          const secret = secrets[Math.floor(Math.random() * secrets.length)];
          const content = document.createElement(
            secret.endsWith(".mp4") ? "video" : "img"
          );
          content.src = secret;
          content.setAttribute("autoplay", true);
          openDialog("Aviso", [content]);
          cheatIndex = 0;
        }
    }
  }
};

if (sessionStorage.getItem("settings")) {
  main.innerHTML = "";
  loadSession();
}
