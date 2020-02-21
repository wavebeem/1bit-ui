function $(selector, element = document) {
  return element.querySelector(selector);
}

function $$(selector, element = document) {
  return Array.from(element.querySelectorAll(selector));
}

export function main() {
  const userPalette = jsonStorageGet("user-palette", {});
  const { color0 = "#222323", color1 = "#f0f6f0" } = userPalette;
  setThemeColors(color0, color1);
  bindThemeSwitchers();
  injectExamples();
}

function injectExamples() {
  for (const element of $$("[data-inject-example]")) {
    const name = element.dataset.injectExample;
    const example = examples[name];
    if (!example) {
      console.warn("TODO: [example]", name);
    }
    const div = document.createElement("div");
    div.dataset.exampleName = name;
    div.dataset.exampleType = "result";
    div.innerHTML = example;
    const pre = document.createElement("pre");
    pre.className = "bit-pre";
    pre.textContent = example;
    pre.dataset.exampleName = name;
    pre.dataset.exampleType = "html";
    element.insertAdjacentElement("beforeend", div);
    element.insertAdjacentElement("beforeend", pre);
  }
}

function bindThemeSwitchers() {
  for (const element of $$("[data-theme-switcher]")) {
    element.style.setProperty("--bit-color-0", element.dataset["bitTheme-0"]);
    element.style.setProperty("--bit-color-1", element.dataset["bitTheme-1"]);
    element.addEventListener(
      "click",
      () => {
        setThemeColors(
          element.dataset["bitTheme-0"],
          element.dataset["bitTheme-1"]
        );
      },
      false
    );
  }
}

