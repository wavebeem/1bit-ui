class ThemeSwitchersElement extends HTMLElement {
  connectedCallback() {
    this.classList.add("site-columns-auto");
    const { color0, color1, color2, color3 } = getTheme();
    for (const element of this.querySelectorAll("[data-theme-switcher]")) {
      const c0 = element.dataset.bitTheme0;
      const c1 = element.dataset.bitTheme1;
      const c2 = element.dataset.bitTheme2 || c0;
      const c3 = element.dataset.bitTheme3 || c0;
      element.disabled =
        c0 === color0 && c1 === color1 && c2 === color2 && c3 === color3;
      element.style.setProperty("--bit-color0", c0);
      element.style.setProperty("--bit-color1", c1);
      element.style.setProperty("--bit-color2", c2);
      element.style.setProperty("--bit-color3", c3);
      element.addEventListener(
        "click",
        () => {
          for (const button of this.querySelectorAll("[data-theme-switcher]")) {
            button.disabled = button === element;
          }
          const c0 = element.dataset.bitTheme0;
          const c1 = element.dataset.bitTheme1;
          const c2 = element.dataset.bitTheme2 || c0;
          const c3 = element.dataset.bitTheme3 || c0;
          setThemeColors(c0, c1, c2, c3);
          updateThemeExample(c0, c1, c2, c3);
        },
        false
      );
    }
  }
}

customElements.define("theme-switchers", ThemeSwitchersElement);

function updateThemeExample(color0, color1, color2, color3) {
  const colors = [color0, color1, color2, color3].filter((x) => x);
  const properties = colors
    .map((c, i) => {
      return `--bit-color${i}: ${c};`;
    })
    .join("\n");
  document.querySelector("#theme-example").textContent = css`
    .bit-root,
    .bit-auto {
      ${properties}
    }
  `;
}

function getTheme() {
  const userTheme = jsonStorageGet("user-theme", {});
  const {
    color0 = "#222323",
    color1 = "#f0f6f0",
    color2 = color0,
    color3 = color0,
  } = userTheme;
  return { color0, color1, color2, color3 };
}

function restoreUserTheme() {
  const { color0, color1, color2, color3 } = getTheme();
  setThemeColors(color0, color1, color2, color3);
}

function setThemeColors(color0, color1, color2, color3) {
  const root = document.documentElement;
  root.style.setProperty("--bit-color0", color0);
  root.style.setProperty("--bit-color1", color1);
  if (color2) {
    root.style.setProperty("--bit-color2", color2);
  }
  if (color3) {
    root.style.setProperty("--bit-color3", color3);
  }
  jsonStorageSet("user-theme", { color0, color1, color2, color3 });
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

const { color0, color1, color2, color3 } = getTheme();
updateThemeExample(color0, color1, color2, color3);
