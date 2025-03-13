import FormConstructor, { idGen } from "./formConstructor.js";

const formSetting = document.getElementById("form-setting");
const copySetting = document.getElementById("copy-setting");
const pasteSetting = document.getElementById("paste-setting");
const applySetting = document.getElementById("apply-setting");
const settings = document.getElementById("settings");
const dialog = document.getElementById("dialog");
const settingsBtn = document.getElementById("settings-btn");
const formConstructor = new FormConstructor(notify, openDialog);
const theme = document.getElementById("theme");
const fontSize = document.getElementById("font-size");
const space = document.getElementById("space");
const deleteFormBtn = document.getElementById("delete-setting");
const file = document.getElementById("file");
const fileDrop = document.getElementById("drop-file");
const exportFile = document.getElementById("export");
const copyMode = document.getElementById("copy-mode");
const main = document.querySelector("main");
const newForm = document.getElementById("new-form");
const copyForm = document.getElementById("copy-form");
const history = document.getElementById("history");
const clearForm = document.getElementById("clear-form");
const save = document.getElementById("save-template");
const load = document.getElementById("load-template");
let dragover = 0;
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

const formTip = `
  Caracteres especiais para fazer o seu formulário:
  <b>No começo da linha</b>
  <table cols=2>
    <tr>
      <td>Símbolo</td>
      <td>Função</td>
    </tr>
    <tr>
      <td>+</td>
      <td>Cria uma área de texto maior</td>
    </tr>
  </table>
  <b>No fim da linha</b>
  <table>
    <tr>
      <td>Símbolo</td>
      <td>Função</td>
    </tr>
    <tr>
      <td>></td>
      <td>Cria um campo de seleção, precisando que as opções fiquem na próxima linha dentro de colchetes "[]"</td>
    </tr>
    <tr>
      <td>:</td>
      <td>Cria um campo de texto com opções, também precisando que as opções fiquem na próxima linha dentro de colchetes "[]"</td>
    <tr>
    <tr>
      <td>?</td>
      <td>Cria um switch de verdadeiro ou falso, caso tenha uma lista na próxima lista, serão criadas novos campos seguindo os mesmos principios, apenas aceitando texto ou área de texto.</td>
    <tr>
    <tr>
      <td>?v</td>
      <td>Cria o switch já ativo.</td>
    <tr>
    <tr>
      <td>?f</td>
      <td>Cria o switch já inativo.</td>
    <tr>
    <tr>
      <td>!</td>
      <td>Faz com que o campo seja inativo quando o switch estiver ativo.</td>
    <tr>
  </table>
`;

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
  if (typeof content == "string") dialogContent.innerHTML = content;
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
  notification.innerHTML = `<h2>${title}</h2><div id="notification-content"></div><audio src="assets/notification.wav" autoplay id="audio">`;
  notification.querySelector("#audio").volume = 0.2;
  if (typeof content == "string")
    notification.querySelector("#notification-content").innerHTML = content;
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

function handleFile(file) {
  const reader = new FileReader();
  console.log(file);
  let fileData;
  reader.onload = (e) => {
    fileData = JSON.parse(e.target.result);
    if (
      fileData.settings &&
      fileData.type &&
      ["lokof", "lokof2"].includes(fileData.type)
    ) {
      formConstructor.loadSettings(fileData);
      notify("Importado", `Carregados os dados de <b>${file.name}</b>`);
      main.innerHTML = "";
      formSetting.value = fileData.settings;
      main.appendChild(formConstructor.build());
      document.querySelectorAll(".floating-button").forEach((e) => {
        e.classList.remove("disabled");
      });
    } else {
      notify("Erro", "O arquivo não é um formulário válido");
    }
  };
  reader.readAsText(file);
}

