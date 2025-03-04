export function idGen(showing = true, size = 15) {
  const id = Math.random().toString(10).substring(2, size);
  return showing ? id : id + "!";
}

function stringToJson(str, list = false) {
  if (!list)
    str = "[" + str.map((line) => JSON.stringify(line.trim())).join(",") + "]";
  else {
    str = str;
    str = str
      .replace(/^\[|\]$/g, "")
      .split(",") // Separa por vírgula
      .map((item) => `"${item.trim()}"`);
    str = "[" + str.join(", ") + "]";
  }

  return JSON.parse(str);
}

class inputField {
  constructor(
    label,
    type,
    placeholder,
    extraValues = [],
    id = null,
    dataListId = null,
    visible = true,
    prevalue = null
  ) {
    this.label = typeof label === "string" ? label.trim() : null;
    this.type = type;
    this.placeholder = placeholder.trim();
    this.extraValues = extraValues;
    this.dataListId = dataListId;
    this.id = id;
    this.container =
      this.type == "separator"
        ? document.createElement("span")
        : document.createElement("label");

    this.visible = visible;
    this.prevalue = prevalue;
  }

  getType() {
    const types = {
      text: document.createElement("input"),
      textArea: document.createElement("textarea"),
      select: document.createElement("select"),
      conditional: document.createElement("input"),
      data: document.createElement("datalist"),
      separator: null,
    };

    return types[this.type];
  }

  get value() {
    if (this.type === "conditional") {
      return this.input.checked ? true : false;
    } else if (this.type === "data") {
      return "";
    } else if (this.type === "select") {
      return this.extraValues[this.input.selectedIndex];
    } else {
      return this.input.value;
    }
  }

  set value(value) {
    if (this.type === "conditional") {
      this.changeSelection(value || false);
      this.input.checked = value || false;
    } else if (this.type === "data") {
      return;
    } else if (this.type === "select") {
      if (value == "" || value == "Nenhum") this.input.selectedIndex = 0;
      else this.input.selectedIndex = this.extraValues.indexOf(value);
    } else {
      this.input.value = value;
    }
  }

  set visible(value) {
    if (value) {
      this.container.style.display = "flex";
    } else {
      this.container.style.display = "none";
    }
  }

  get visible() {
    return this.container.style.display === "flex";
  }

