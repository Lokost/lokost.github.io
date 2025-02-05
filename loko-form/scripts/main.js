import FormConstructor from "./formConstructor old.js";

const formSetting = document.getElementById("form-setting");
const copySetting = document.getElementById("copy-setting");
const pasteSetting = document.getElementById("paste-setting");
const applySetting = document.getElementById("apply-setting");
const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settings-btn");
const formConstructor = new FormConstructor(openDialog);
const theme = document.getElementById("theme");
const fontSize = document.getElementById("font-size");

function openDialog(title, content) {
  const dialog = document.getElementById("dialog");
  const dialogContent = document.getElementById("dialog-content");
  const dialogTitle = document.getElementById("dialog-title");
  dialogTitle.innerText = title;
  dialogContent.innerHTML = content;
  dialog.onclick = () => {
    dialog.style.display = "none";
  };

  dialog.style.display = "flex";
}

function openSettings() {
  settings.style.display = "flex";
  settings.onclick = (e) => {
    if (e.target.id == "settings") {
      settings.style.display = "none";
    }
  };
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
  if (formConstructor.settings.length > 0) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(formConstructor.build());
    settings.style.display = "none";
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

openDialog(
  "Bem vindo",
  "Bem vindo ao Loko Form, aqui você pode criar formulários personalizados, basta preencher os campos e clicar em 'Criar formulário'."
);

fontSize.onchange = (e) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--font-size", `${e.target.value}`);
};

window.onkeydown = (e) => {
  if (e.ctrlKey) {
    switch (e.key) {
      case "c":
        if (formConstructor.settings.length > 0) formConstructor.copyFormated();
        else openDialog("Erro", "O formulário não pode estar vazio");
        break;
    }
  } else if (e.altKey) {
    switch (e.key) {
      case "n":
        if (formConstructor.settings.length > 0) formConstructor.createNew();
        else openDialog("Erro", "O formulário não pode estar vazio");
        break;
    }
  } else {
    switch (e.key) {
      case "Escape":
        if (dialog.style.display == "flex") dialog.style.display = "none";
        else if (settings.style.display == "flex")
          settings.style.display = "none";
        else openSettings();
        break;
    }
  }
};