function exportOptions() {
  if (!formConstructor.settings || formConstructor.settings.length == 0) {
    openDialog("Erro", "O formulário não pode estar vazio");
    return;
  }
  const blob = new Blob([JSON.stringify(formConstructor.getOptions())], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  let format;
  const container = document.createElement("div");
  container.innerHTML = `Baixar em:
      <div class="actions">
      <button id="json">json</button>
      <button id="lformset">lformset</button>
    </div>`;
  container.querySelectorAll("button").forEach((e) => {
    e.onclick = () => {
      format = e.id;
      a.download = `lokoForm-${idGen(true, 5)}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      closeScreen(dialog);
    };
  });
  openDialog("Exportar", [container]);
}

function unlockFloating() {
  document.querySelectorAll(".floating-button").forEach((e) => {
    e.classList.remove("disabled");
  });
}

function deleteForm() {
  localStorage.removeItem("settings");
  formConstructor.settings = "";
  location.reload();
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
  if (formConstructor.settings == formSetting.value) {
    closeScreen(settings);
    return;
  }
  formConstructor.settings = formSetting.value;
  if (formSetting.value.length > 0) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(formConstructor.build());
    closeScreen(settings);
    unlockFloating();
  } else {
    openDialog("Erro", "O formulário não pode estar vazio");
  }
};

deleteFormBtn.onclick = () => {
  const container = document.createElement("div");
  const desc = document.createElement("p");
  desc.innerText = "Certeza que deseja apagar a configuração atual?";
  const deletBtn = document.createElement("button");
  deletBtn.innerText = "Apagar";
  container.append(desc, deletBtn);
  openDialog("Deletar formulário", [container]);
  deletBtn.onclick = () => {
    deleteForm();
  };
};

settingsBtn.onclick = () => {
  openSettings();
};

theme.onclick = () => {
  document.body.classList.toggle("dark");
};

file.onchange = (e) => {
  handleFile(e.target.files[0]);
};

exportFile.onclick = () => {
  exportOptions();
};

newForm.onclick = () => {
  if (formConstructor.settings.length > 0) formConstructor.createNew();
};

copyForm.onclick = () => {
  if (formConstructor.settings.length > 0)
    formConstructor.copy(copyMode.value, space.checked);
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
    function recentCard(id, text) {
      const recentElement = document.createElement("div");
      recentElement.classList.add("card", "recent");
      recentElement.id = id;
      if (id == formConstructor.actual) recentElement.classList.add("selected");
      recentElement.onclick = () => {
        formConstructor.loadRecent(id);
        document.getElementById("dialog").style.display = "none";
      };
      recentElement.innerText = text;
      return recentElement;
    }

    formConstructor.recents.forEach((recent) => {
      elements.push(
        recentCard(
          recent.id,
          `${firstElementData.label}: ${recent[firstElementData.id]}`.slice(
            0,
            30
          )
        )
      );
    });

    recentView.append(...elements);
    console.log(recentView);
    openDialog("Histórico", [recentView]);
  }
};

clearForm.onclick = () => {
  formConstructor.clearForm();
};

save.onclick = () => {
  formConstructor.saveTemplate();
};

load.onclick = () => {
  if (formConstructor.templates.length > 0) {
    const templateView = document.createElement("div");
    templateView.classList.add("recent-grid");

    function templateCard(id, text) {
      const templateElement = document.createElement("div");
      const templateDelete = document.createElement("button");
      templateDelete.innerHTML = `<spam class="material-symbols-outlined">delete</spam>`;
      templateDelete.onclick = (e) => {
        e.stopPropagation();
        formConstructor.removeTemplate(id);
        templateElement.remove();
      };
      templateElement.classList.add("card", "recent", "template");
      templateElement.id = id;
      templateElement.onclick = () => {
        formConstructor.loadTemplate(id);
        document.getElementById("dialog").style.display = "none";
      };
      templateElement.innerText = text;
      templateElement.append(templateDelete);
      return templateElement;
    }

    formConstructor.templates.forEach((template) => {
      templateView.append(
        templateCard(template.id, template.name.slice(0, 30))
      );
    });
    openDialog("Templates", [templateView]);
  }
};

document.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dragover++;
  fileDrop.classList.add("visible");
});

document.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dragover--;
  console.log(dragover);
  if (dragover <= 0) fileDrop.classList.remove("visible");
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  fileDrop.classList.remove("visible");
  handleFile(e.dataTransfer.files[0]);
});

openDialog("Bem vindo", "Muita coisa nova foi adicionada! Venha conferir!");

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
          formConstructor.copy(copyMode.value, space.checked);
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

document
  .querySelector("div.menu")
  .querySelectorAll("button")
  .forEach((e) => {
    const command = e.onclick;
    e.onclick = () => {
      command();
      document.querySelector("input.menu").checked = false;
    };
  });

document.getElementById("form-help").onclick = () => {
  openDialog("Ajuda", formTip);
};

formConstructor.loadLocal((e) => {
  main.innerHTML = "";
  formSetting.value = e;
  main.append(formConstructor.build());
  unlockFloating();
  notify("Carregado", "Encontradas configurações locais");
  closeScreen(dialog);
});
