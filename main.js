function $(selector, element = document) {
  return element.querySelector(selector);
}

function $$(selector, element = document) {
  return Array.from(element.querySelectorAll(selector));
}

export function main() {
  setThemeColors("#222323", "#f0f6f0");
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
  for (const element of $$("[data-inject-example]")) {
    const name = element.dataset.injectExample;
    const example = examples[name];
    console.log("TODO: [example]", name, example);
    const div = document.createElement("div");
    div.innerHTML = example;
    const pre = document.createElement("pre");
    pre.className = "bit-pre";
    pre.textContent = example;
    element.insertAdjacentElement("beforeend", div);
    element.insertAdjacentElement("beforeend", pre);
    // TODO: Insert as HTML
    // TODO: Insert as code snippet
  }
}

const examples = {
  getCreative: `\
<style>
  .fancy-container {
    --bit-color-0: black;
    --bit-color-1: white;
    border: 6px double var(--bit-color-0);
    background: var(--bit-color-1);
    padding: 1rem;
  }

  .theme-orange {
    --bit-color-0: hsl(30, 100%, 20%);
    --bit-color-1: hsl(30, 100%, 90%);
  }

  .theme-blue {
    --bit-color-0: hsl(200, 100%, 20%);
    --bit-color-1: hsl(200, 100%, 90%);
  }

  .theme-green {
    --bit-color-0: hsl(120, 100%, 20%);
    --bit-color-1: hsl(120, 100%, 90%);
  }

  .theme-red {
    --bit-color-0: hsl(0, 100%, 20%);
    --bit-color-1: hsl(0, 100%, 90%);
  }
</style>
<div class="site-columns-auto fancy-container">
  <button class="bit-button theme-blue">
    Blue
  </button>
  <button class="bit-button theme-green">
    Green
  </button>
  <button class="bit-button theme-red">
    Red
  </button>
  <button class="bit-button theme-orange">
    Orange
  </button>
  <button
    class="bit-button"
    style="
      --bit-color-0: #222222;
      --bit-color-1: #eeeeee;
    "
  >
    Inline Styles
  </button>
  <button class="bit-button">
    Default
  </button>
</div>`
};

function setThemeColors(color0, color1) {
  const root = $(":root");
  root.style.setProperty("--bit-color-0", color0);
  root.style.setProperty("--bit-color-1", color1);
  $("#theme-example").textContent = `\
:root {
  --bit-color-0: ${color0};
  --bit-color-1: ${color1};
}`;
}

main();
