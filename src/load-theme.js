const userTheme = localStorage.getItem("user-theme");
if (userTheme) {
  const { color0, color1 } = JSON.parse(userTheme);
  const root = document.documentElement;
  root.style.setProperty("--bit-color0", color0);
  root.style.setProperty("--bit-color1", color1);
  const switchers = document.querySelectorAll("[data-theme-switcher]");
  for (const button of switchers) {
    button.disabled =
      button.dataset.bitTheme0 === color0 &&
      button.dataset.bitTheme1 === color1;
  }
}
