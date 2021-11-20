const css = String.raw;
const userTheme = localStorage.getItem("user-theme");
if (userTheme) {
  const { color0, color1, color2 = color0, color3 = color0 } = JSON.parse(
    userTheme
  );
  const colors = [color0, color1, color2, color3].filter((x) => x);
  const properties = colors
    .map((c, i) => {
      return `--bit-color${i}: ${c};`;
    })
    .join("\n");
  const content = css`
    .bit-root,
    .bit-auto {
      ${properties}
    }
  `;
  const sheet = document.createElement("style");
  sheet.textContent = content;
  document.head.appendChild(sheet);
  const switchers = document.querySelectorAll("[data-theme-switcher]");
  for (const button of switchers) {
    button.disabled =
      button.dataset.bitTheme0 === color0 &&
      button.dataset.bitTheme1 === color1 &&
      button.dataset.bitTheme2 === color2 &&
      button.dataset.bitTheme3 === color3;
  }
}
