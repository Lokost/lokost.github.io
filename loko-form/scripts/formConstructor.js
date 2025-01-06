export default class FormConstructor {
  constructor(dialogFunction) {
    this.dialogFunction = dialogFunction;
    this.container = document.createElement("div");
    this.container.classList.add("form-container");
    this.mainArea = document.createElement("div");
    this.mainArea.classList.add("main-area");
    this.formContainer = document.createElement("form");
    this.formContainer.classList.add("card", "form");
    this.recentsContainer = document.createElement("div");
    this.recentsContainer.classList.add("recents-container");
    this.copyButton = document.createElement("button");
    this.copyButton.innerHTML = `
    <span><span class="material-symbols-outlined">content_copy</span>Copiar</span>
    `;
    this.copyButton.onclick = () => {
      this.copyFormated();
    };

    this.newButton = document.createElement("button");
    this.newButton.innerHTML = `
    <span><span class="material-symbols-outlined">add</span>Novo</span>
    `;
    this.newButton.onclick = () => {
      this.createNew();
    };
    this.actions = document.createElement("div");
    this.actions.classList.add("actions");
    this.mainArea.append(this.recentsContainer, this.formContainer);
    this.actions.append(this.copyButton, this.newButton);

    this.elements = [];
    this.recents = [];
    this.actual = 0;
  }

  set settings(value) {
    this._settings = value.trim();
    this.recentsContainer.innerHTML = "";
    this.recents = [];
    this.elements = [];
    this.convertor();
  }

  get settings() {
    return this._settings;
  }

  convertor() {
    const settings = this.settings.split("\n");
    let holder = "";
    let optionsHolder = [];
    let getOptions = false;
    this.formContainer.innerHTML = "";

    for (let i = 0; i < settings.length; i++) {
      const line = settings[i];
      if (getOptions) {
        getOptions = line.includes("]") ? false : true;
        let i = line.includes("[") ? line.indexOf("[") + 1 : 0;
        let f = line.includes("]") ? line.indexOf("]") : line.length;
        let s = line
          .slice(i, f)
          .split(",")
          .map((e) => e.trim());
        optionsHolder = optionsHolder.concat(s);
        console.log(optionsHolder);
      }

      console.log(holder, optionsHolder);
      if (line == "") continue;
      if (optionsHolder.length > 0 && !getOptions) {
        this.textWithOptions(holder, optionsHolder);
        optionsHolder = [];
        continue;
      } else {
        if (line.endsWith(":")) {
          console.log(line.slice(0, -1).trim());
          holder = line.slice(0, -1).trim();
          getOptions = true;
          continue;
        } else {
          holder = line.trim();
          if (holder.length > 0) this.textInput(holder);
        }
      }

      holder = "";
      optionsHolder = [];
    }
  }

  idGenerator() {
    const id = Math.random().toString(10).substring(2, 15);
    return id;
  }

  textInput(content) {
    const container = document.createElement("label");
    container.classList.add("input-container");
    container.innerText = content;
    const input = document.createElement("input");
    input.type = "text";
    input.setAttribute("placeholder", `Preencha com ${content}`);
    input.id = this.idGenerator();
    this.elements.push({
      id: input.id,
      input: input,
      type: "text",
      label: content,
    });
    container.appendChild(input);
    console.log(container);
    this.formContainer.appendChild(container);
  }

  textWithOptions(content, options) {
    const container = document.createElement("label");
    container.classList.add("input-container");
    container.innerText = content;
    const input = document.createElement("input");
    input.type = "text";
    input.id = this.idGenerator();
    input.placeholder = `Preencha com ${content}`;
    this.elements.push({
      id: input.id,
      input: input,
      type: "select",
      label: content,
    });
    const data = document.createElement("datalist");
    data.id = this.idGenerator();
    input.setAttribute("list", data.id);
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      data.appendChild(optionElement);
    });
    container.append(input, data);
    console.log(container);
    this.formContainer.appendChild(container);
  }

  createNew() {
    this.actual = this.idGenerator();
    this.elements.forEach((element) => {
      element.input.value = "";
      element.input.oninput = (e) => {
        this.recents.find((i) => i.id == this.actual)[element.id].content =
          e.target.value;
        this.updateActual();
      };
    });
    this.recents.push({
      id: this.actual,
      ...this.elements.reduce((acc, element) => {
        acc[element.id] = {
          label: element.label,
          content: "",
        };

        return acc;
      }, {}),
    });
    console.log(this.recents);
    this.showRecents();
  }

  loadForm(id) {
    this.actual = id;
    this.elements.forEach((element) => {
      element.input.value = this.recents.find((i) => i.id == id)[
        element.id
      ].content;
    });
  }

  copyFormated() {
    let text = "";
    this.elements.forEach((element) => {
      if (element.input.value.length > 0)
        text += `${element.label}: ${element.input.value}\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      this.dialogFunction(
        "Copiado",
        "Formulário copiado para a área de transferência"
      );
    });
  }

  showRecents() {
    if (this.recents.length == 0) return;
    this.recentsContainer.innerHTML = "";
    this.recents.forEach((recent) => {
      const recentElement = document.createElement("div");
      recentElement.classList.add("recent", "card");
      recentElement.id = recent.id;
      recentElement.innerText = `${(
        recent[this.elements[0].id].label +
        " : " +
        recent[this.elements[0].id].content
      ).slice(0, 50)}`;
      recentElement.onclick = () => {
        this.loadForm(recent.id);
      };
      this.recentsContainer.appendChild(recentElement);
    });
  }

  updateActual() {
    document.getElementById(this.actual).innerText = `${(
      this.elements[0].label +
      " : " +
      this.elements[0].input.value
    ).slice(0, 50)}`;
  }

  build() {
    this.container.append(this.mainArea, this.actions);
    this.createNew();
    return this.container;
  }
}
