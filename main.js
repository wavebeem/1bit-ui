export function main() {
  for (const element of document.querySelectorAll("[data-theme-switcher]")) {
    element.addEventListener(
      "click",
      () => {
        const { "bitTheme-0": c0, "bitTheme-1": c1 } = element.dataset;
        element.style.setProperty("--bit-color-0", c0);
        element.style.setProperty("--bit-color-1", c1);
        setThemeColors(c0, c1);
      },
      false
    );
  }
}

function setThemeColors(color0, color1) {
  const { style } = document.documentElement;
  style.setProperty("--bit-color-0", color0);
  style.setProperty("--bit-color-1", color1);
}

main();
