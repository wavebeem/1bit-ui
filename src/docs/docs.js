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
    element.insertAdjacentElement("beforeend", div);
    element.insertAdjacentElement("beforeend", pre);
  }
}

injectExamples();
populateTOC();
