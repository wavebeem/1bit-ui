const userTheme = localStorage.getItem("user-theme");
if (userTheme) {
  const { color0, color1 } = JSON.parse(userTheme);
  const properties = [color0, color1]
    .map((c, i) => {
      return `--bit-color${i}: ${c};`;
    })
    .join("\n");
  const content = `
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
      button.dataset.bitTheme1 === color1;
  }
}
