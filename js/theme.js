import { $ } from "./util.js";

export function getTheme() {
  const userTheme = jsonStorageGet("user-theme", {});
  const { color0 = "#222323", color1 = "#f0f6f0" } = userTheme;
  return { color0, color1 };
}

export function restoreUserTheme() {
  const { color0, color1 } = getTheme();
  setThemeColors(color0, color1);
}

export function setThemeColors(color0, color1) {
  const root = $(":root");
  root.style.setProperty("--bit-color-0", color0);
  root.style.setProperty("--bit-color-1", color1);
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
