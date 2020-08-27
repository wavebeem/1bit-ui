const css = String.raw;
const userTheme = localStorage.getItem("user-theme");
if (userTheme) {
  const { color0, color1 } = JSON.parse(userTheme);
  const content = css`
    .bit-root,
    .bit-auto {
      --bit-color0: ${color0};
      --bit-color1: ${color1};
    }
  `;
  const sheet = document.createElement("style");
  sheet.textContent = content;
  document.head.appendChild(sheet);
  const switchers = document.querySelectorAll("[data-theme-switcher]");
  for (const button of switchers) {
    button.disabled =
      button.dataset.bitTheme0 === color0 &&
      button.dataset.bitTheme1 === color1;
  }
}
