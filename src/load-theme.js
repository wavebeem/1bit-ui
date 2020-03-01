const userTheme = localStorage.getItem("user-theme");
if (userTheme) {
  const { color0, color1 } = JSON.parse(userTheme);
  const root = document.documentElement;
  root.style.setProperty("--bit-color-0", color0);
  root.style.setProperty("--bit-color-1", color1);
  const switchers = document.querySelectorAll("[data-theme-switcher]");
  for (const button of switchers) {
    if (
      button.dataset["bitTheme-0"] === color0 &&
      button.dataset["bitTheme-1"] === color1
    ) {
      button.disabled = true;
    }
  }
}
