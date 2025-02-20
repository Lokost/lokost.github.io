export default class FormConstructor {
  constructor(dialogFunction) {
    this.dialogFunction = dialogFunction;
    this.container = document.createElement("div");
    this.container.classList.add("form-container");
    this.container.innerHTML = `
      <div class="main-area">
        <div class="hover">
          <div class="recents-container" id="recents"></div>
        </div>
        <div class="hover card form">
          <form id="mainForm"></form>
        </div>
      </div>
      <div class="actions">
        <button id="copyContent">
          <span>
            <span class="material-symbols-outlined">
              content_copy
            </span>
            Copiar
          </span>
        </button>
        <button id="newForm">
          <span>
            <span class="material-symbols-outlined">
              add
            </span>
            Novo
          </span>
        </button>
      </div>
    `;

    this.content = {};
    this.getContent(this.container);
    this.settings = "";
    console.log(this.content);
    this.saveSession();
  }

  getContent(element) {
    const hover = element;
    for (let child of hover.children) {
      if (child.children.length > 0) {
        this.getContent(child);
      }

      if (child.id) {
        this.content[child.id] = child;
      }
    }
  }

  set settings(value) {
    if (!this._settings || this._settings != value.trim()) {
      this.content.recents.innerHTML = "";
      this.recents = [];
      this.elements = [];
      this.convertor();
    }

    this._settings = value.trim();
    this.saveSession();
  }

  get settings() {
    return this._settings;
  }

  convertor() {
    const settings = this.settings.split("\n").map((s) => s.trim());
    let holder = "";
    let optionsHolder = [];
    let getOptions = false;
    this.content.mainForm.innerHTML = "";
    for (let i = 0; i < settings.length; i++) {
      let line = settings[i];
      if (line == "") continue;
      if (getOptions) {
        getOptions = line.includes("]") ? false : true;
        if (line.includes("]")) {
          line = line.replace("]", "");
        }

        if (line.includes("[")) {
          line = line.replace("[", "");
        }
        const content = line.split(",").map((s) => s.trim());

        optionsHolder = optionsHolder.concat(content);
        console.log(optionsHolder);
      }

      if (optionsHolder.length > 0 && !getOptions) {
        this.getElement("select", holder, optionsHolder);

        optionsHolder = [];
        continue;
      } else {
        if (line.endsWith(":")) {
          holder = line.replace(":", "");
          getOptions = true;
          continue;
        } else {
          if (line.startsWith("+"))
            this.getElement("textarea", line.replace("+", "").trim());
          else this.getElement("text", line);
        }
      }
    }
  }

  idGenerator() {
    return Math.random().toString(10).substring(2, 15);
  }

  getElement(type, content, options = []) {
    let element = null;
    switch (type) {
      case "text":
        element = this.textInput(content);
        break;
      case "textarea":
        element = this.textArea(content);
        break;
      case "select":
        element = this.textWithOptions(content, options);
        break;
      default:
        element = null;
    }

    if (element != null) {
      this.elements.push(element);
      console.log(this.elements);
      this.content.mainForm.append(element.element);
    }
  }

  textInput(content) {
    const container = document.createElement("label");
    container.classList.add("input-container");
    const id = this.idGenerator();
    container.innerHTML = `
      ${content}
      <input type="text" id="${id}" placeholder="Preencha com ${content}">
    `;

    console.log(container);

    const input = container.querySelector("input");
    input.onfocus = () => {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    input.oninput = (e) => {
      this.recents.find((i) => i.id == this.actual)[id].content =
        e.target.value;
      this.updateActual();
    };

    return {
      id: id,
      element: container,
      input: input,
      type: "text",
      label: content,
    };
  }

  textWithOptions(content, options) {
    const container = document.createElement("label");
    container.classList.add("input-container");
    const id = this.idGenerator();
    const dataId = this.idGenerator();
    container.innerHTML = `
      ${content}
      <input type="text" id="${id}" placeholder="Preencha com ${content}" list="${dataId}" />
      <datalist id="${dataId}">
        ${options.map((o) => `<option value="${o}">${o}</option>`)}
      </datalist>
    `;

    const input = container.querySelector("input");
    input.onfocus = () => {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    input.oninput = (e) => {
      this.recents.find((i) => i.id == this.actual)[id].content =
        e.target.value;
      this.updateActual();
    };

    return {
      id: id,
      element: container,
      input: input,
      type: "select",
      label: content,
    };
  }

  textArea(content) {
    const container = document.createElement("label");
    container.classList.add("input-container");
    const id = this.idGenerator();
    container.innerHTML = `
      ${content}
      <textarea id="${id}" placeholder="Preencha com ${content}"></textarea>
    `;
    console.log(container);

    const input = container.querySelector("textarea");
    input.onfocus = () => {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    input.oninput = (e) => {
      this.recents.find((i) => i.id == this.actual)[id].content =
        e.target.value;
      this.updateActual();
    };

    return {
      id: id,
      input: input,
      element: container,
      type: "textarea",
      label: content,
    };
  }

  createNew() {
    this.actual = this.idGenerator();
    this.elements.forEach((e) => {
      e.input.value = "";
    });

    this.saveRegister(true);
    this.showRecents();
    this.toTop();
    this.saveSession();
  }

  saveRegister(newForm = false) {
    if (!newForm) {
      let register = this.recents.find((i) => i.id == this.actual);
      if (register) {
        register = this.elements.reduce((acc, element) => {
          acc[element.id] = {
            content: element.input.value,
            type: element.type,
            label: element.label,
          };
          return acc;
        }, register);
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
        acc[element.id] = {
          content: element.input.value,
          type: element.type,
          label: element.label,
        };
        return acc;
      }, {}),
    });
  }

  toTop() {
    this.content.mainForm.scrollTo({ top: 0, behavior: "smooth" });
    this.elements[0].input.focus();
  }

  loadForm(id) {
    this.actual = id;
    document.querySelector(".recent.selected")?.classList.remove("selected");
    document.getElementById(id).classList.add("selected");

    this.elements.forEach((e) => {
      e.input.value = this.recents.find((i) => i.id == id)[e.id].content;
    });
    this.toTop();
  }

  copyFormated(mode = "") {
    console.log(mode);
    if (mode == "text" || mode.length < 1) {
      let formated = "";
      this.elements.forEach((e) => {
        if (e.input.value.length > 0)
          formated += `${e.label}: ${e.input.value}\n`;
      });
      navigator.clipboard.writeText(formated).then(() => {
        this.dialogFunction(
          "Copiado",
          "O formulário foi copiado para a área de transferência"
        );
      });
    } else if (mode == "json") {
      let formated = "{\n";
      this.elements.forEach((e, i) => {
        if (e.input.value.length > 0)
          formated += `  "${e.label}": "${e.input.value}"${
            i == this.elements.length - 1 ? "" : ","
          }\n`;
      });
      formated += "}";
      navigator.clipboard.writeText(formated).then(() => {
        this.dialogFunction(
          "Copiado",
          "O formulário foi copiado para a área de transferência"
        );
      });
    }
  }

  showRecents() {
    if (this.recents.length > 0) {
      this.content.recents.innerHTML = "";
      this.recents.forEach((r) => {
        const recentElement = document.createElement("div");
        recentElement.classList.add("recent", "card");
        if (r.id == this.actual) {
          recentElement.classList.add("selected");
          recentElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        recentElement.id = r.id;
        recentElement.innerText = (
          r[this.elements[0].id].label +
          ": " +
          r[this.elements[0].id].content
        ).slice(0, 50);
        recentElement.onclick = () => {
          this.loadForm(r.id);
          recentElement.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        this.content.recents.append(recentElement);
      });
    }
  }

  updateActual() {
    document.getElementById(this.actual).innerText = (
      this.elements[0].label +
      ": " +
      this.elements[0].input.value
    ).slice(0, 50);
    this.saveSession();
  }

  build() {
    this.createNew();
    this.content.copyContent.onclick = () => {
      this.copyFormated();
    };
    this.content.newForm.onclick = () => {
      this.createNew();
    };
    return this.container;
  }

  saveSession() {
    window.sessionStorage.setItem("recents", JSON.stringify(this.recents));
    window.sessionStorage.setItem("settings", this.settings);
  }

  loadSession() {
    if (
      window.sessionStorage.getItem("recents") != null &&
      window.sessionStorage.getItem("settings") != null
    ) {
      this.recents = JSON.parse(window.sessionStorage.getItem("recents"));
      this.settings = window.sessionStorage.getItem("settings");
      if (this.recents) this.showRecents();
      this.loadForm(this.recents[this.recents.length - 1].id);
    }
  }
}
