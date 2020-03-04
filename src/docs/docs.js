function $$(selector, element = document) {
  return Array.from(element.querySelectorAll(selector));
}

function $(selector, element = document) {
  return element.querySelector(selector);
}

function populateTOC() {
  const toc = $("[data-toc]");
  for (const h2 of $$("h2")) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${h2.id}`;
    a.textContent = h2.textContent;
    a.className = "bit-link";
    li.appendChild(a);
    toc.appendChild(li);
    h2.innerHTML = `<a href="#${h2.id}" class="site-link-header">${h2.innerHTML}</a>`;
  }
}

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

const bitRoot = $(".bit-root");
const baseCustomProperties = {};
const bitRootStyle = getComputedStyle(bitRoot);

for (const value of Object.values(bitRootStyle)) {
  if (value.startsWith("--bit-")) {
    baseCustomProperties[value] = cleanCSSPropertyValue(
      bitRootStyle.getPropertyValue(value)
    );
  }
}

function createCustomPropertyEditor(properties) {
  const propertyEditor = document.createElement("div");
  propertyEditor.className = "bit-card site-property-editor";
  const title = document.createElement("h3");
  title.className = "site-property-editor-title";
  title.textContent = "CSS Custom Properties";
  propertyEditor.appendChild(title);
  const grid = document.createElement("div");
  grid.className = "site-property-editor-grid";
  propertyEditor.appendChild(grid);
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
  return propertyEditor;
}

function injectExamples() {
  for (const element of $$("[data-inject-example]")) {
    const name = element.dataset.injectExample;
    const template = document.getElementById(`template-${name}`);
    const div = document.createElement("div");
    div.dataset.exampleName = name;
    div.dataset.exampleType = "result";
    div.appendChild(template.content.cloneNode(true));
    const pre = document.createElement("pre");
    pre.className = "bit-pre";
    pre.textContent = htmlToCode(template.innerHTML);
    pre.dataset.exampleName = name;
    pre.dataset.exampleType = "html";
    const properties = (element.dataset.injectExampleProperties || "")
      .trim()
      .split(/\s+/)
      .filter(x => x);
    if (properties.length > 0) {
      const propertyEditor = createCustomPropertyEditor(properties);
      element.insertAdjacentElement("beforeend", propertyEditor);
    }
    element.insertAdjacentElement("beforeend", div);
    element.insertAdjacentElement("beforeend", pre);
  }
}

injectExamples();
populateTOC();