  changeSelection(checked) {
    try {
      for (let element of this.extraValues) {
        if (element.endsWith("!")) {
          const htmlElement = document.getElementById(element);
          htmlElement.parentElement.style.display = checked ? "none" : "flex";
          if (checked) htmlElement.value = "";
        } else {
          const htmlElement = document.getElementById(element);
          htmlElement.parentElement.style.display = checked ? "flex" : "none";
          if (!checked) htmlElement.value = "";
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  toJson() {
    return {
      label: this.label,
      type: this.type,
      placeholder: this.placeholder,
      extraValues: this.extraValues,
      dataListId: this.dataListId,
      id: this.id,
      visible: this.visible,
      prevalue: this.prevalue,
    };
  }

  render() {
    this.container.classList.add(
      this.type != "conditional" ? "input-field" : "conditional-field"
    );
    this.container.innerHTML = this.label;

    const input = this.getType();
    input.setAttribute("placeholder", this.placeholder);
    input.id = this.id;
    this.container.appendChild(input);

    if (this.type === "select") {
      if (!this.extraValues.includes("Nenhum"))
        this.extraValues.unshift("Nenhum");
      this.extraValues.forEach((value) => {
        const option = document.createElement("option");
        option.textContent = value;
        option.setAttribute("value", value);
        input.appendChild(option);
      });
    } else if (this.type === "conditional") {
      input.type = "checkbox";
      input.onchange = (e) => this.changeSelection(e.target.checked);
      const check = document.createElement("div");
      check.classList.add("checkmark");
      this.container.append(check);
    } else if (this.type === "data") {
      input.id = this.id;
      this.extraValues.forEach((value) => {
        const option = document.createElement("option");
        option.setAttribute("value", value);
        input.appendChild(option);
      });
    } else {
      if (this.type == "text") input.type = "text";
      if (this.dataListId) input.setAttribute("list", this.dataListId);
      if (this.extraValues.length > 0 && this.dataListId) {
        input.setAttribute("list", this.dataListId);
      }
    }

    if (this.type != "data")
      input.onfocus = () => {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      };

    this.input = input;
    if (this.prevalue != null) this.value = this.prevalue;
    return this.type != "data" ? this.container : input;
  }
}

export default class FormContructor {
  constructor(notify, dialog) {
    this.notify = notify;
    this.dialog = dialog;
    this.container = document.createElement("form");
    this.container.classList.add("card", "form");
    this.elements = [];
    this.recents = [];
    this.templates = [];
    this.actual = null;
  }

  addField(
    label,
    type,
    extraValues = [],
    id = null,
    dataListId = null,
    visible = true,
    prevalue = null
  ) {
    const field = new inputField(
      label,
      type,
      `Preencha com ${label}`,
      extraValues,
      id,
      dataListId,
      visible,
      prevalue
    );
    this.container.append(field.render());
    if (field.type != "separator") this.elements.push(field);
    return field;
  }

  recreateFields() {
    this.container.innerHTML = "";
    const elements = [...this.elements];
    this.elements = [];
    elements.forEach((element) => {
      this.addField(
        element.label,
        element.type,
        element.extraValues,
        element.id,
        element.dataListId,
        element.visible,
        element.prevalue
      );
    });
  }

  getInputs(values, check = false) {
    // Get all the Ids of the created inputs
    let ids = [];

    // Index for the while pass through the lines
    let i = 0;

    // Using while because some lines can be properties
    while (i < values.length) {
      // If the line does not have content, will be passed
      if (values[i].trim() == "") {
        i++;
        continue;
      }

      // holders for the properties of the inputs
      let holder;
      let options;
      let type;
      let setting = values[i].trim();
      let showing;

      showing = !setting.endsWith("!");
      if (check && !showing) showing = false;

      if (setting.endsWith("!")) setting = setting.replace("!", "");

      function haveOptions() {
        return values[i + 1].includes("[");
      }

      function convertOptions() {
        i++;
        if (values[i].includes("["))
          if (values[i].includes("]")) {
            console.log("Básica");
            return stringToJson(values[i], true);
          } else {
            console.log("composta");
            let hold = values[i + 1];
            i++;
            while (!values[i].includes("]")) {
              hold += "," + values[i];
              i++;
            }
            return (hold += "," + values[i]);
          }
      }

      type = setting.startsWith("+")
        ? "textArea"
        : setting.endsWith(">")
        ? "select"
        : setting.endsWith("?") ||
          setting.toLowerCase().endsWith("?v") ||
          setting.toLowerCase().endsWith("?f")
        ? "conditional"
        : "text";

      if (type == "text" && setting.endsWith(":")) {
        holder = setting.replace(":", "");
        if (haveOptions()) options = convertOptions();
        if (options) {
          const dataId = this.addField(holder, "data", options, idGen()).id;
          ids.push(
            this.addField(holder, type, [], idGen(showing), dataId, showing).id
          );
        } else {
          ids.push(
            this.addField(holder, type, [], idGen(showing), null, showing).id
          );
        }
      } else if (type == "textArea") {
        holder = setting.replace("+", "");
        ids.push(
          this.addField(holder, type, [], idGen(showing), null, showing).id
        );
      } else if (type == "select") {
        holder = setting.replace(">", "");
        if (haveOptions()) options = convertOptions();
        ids.push(
          this.addField(holder, type, options, idGen(showing)),
          null,
          showing.id
        );
      } else if (type == "conditional") {
        let preValue = setting.endsWith("?v")
          ? true
          : setting.endsWith("?f")
          ? false
          : null;

        holder =
          preValue == null
            ? setting.replace("?", "")
            : preValue
            ? setting.replace("?v", "")
            : setting.replace("?f", "");
        if (haveOptions()) options = convertOptions();
        if (options) {
          let check = this.addField(
            holder,
            type,
            [],
            idGen(),
            null,
            true,
            preValue
          );

          ids.push(check.id);
          check.extraValues = this.getInputs(options, true);
          check.changeSelection(preValue || false);
        } else
          ids.push(
            this.addField(
              holder,
              type,
              options,
              idGen(showing),
              null,
              showing,
              preValue
            ).id
          );
      } else {
        holder = setting;
        ids.push(
          this.addField(holder, type, [], idGen(showing), null, showing).id
        );
      }
      i++;
    }
    return ids;
  }

  set settings(value) {
    this.__settings = value;
    if (value.trim() == "") return;
    value = value.split("\n");
    value = stringToJson(value);

    this.container.innerHTML = "";
    this.actual = null;
    this.recents = [];
    this.elements = [];
    this.templates = [];
    this.getInputs(value);
  }

  get settings() {
    return this.__settings;
  }

  copy(mode, extraSpace = false) {
    let values = {};
    this.elements.forEach((element) => {
      let value;
      if (element.type == "conditional") value = element.value;
      else if (typeof element.value == "string") value = element.value.trim();
      else value = element.value;
      if (value != "" || typeof value == "boolean")
        values[element.label] = value;
    });

    if (mode == "json") {
      navigator.clipboard.writeText(JSON.stringify(values)).then(() => {
        this.notify(
          "Copiado",
          "O formulário foi copiado para a área de transferência"
        );
      });
    } else if (mode == "text") {
      let data = "";
      for (let key of Object.keys(values)) {
        const value = values[key];
        if (typeof value == "boolean") {
          data += `${key}: ${value ? "Sim" : "Não"}\n`;
          if (extraSpace) data += "\n";
          continue;
        }
        if (value != "") data += `${key}: ${value}\n`;
        if (extraSpace) data += "\n";
      }
      navigator.clipboard.writeText(data).then(() => {
        this.notify(
          "Copiado",
          "O formulário foi copiado para a área de transferência"
        );
      });
    }
  }

  createNew() {
    if (this.actual != null) this.saveRegister();
    this.actual = idGen();
    this.saveRegister(true);
    this.clearForm();
  }

  clearForm() {
    this.elements.forEach((e) => {
      if (e.prevalue != null) e.value = e.prevalue;
      else e.value = "";
    });
    this.toTop();
  }

  saveRegister(newForm = false) {
    if (!newForm) {
      let registerIndex = this.recents.findIndex((i) => i.id == this.actual);
      if (registerIndex != -1) {
        const register = {
          id: this.actual,
          ...this.elements.reduce((acc, element) => {
            acc[element.id] = element.value;
            return acc;
          }, {}),
        };
        this.recents[registerIndex] = register;
      } else {
        this.saveNew();
      }
    } else {
      this.saveNew();
    }
  }

  saveNew() {
    this.recents.push({
      id: this.actual,
      ...this.elements.reduce((acc, element) => {
        acc[element.id] = element.value;
        return acc;
      }, {}),
    });
  }

  saveTemplate() {
    this.saveRegister();
    const container = document.createElement("div");
    container.classList.add("input-field");
    const input = document.createElement("input");
    const save = document.createElement("button");
    save.innerText = "Salvar";
    const template = {
      id: idGen(),
      name: input.value,
      content: this.recents.find((recent) => recent.id == this.actual),
    };
    save.onclick = () => {
      if (this.templates.find((template) => template.name == input.value)) {
        this.notify("Erro", "Já existe um template com esse nome");
        return;
      }
      template.name = input.value;
      this.templates.push(template);
      this.dialog("Salvar modelo", "Modelo salvo com sucesso");
    };
    container.append(input, save);
    this.dialog("Salvar modelo", [container]);
  }

  loadTemplate(id) {
    const template = this.templates.find((template) => template.id == id);
    this.elements.forEach((element) => {
      element.value = template.content[element.id];
    });
  }

  removeTemplate(id) {
    this.templates = this.templates.filter((template) => template.id != id);
  }

  loadRecent(id) {
    this.actual = id;
    document.querySelector(".recent.selected")?.classList.remove("selected");
    document.getElementById(id).classList.add("selected");

    this.elements.forEach((element) => {
      element.value = this.recents.find((recent) => recent.id == id)[
        element.id
      ];
    });
    this.toTop();
  }

  toTop() {
    this.elements[0].input.focus();
  }

  loadSettings(content) {
    this.settings = content.settings;
    this.templates = content.templates;
    this.elements = content.elements;
    this.recreateFields();
  }

  getOptions() {
    return {
      type: "lokof",
      settings: this.__settings,
      templates: this.templates,
      elements: this.elements.map((e) => e.toJson()),
    };
  }

  build() {
    this.createNew();
    return this.container;
  }
}
