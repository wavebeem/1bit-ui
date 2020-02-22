import { $, $$ } from "./util.js";
import { setThemeColors } from "./theme.js";

export function bindThemeSwitchers() {
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

export function updateThemeExample(color0, color1) {
  $("#theme-example").textContent = `\
.bit-root {
  --bit-color-0: ${color0};
  --bit-color-1: ${color1};
}`;
}
