function htmlToCode(code) {
  const lines = code
    .replace(/^\n*/, "")
    .replace(/\s+$/, "")
    .split("\n");
  const match = lines[0].match(/^[ ]*/);
  if (match) {
    // TODO: This is dangerous; we should only remove an equivalent amount
    // of trailing whitespace, not just any arbitrary chunk of `length`
    // characters...
    const length = match[0].length;
    for (const [index, value] of lines.entries()) {
      lines[index] = value.slice(length);
    }
  }
  return lines.join("\n");
}

function cleanCSSPropertyValue(value) {
  return value.trim();
}

const bitRoot = document.querySelector(".bit-root");
const baseCustomProperties = {};
const bitRootStyle = getComputedStyle(bitRoot);
// 2020-03-10
//
// There's some kind of... issue with getComputedStyle where custom properties
// don't show up at first? Might be a race condition of this JS file vs the CSS
// file I'm trying to get the values out of? Does the JS run before the CSS is
// applied? I have no idea.
//
// https://twitter.com/wavebeem/status/1237606557380042752
const keys = [
  "--bit-color0",
  "--bit-color1",
  "--bit-button-padding-horizontal",
  "--bit-button-padding-vertical",
  "--bit-select-padding-horizontal",
  "--bit-select-padding-vertical",
  "--bit-input-padding-horizontal",
  "--bit-input-padding-vertical",
  "--bit-table-padding-horizontal",
  "--bit-table-padding-vertical",
  "--bit-card-padding-horizontal",
  "--bit-card-padding-vertical",
  "--bit-pre-padding-horizontal",
  "--bit-pre-padding-vertical",
  "--bit-code-padding-horizontal",
  "--bit-code-padding-vertical",
  "--bit-radiocheckbox-size",
  "--bit-border-width",
  "--bit-border-radius",
  "--bit-select-handle-width"
];

for (const key of keys) {
  baseCustomProperties[key] = cleanCSSPropertyValue(
    bitRootStyle.getPropertyValue(key) || ""
  );
}

class InjectExampleElement extends HTMLElement {
  connectedCallback() {
    this.classList.add("site-example");
    const name = this.dataset.example;
    const template = document.getElementById(`template-${name}`);
    const div = document.createElement("div");
    div.dataset.exampleName = name;
    div.dataset.exampleType = "result";
    div.appendChild(template.content.cloneNode(true));
    const divH3 = document.createElement("h3");
    divH3.textContent = "Example";
    const pre = document.createElement("pre");
    pre.className = "bit-pre";
    pre.textContent = htmlToCode(template.innerHTML);
    pre.dataset.exampleName = name;
    pre.dataset.exampleType = "html";
    const preH3 = document.createElement("h3");
    preH3.textContent = "Code";
    if ("properties" in this.dataset) {
      const propertyEditor = document.createElement("custom-properties-editor");
      propertyEditor.dataset.properties = this.dataset.properties;
      this.insertAdjacentElement("beforeend", propertyEditor);
    }
    this.insertAdjacentElement("beforeend", divH3);
    this.insertAdjacentElement("beforeend", div);
    this.insertAdjacentElement("beforeend", preH3);
    this.insertAdjacentElement("beforeend", pre);
  }
}

customElements.define("inject-example", InjectExampleElement);

class CustomPropertiesEditorElement extends HTMLElement {
  connectedCallback() {
    const properties = (this.dataset.properties || "")
      .trim()
      .split(/\s+/)
      .filter(x => x);
    this.classList.add("bit-card", "site-property-editor");
    const title = document.createElement("h3");
    title.className = "site-property-editor-title";
    title.textContent = "CSS Custom Properties";
    this.appendChild(title);
    const grid = document.createElement("div");
    grid.className = "site-property-editor-grid";
    this.appendChild(grid);
    for (const prop of properties) {
      const label = document.createElement("label");
      label.textContent = prop;
      const input = document.createElement("input");
      input.className = "bit-input";
      input.placeholder = baseCustomProperties[prop];
      input.addEventListener(
        "input",
        event => {
          bitRoot.style.setProperty(prop, event.target.value);
        },
        false
      );
      grid.appendChild(label);
      grid.appendChild(input);
    }
  }
}

customElements.define(
  "custom-properties-editor",
  CustomPropertiesEditorElement
);

class TableOfContentsElement extends HTMLElement {
  connectedCallback() {
    this.classList.add("bit-card", "site-toc");
    for (const h2 of document.querySelectorAll("h2")) {
      const a = document.createElement("a");
      a.href = `#${h2.id}`;
      a.textContent = h2.textContent;
      a.className = "bit-link";
      this.appendChild(a);
      h2.innerHTML = `<a href="#${h2.id}" class="site-link-header">${h2.innerHTML}</a>`;
    }
  }
}

customElements.define("table-of-contents", TableOfContentsElement);
