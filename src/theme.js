class ThemeSwitchersElement extends HTMLElement {
  connectedCallback() {
    this.classList.add("site-columns-auto");
    const { color0, color1 } = getTheme();
    for (const element of this.querySelectorAll("[data-theme-switcher]")) {
      const c0 = element.dataset.bitTheme0;
      const c1 = element.dataset.bitTheme1;
      element.disabled = c0 === color0 && c1 === color1;
      element.style.setProperty("--bit-color0", c0);
      element.style.setProperty("--bit-color1", c1);
      element.addEventListener(
        "click",
        () => {
          for (const button of this.querySelectorAll("[data-theme-switcher]")) {
            button.disabled = button === element;
          }
          const c0 = element.dataset.bitTheme0;
          const c1 = element.dataset.bitTheme1;
          setThemeColors(c0, c1);
          updateThemeExample(c0, c1);
        },
        false
      );
    }
  }
}

customElements.define("theme-switchers", ThemeSwitchersElement);

function updateThemeExample(color0, color1) {
  document.querySelector("#theme-example").textContent = `\
.bit-root {
  --bit-color0: ${color0};
  --bit-color1: ${color1};
}`;
}

function getTheme() {
  const userTheme = jsonStorageGet("user-theme", {});
  const { color0 = "#222323", color1 = "#f0f6f0" } = userTheme;
  return { color0, color1 };
}

function restoreUserTheme() {
  const { color0, color1 } = getTheme();
  setThemeColors(color0, color1);
}

function setThemeColors(color0, color1) {
  const root = document.documentElement;
  root.style.setProperty("--bit-color0", color0);
  root.style.setProperty("--bit-color1", color1);
  jsonStorageSet("user-theme", { color0, color1 });
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

const { color0, color1 } = getTheme();
updateThemeExample(color0, color1);
