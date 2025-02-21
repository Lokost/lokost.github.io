function idGen() {
  return Math.random().toString(10).substring(2, 15);
}

class inputField {
  constructor(
    label,
    type,
    placeholder,
    extraValues = [],
    id = null,
    dataListId = null,
    visible = true
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
      return this.input.checked ? "Sim" : "Não";
    } else if (this.type === "data") {
      return "";
    } else if (this.type === "select") {
      return this.input.options[this.input.selectedIndex].text || "Nenhum";
    } else {
      return this.input.value;
    }
  }

  set value(value) {
    if (this.type === "conditional") {
      this.input.checked = value || false;
    } else if (this.type === "data") {
      return;
    } else if (this.type === "select") {
      if (value == "") this.input.selectedIndex = 0;
      this.input.options[this.input.selectedIndex].text = value;
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

  render() {
    if (this.type === "separator") {
      this.container.classList.add("separator");
      return this.container;
    }
    this.container.classList.add(
      this.type != "conditional" ? "input-field" : "conditional-field"
    );
    this.container.innerHTML = this.label;

    const input = this.getType();
    input.setAttribute("placeholder", this.placeholder);
    input.id = this.id;

    if (this.type === "select") {
      this.extraValues.unshift("Nenhum");
      this.extraValues.forEach((value) => {
        const option = document.createElement("option");
        option.textContent = value;
        option.setAttribute("value", value);
        input.appendChild(option);
      });
    } else if (this.type === "conditional") {
      input.type = "checkbox";
      input.onchange = (e) => {
        console.log(e.target.checked);
        for (let element of this.extraValues) {
          const htmlElement = document.getElementById(element);
          htmlElement.value = "";
          htmlElement.parentElement.style.display = e.target.checked
            ? "flex"
            : "none";
        }
      };
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
      input.onFocus = () => {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      };

    this.input = input;
    this.container.appendChild(input);
    console.log(this.type, input);
    return this.type != "data" ? this.container : input;
  }
}

export default class FormContructor {
  constructor(notify) {
    this.notify = notify;
    this.container = document.createElement("form");
    this.container.classList.add("form", "card");
    this.elements = [];
    this.recents = [];
    this.actual = 0;
  }

  addField(
    label,
    type,
    extraValues = [],
    id = null,
    dataListId = null,
    visible = true
  ) {
    const field = new inputField(
      label,
      type,
      `Preencha com ${label}`,
      extraValues,
      id,
      dataListId,
      visible
    );
    this.container.append(field.render());
    if (field.type != "separator") this.elements.push(field);
  }

  set settings(value) {
    if (value.trim() == "") return;

    this.container.innerHTML = "";
    this.recents = [];
    this.elements = [];
    this.__settings = value;
    value = value.split("\n").map((s) => s.trim());
    let i = 0;
    while (i < value.length) {
      if (value[i].trim() == "") {
        i++;
        continue;
      }
      let holder;
      let options;
      let type;
      let setting = value[i];
      if (setting == "") {
        continue;
      } else if (setting.endsWith(":")) {
        type = "text";
        let dataId;
        if (value[i + 1].includes("[") && value[i + 1].includes("]")) {
          dataId = idGen();
          console.log(value[i + 1]);
          options = value[i + 1]
            .replace("[", "")
            .replace("]", "")
            .split(",")
            .map((s) => s.trim());
          this.addField(holder, "data", options, dataId);
          holder = value[i].replace(":", "");
          i++;
        }
        this.addField(holder, type, [], idGen(), dataId);
      } else if (setting.endsWith("?")) {
        holder = setting.replace("?", "");
        type = "conditional";
        if (value[i + 1].includes("[") && value[i + 1].includes("]")) {
          options = value[i + 1]
            .replace("[", "")
            .replace("]", "")
            .split(",")
            .map((s) => s.trim());
          let ids = options.map(() => idGen());
          this.addField(holder, type, ids, idGen());
          options.forEach((option, index) => {
            if (option.startsWith("+")) {
              let hold = option.replace("+", "");
              this.addField(hold, "textArea", [], ids[index], null, false);
            } else {
              this.addField(option, "text", [], ids[index], null, false);
            }
          });
          i++;
        } else {
          this.addField(holder, type, [], idGen());
        }
      } else if (setting.endsWith(">")) {
        type = "select";
        holder = setting.replace(">", "");
        options = value[i + 1]
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((s) => s.trim());
        this.addField(holder, type, options, idGen());
        i++;
      } else if (setting.startsWith("+")) {
        holder = setting.replace("+", "");
        type = "textArea";
        this.addField(holder, type, [], idGen());
      } else {
        holder = setting;
        type = "text";
        this.addField(holder, type, [], idGen());
      }
      i++;
      this.addField("", "separator");
    }
  }

  get settings() {
    return this.__settings;
  }

  copy(mode) {
    if (mode == "json") {
      let data = {};
      this.elements.forEach((element) => {
        const value =
          typeof element.value == "string"
            ? element.value.trim()
            : element.value;
        if (value != "") data[element.label] = value;
      });
      navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
        this.notify(
          "Copiado",
          "O formulário foi copiado para a área de transferência"
        );
      });
    } else if (mode == "text") {
      let data = "";
      this.elements.forEach((element) => {
        const value =
          typeof element.value == "string"
            ? element.value.trim()
            : element.value;
        if (value != "") data += `${element.label}: ${value}\n`;
      });
      navigator.clipboard.writeText(data).then(() => {
        this.notify(
          "Copiado",
          "O formulário foi copiado para a área de transferência"
        );
      });
    }
  }

  createNew() {
    if (!this.actual) this.actual = idGen();
    this.saveRegister();
    this.clearForm();

    this.actual = idGen();
  }

  clearForm() {
    this.elements.forEach((e) => (e.value = ""));
    this.toTop();
  }

  saveRegister(newForm = false) {
    if (!newForm) {
      console.log("Saving register");
      let registerIndex = this.recents.findIndex((i) => i.id == this.actual);
      console.log(registerIndex);
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

  build() {
    this.createNew();
    return this.container;
  }
}
