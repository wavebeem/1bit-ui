(function() {
  // NOT an ES Module! This is meant to be loaded as a regular script. ES
  // Modules are non-blocking for the UI thread, which is normally great, but we
  // need to load the user theme synchronously so the user doesn't see a brief
  // flash of the wrong colors on screen.
  //
  // To that end, I've implemented a bare-bones theme restoration script that
  // doesn't use any of the nice helper functions I made as ES Modules.
  const { color0, color1 } = JSON.parse(localStorage.getItem("user-theme"));
  const root = document.documentElement;
  root.style.setProperty("--bit-color-0", color0);
  root.style.setProperty("--bit-color-1", color1);
})();
