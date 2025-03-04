function getInputs(values) {
  // Get all the Ids of the created inputs
  ids = [];

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

    function convertOptions() {
      i++;
      if (values[i].includes("["))
        if (values[i].includes["]"]) {
          return values[i]
            .replace("[", "")
            .replace("]", "")
            .split(",")
            .map((s) => s.trim());
        } else {
          let hold = values[i + 1].replace("[", "").split(",");
          i++;
          while (!values[i].includes("]")) {
            hold.concat(values[i].split(","));
            i++;
          }
          return hold
            .concat(values[i].replace("]", "").split(", "))
            .map((s) => s.trim());
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
      options = convertOptions();
      if (options) {
        const dataId = this.addField(holder, "data", options, idGen()).id;
        ids.push(this.addField(holder, type, [], idGen(), dataId).id);
      } else {
        ids.push(this.addField(holder, type, [], idGen()).id);
      }
    } else if (type == "textArea") {
      holder = setting.replace("+", "");
      ids.push(this.addField(holder, type, [], idGen()).id);
    } else if (type == "select") {
      holder = setting.replace(">", "");
      options = convertOptions();
      ids.push(this.addField(holder, type, options, idGen()).id);
    } else if (type == "conditional") {
      let preValue = setting.endsWith("?v")
        ? true
        : setting.endsWith("?f")
        ? false
        : null;

      holder = setting.replace("?", "");
      options = convertOptions();
      if (options) {
        ids.push(
          this.addField(holder, type, extraIds, idGen(), null, true, preValue)
            .id
        );
        let extraIds = this.getInputs(options);
      }
      ids.push(
        this.addField(holder, type, options, idGen(), null, true, preValue).id
      );
    } else {
      holder = setting;
      ids.push(this.addField(holder, type, [], idGen()).id);
    }
    i++;
  }
  return ids;
}

// outro arquivo

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
        console.log(this.extraValues, value, this.extraValues.indexOf(value));
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
      console.log(checked, this.extraValues);
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
      console.log(this.prevalue, this.value);
      console.log(this.type, input);
      return this.type != "data" ? this.container : input;
    }
  }
  
  export default class FormContructor {
    constructor(notify) {
      this.notify = notify;
      this.container = document.createElement("form");
      this.container.classList.add("card", "form");
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
  
    getInputs(values) {
      // Get all the Ids of the created inputs
      ids = [];
  
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
  
        function convertOptions() {
          i++;
          if (values[i].includes("["))
            if (values[i].includes["]"]) {
              return values[i]
                .replace("[", "")
                .replace("]", "")
                .split(",")
                .map((s) => s.trim());
            } else {
              let hold = values[i + 1].replace("[", "").split(",");
              i++;
              while (!values[i].includes("]")) {
                hold.concat(values[i].split(","));
                i++;
              }
              return hold
                .concat(values[i].replace("]", "").split(", "))
                .map((s) => s.trim());
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
          options = convertOptions();
          if (options) {
            const dataId = this.addField(holder, "data", options, idGen()).id;
            ids.push(this.addField(holder, type, [], idGen(), dataId).id);
          } else {
            ids.push(this.addField(holder, type, [], idGen()).id);
          }
        } else if (type == "textArea") {
          holder = setting.replace("+", "");
          ids.push(this.addField(holder, type, [], idGen()).id);
        } else if (type == "select") {
          holder = setting.replace(">", "");
          options = convertOptions();
          ids.push(this.addField(holder, type, options, idGen()).id);
        } else if (type == "conditional") {
          let preValue = setting.endsWith("?v")
            ? true
            : setting.endsWith("?f")
            ? false
            : null;
  
          holder = setting.replace("?", "");
          options = convertOptions();
          if (options) {
            ids.push(
              this.addField(holder, type, extraIds, idGen(), null, true, preValue)
                .id
            );
            let extraIds = this.getInputs(options);
          }
          ids.push(
            this.addField(holder, type, options, idGen(), null, true, preValue).id
          );
        } else {
          holder = setting;
          ids.push(this.addField(holder, type, [], idGen()).id);
        }
        i++;
      }
      return ids;
    }
  
    set settings(value) {
      if (value.trim() == "") return;
  
      this.container.innerHTML = "";
      this.recents = [];
      this.elements = [];
      console.log(this.recents);
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
        } else if (
          setting.endsWith("?t") ||
          setting.endsWith("?f") ||
          setting.endsWith("?")
        ) {
          holder = setting.split("?");
          type = "conditional";
          let preValue;
          if (holder[holder.length - 1] == "t") {
            preValue = true;
            holder.pop();
            holder = holder.join("");
          } else if (holder[holder.length - 1] == "f") {
            preValue = false;
            holder.pop();
            holder = holder.join("");
          } else holder = holder.join("");
          if (
            value[i + 1] != undefined &&
            value[i + 1].includes("[") &&
            value[i + 1].includes("]")
          ) {
            options = value[i + 1]
              .replace("[", "")
              .replace("]", "")
              .split(",")
              .map((s) => s.trim());
            let ids = options.map(() => idGen());
            const check = this.addField(
              holder,
              type,
              ids,
              idGen(),
              null,
              true,
              preValue
            );
            const elements = this.generateOptions(options);
            if (preValue) check.changeSelection(true);
            i++;
          } else {
            this.addField(holder, type, [], idGen(), null, true, preValue);
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
      }
    }
  
    get settings() {
      return this.__settings;
    }
  
    copy(mode) {
      let values = {};
      this.elements.forEach((element) => {
        let value;
        if (element.type == "conditional") value = element.value;
        else if (typeof element.value == "string") value = element.value.trim();
        else value = element.value;
        if (value != "") values[element.label] = value;
      });
  
      console.log(values);
  
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
            continue;
          }
          if (value != "") data += `${key}: ${value}\n`;
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
      if (!this.actual) this.actual = idGen();
      this.saveRegister();
      this.clearForm();
  
      this.actual = idGen();
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
  