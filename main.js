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
    // TODO: Insert as HTML
    // TODO: Insert as code snippet
  }
}

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