const examples = {
  buttons: `\
<button type="button" class="bit-button">Save</button>
<button type="button" class="bit-button" disabled>Save</button>
`,

  checkboxes: `\
<div class="site-flex-column">
  <div class="bit-field">
    <input
      class="bit-checkbox"
      type="checkbox"
      id="toppings-pineapple"
      name="toppings"
      value="pineapple"
      checked
    />
    <label for="toppings-pineapple">Pineapple</label>
  </div>
  <div class="bit-field">
    <input
      class="bit-checkbox"
      type="checkbox"
      id="toppings-mushrooms"
      name="toppings"
      value="mushrooms"
    />
    <label for="toppings-mushrooms">Mushrooms</label>
  </div>
  <div class="bit-field">
    <input
      class="bit-checkbox"
      type="checkbox"
      id="toppings-olives"
      name="toppings"
      value="olives"
    />
    <label for="toppings-olives">Olives</label>
  </div>
  <div class="bit-field">
    <input
      class="bit-checkbox"
      type="checkbox"
      id="toppings-disabled"
      name="toppings"
      value="disabled"
      disabled
    />
    <label for="toppings-disabled">Disabled</label>
  </div>
</div>`,

  radios: `\
<div class="site-flex-column">
  <div class="bit-field">
    <input
      class="bit-radio"
      type="radio"
      id="color-red"
      name="color"
      value="red"
      checked
    />
    <label for="color-red">Red</label>
  </div>
  <div class="bit-field">
    <input
      class="bit-radio"
      type="radio"
      id="color-green"
      name="color"
      value="green"
    />
    <label for="color-green">Green</label>
  </div>
  <div class="bit-field">
    <input
      class="bit-radio"
      type="radio"
      id="color-blue"
      name="color"
      value="blue"
    />
    <label for="color-blue">Blue</label>
  </div>
  <div class="bit-field">
    <input
      class="bit-radio"
      type="radio"
      id="color-disabled"
      name="color"
      value="disabled"
      disabled
    />
    <label for="color-disabled">Disabled</label>
  </div>
</div>`,

  inputs: `\
<style>
  .site-flex-column {
    display: flex;
    flex-direction: column;
  }
</style>
<div class="site-columns-auto">
  <div class="site-flex-column">
    <label for="field-name">Name</label>
    <input class="bit-input" id="field-name" />
  </div>
  <div class="site-flex-column">
    <label for="field-url">URL</label>
    <input class="bit-input" placeholder="https://example.com" id="field-url" />
  </div>
  <div class="site-flex-column">
    <label for="field-disabled-1">Disabled</label>
    <input class="bit-input" id="field-disabled-1" disabled />
  </div>
</div>
<br />
<div class="site-columns-auto">
  <div class="site-flex-column">
    <label for="field-description">Description</label>
    <textarea
      rows="4"
      class="bit-input"
      id="field-description"
    >A text-area is used for multi-line text input.</textarea>
  </div>
  <div class="site-flex-column">
    <label for="field-disabled-2">Disabled</label>
    <textarea
      rows="4"
      class="bit-input"
      id="field-disabled-2"
      disabled
    >Disabled.</textarea>
  </div>
</div>`,
  link: `\
This is an <a href="#" class="bit-link">example link</a> within a sentence.`,
  inlineTags: `\
<p>
  Leverage <b>agile</b> frameworks to provide a robust synopsis for high level
  overviews. <a href="#" class="bit-link">Iterative approaches</a> to corporate
  strategy foster collaborative thinking to further the <i>overall</i> value
  proposition. Organically grow the
  <code class="bit-code">holistic world</code> view of disruptive innovation via
  workplace diversity and empowerment.
</p>`,

  select: `\
<select class="bit-select">
  <option selected disabled>Select...</option>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>

<select class="bit-select" disabled>
  <option selected disabled>Select...</option>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
`,

  horizontalRule: `\
<hr class="bit-hr" />
`,

  getCreative: `\
<style>
  .site-theme-white {
    --bit-color-0: black;
    --bit-color-1: white;
  }

  .site-theme-blue {
    --bit-color-0: hsl(200, 100%, 20%);
    --bit-color-1: hsl(200, 100%, 90%);
  }

  .site-theme-red {
    --bit-color-0: hsl(0, 100%, 20%);
    --bit-color-1: hsl(0, 100%, 90%);
  }
</style>
<div class="bit-card site-columns-auto site-theme-white">
  <button type="button" class="bit-button site-theme-blue">
    Blue
  </button>
  <button type="button" class="bit-button site-theme-red">
    Red
  </button>
  <button type="button"
    class="bit-button"
    style="
      --bit-color-0: #222222;
      --bit-color-1: #eeeeee;
    "
  >
    Inline Styles
  </button>
  <button type="button" class="bit-button">
    Default
  </button>
</div>`,

  inlineSVG: `\
<svg class="bit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path d="M16,10c-.41,7.68-12,7.75-12,0s11.59-7.69,12,0c.1,1.92,3.1,1.93,3,0-.26-4.88-3.91-9-9-9a9.1,9.1,0,0,0-9,9,9.08,9.08,0,0,0,8.59,9c5.25.23,9.14-3.93,9.41-9C19.1,8.07,16.1,8.08,16,10Z"/><path d="M14.44,16.56l5,5a1.5,1.5,0,0,0,2.12-2.12l-5-5a1.5,1.5,0,0,0-2.12,2.12Z"/></svg>
<svg class="bit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm2.94,16.56L12,14.25,9.06,17.56c-1.28,1.45-3.4-.68-2.12-2.12L10,12,6.94,8.56C5.66,7.12,7.78,5,9.06,6.44L12,9.75l2.94-3.31c1.28-1.45,3.4.68,2.12,2.12L14,12l3.06,3.44C18.34,16.88,16.23,19,14.94,17.56Z"/></svg>`,

  tableBasic: `\
<table class="bit-table" style="width: 100%;">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Time</th>
      <th>Rating</th>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Pretelethal</td>
      <td>3:21</td>
      <td>&starf;&starf;&starf;&starf;&star;</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Key Entity Extraction V: Sentry the Defiant</td>
      <td>5:45</td>
      <td>&starf;&starf;&starf;&starf;&starf;</td>
    </tr>
    <tr>
      <td>3</td>
      <td>The Hard Sell</td>
      <td>5:10</td>
      <td>&starf;&starf;&star;&star;&star;</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Number City</td>
      <td>3:49</td>
      <td>&starf;&starf;&starf;&star;&star;</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Gravity's Union</td>
      <td>6:46</td>
      <td>&starf;&starf;&starf;&starf;&starf;</td>
    </tr>
  </tbody>
</table>
`,
  tableRowHeaders: `\
<table class="bit-table">
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Rock</th>
      <th>Paper</th>
      <th>Scissors</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Rock vs...</th>
      <td>=</td>
      <td>&minus;</td>
      <td>+</td>
    </tr>
    <tr>
      <th>Paper vs...</th>
      <td>+</td>
      <td>=</td>
      <td>&minus;</td>
    </tr>
    <tr>
      <th>Scissors vs...</th>
      <td>-</td>
      <td>+</td>
      <td>&minus;</td>
    </tr>
  </tbody>
</table>
`,
  tableTfoot: `\
<table class="bit-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Qty</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sandwich</td>
      <td>1</td>
      <td>$9.00</td>
    </tr>
    <tr>
      <td>Iced Tea</td>
      <td>1</td>
      <td>$2.00</td>
    </tr>
    <tr>
      <td>French Fries</td>
      <td>1</td>
      <td>$4.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="2">Total</th>
      <td>$100.00</td>
    </tr>
  </tfoot>
</table>
`,

  card: `\
<div class="site-columns-auto">
  <div class="bit-card">
    This is a 1-bit UI Card. It has a 3D shadow effect,
    as well as some padding on the inside.
  </div>
  <div class="bit-card">
    This is a 1-bit UI Card. It has a 3D shadow effect,
    as well as some padding on the inside.
  </div>
  <div class="bit-card">
    This is a 1-bit UI Card. It has a 3D shadow effect,
    as well as some padding on the inside.
  </div>
  <div class="bit-card">
    This is a 1-bit UI Card. It has a 3D shadow effect,
    as well as some padding on the inside.
  </div>
</div>
`
};

function setThemeColors(color0, color1) {
  const root = $(".bit-root");
  root.style.setProperty("--bit-color-0", color0);
  root.style.setProperty("--bit-color-1", color1);
  $("#theme-example").textContent = `\
.bit-root {
  --bit-color-0: ${color0};
  --bit-color-1: ${color1};
}`;
  jsonStorageSet("user-palette", { color0, color1 });
}

function jsonStorageGet(key, fallback) {
  const json = localStorage.getItem(key);
  if (json === null) {
    return fallback;
  }
  return JSON.parse(json);
}

function jsonStorageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

main();
