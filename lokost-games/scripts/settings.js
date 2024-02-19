import { App } from "./app.js";

const visualSettings = document.querySelector(":root");
const changeVisualSettings = (variable, value) =>
  visualSettings.style.setProperty(variable, value);

function optionModel(label, type, variable, istrue = "", isfalse = "") {
  var value = getComputedStyle(visualSettings).getPropertyValue(variable);
  console.log(value);

  const optionContainer = document.createElement("div");
  optionContainer.classList.add("setting-option");

  const option = document.createElement("p");
  option.innerText = label;
  optionContainer.append(option);

  const optionValue = document.createElement("input");
  optionValue.type = type;
  optionValue.name = label;
  console.log(value == istrue);
  if (type == "checkbox") {
    value == istrue
      ? optionValue.setAttribute("checked", true)
      : optionValue.removeAttribute("checked");
  } else optionValue.value = value;
  optionValue.oninput = (e) => {
    if (type == "checkbox") {
      if (optionValue.checked) changeVisualSettings(variable, istrue);
      else changeVisualSettings(variable, isfalse);
    } else {
      changeVisualSettings(variable, optionValue.value);
    }
  };
  optionContainer.append(optionValue);

  return optionContainer;
}

function settings() {
  const settingsContainer = document.createElement("div");
  settingsContainer.classList.add("settings");

  const options = [
    optionModel("Ativar blur", "checkbox", "--blur", "blur(4px)", "none"),
    optionModel(
      "Ativar transparência",
      "checkbox",
      "--transparency",
      "rgba(50, 50, 50, 0.95)",
      "rgba(50, 50, 50, 1)"
    ),
  ];

  settingsContainer.append(...options);

  return App(settingsContainer, "Configurações");
}

export { settings };
