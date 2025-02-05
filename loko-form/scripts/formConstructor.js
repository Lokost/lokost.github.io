function idGenerator() {
  return Math.random().toString(10).substring(2, 15);
}

class FormElement {
  constructor(
    options = {
      type: "text",
      values: [],
      content: "",
      onupdate: () => {},
    }
  ) {
    this.element = document.createElement("label");
    this.element.classList.add("input-container");
    this.id = idGenerator();

    this.values = options.values || [];
    this.content = options.content || "";
    this.onupdate = options.onupdate || (() => {});
    this.type = options.type || "text";

    console.log(this.content, this.type, this.values);
  }

  set type(type) {
    this._type = type;
    if (type == "conditional") {
      this.element.classList.add("conditional");
    } else {
      this.element.classList.remove("conditional");
    }

    const types = {
      text: () => this.text(),
      select: () => this.textWithOptions(),
      textarea: () => this.textArea(),
      conditional: () => this.conditional(),
      default: () => this.text(),
    };
    console.log(type);
    types[type]();
  }

  get type() {
    return this._type;
  }

  set visible(value) {
    if (value) {
      this.element.style.display = "block";
    } else {
      this.element.style.display = "none";
    }
  }

  get visible() {
    return this.element.style.display == "block";
  }

  set value(value) {
    if (this.type == "conditional") {
      this.input.checked = value;
    } else {
      this.input.value = value;
    }
  }

  get value() {
    if (this.type == "conditional") {
      return this.input.checked ? true : false;
    } else {
      return this.input.value;
    }
  }

  toggleValues(value) {
    this.values.forEach((e) => {
      e.visible = value;
    });
  }

  text() {
    this.element.innerHTML = `
      ${this.content}
      <input type="text" id="${this.id}" placeholder="Preencha com ${this.content}" />
    `;

    this.input = this.element.querySelector("input");
    this.input.oninput = (e) => {
      this.value = e.target.value;
      this.onupdate(e.target);
    };
  }

  textWithOptions() {
    this.element.innerHTML = `
      ${this.content}
      <input type="text" id="${this.id}" placeholder="Preencha com ${
      this.content
    }" list="${this.id}-datalist" />
      <datalist id="${this.id}-datalist">
        ${this.values.map((v) => `<option value="${v}">${v}</option>`)}
      </datalist>
    `;

    this.input = this.element.querySelector("input");
    this.input.oninput = (e) => {
      this.onupdate(e.target);
    };
  }

  textArea() {
    this.element.innerHTML = `
      ${this.content}
      <textarea id="${this.id}" placeholder="Preencha com ${this.content}"></textarea>
    `;

    this.input = this.element.querySelector("textarea");
    this.input.oninput = (e) => {
      this.onupdate(e.target);
    };
  }

  conditional() {
    this.element.innerHTML = `
      <input type="checkbox" id="${this.id}" placeholder="Preencha com ${this.content}" />
      ${this.content}
    `;

    this.input = this.element.querySelector("input");
    this.input.onchange = (e) => {
      this.toggleValues(e.target.checked);
      this.onupdate(e.target);
    };
  }
}

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
    this.actual;
    console.log(this.content);
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
    this._settings = value.trim();
    this.content.recents.innerHTML = "";
    this.recents = [];
    this.elements = [];
    this.converter();
  }

  get settings() {
    return this._settings;
  }

  converter() {
    const settings = this.settings.split("\n").map((s) => s.trim());
    let holder = "";
    let optionsHolder = [];
    let getOptions = false;
    let conditional = false;
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
        if (conditional) {
          optionsHolder = optionsHolder.map((o) => {
            if (o.startsWith("+"))
              return new FormElement({
                type: "textarea",
                content: o.replace("+", "").trim(),
              });
            else if (o.endsWith(":"))
              return new FormElement({
                type: "text",
                content: o.replace(":", "").trim(),
              });
            else return new FormElement({ type: "text", content: o.trim() });
          });

          this.elements.push(
            new FormElement({
              type: "conditional",
              content: holder.replace("?", ""),
              values: optionsHolder,
            })
          );
        } else {
          this.elements.push(
            new FormElement({
              type: "select",
              content: holder,
              values: optionsHolder,
            })
          );
        }
        optionsHolder = [];
      } else {
        conditional = line.endsWith("?");
        if (line.endsWith(":") || line.endsWith("?")) {
          holder = line.replace(":", "").replace("?", "").trim();
          getOptions = true;
          continue;
        } else {
          if (line.startsWith("+"))
            this.elements.push(
              new FormElement({
                type: "textarea",
                content: line.replace("+", "").trim(),
              })
            );
          else
            this.elements.push(
              new FormElement({ type: "text", content: line.trim() })
            );
        }
      }
    }
  }

  createNew() {
    this.actual = idGenerator();
    this.elements.forEach((e) => {
      e.input.value = "";
      e.value = "";
    });

    this.recents.push({
      id: this.actual,
      ...this.elements.reduce((acc, e) => {
        acc[e.id] = { label: e.label, content: e.input.value };
        return acc;
      }, {}),
    });

    this.showRecents();
    this.toTop();
  }

  toTop() {
    this.content.mainForm.scrollTop = 0;
    this.elements[0].input.focus();
  }

  loadForm(id) {
    this.actual = id;
    document.querySelector(".recent.selected")?.classList.remove("selected");
    document.getElementById(id).classList.add("selected");

    this.elements.forEach((e) => {
      e.value = this.recents.find((i) => i.id == id)[e.id].content;
    });
    this.toTop();
  }

  copyFormated() {
    const formated = this.elements.reduce((acc, e) => {
      if (e.value.length > 0) acc += `${e.label}: ${e.value}\n`;
      return acc;
    }, "");

    navigator.clipboard.writeText(formated).then(() => {
      this.dialogFunction(
        "Copiado",
        "O formulário foi copiado para a área de transferência"
      );
    });
  }

  showRecents() {
    if (this.recents.length > 0) {
      this.content.recents.innerHTML = "";
      this.recents.forEach((r) => {
        const recentElement = document.createElement("div");
        recentElement.classList.add("recent", "card");
        if (r.id == this.actual) recentElement.classList.add("selected");
        recentElement.id = r.id;
        recentElement.innerText = (
          r[this.elements[0].id].label +
          ": " +
          r[this.elements[0].id].content
        ).slice(0, 50);
        recentElement.onclick = () => {
          this.loadForm(r.id);
        };
        this.content.recents.append(recentElement);
      });
    }
  }

  updateActual(value) {
    this.recents = this.recents.map((r) => {
      if (r.id == this.actual) {
        r[this.elements[0].id].content = value;
      }
      return r;
    });
    this.showRecents();
  }

  build() {
    this.elements.forEach((element) => {
      if (element.type == "conditional") {
        this.content.mainForm.append(element.element);
        return;
      } else {
        element.onupdate = (e) => {
          e.onfocus = () => {
            e.scrollIntoView({ behavior: "smooth", block: "center" });
          };
        };

        this.content.mainForm.append(element.element);
      }
    });

    this.elements[0].input.focus();
    if (this.elements[0].type != "conditional")
      this.elements[0].onupdate = (e) => {
        e.onfocus = () => {
          e.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        updateActual(e.target.value);
      };

    this.createNew();
    this.content.copyContent.onclick = () => {
      this.copyFormated();
    };

    this.content.newForm.onclick = () => {
      this.createNew();
    };

    return this.container;
  }
}
