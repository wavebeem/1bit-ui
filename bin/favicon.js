#!/usr/bin/env node
"use strict";

const sh = require("shelljs");
const path = require("path");

sh.config.fatal = true;

sh.cd(path.resolve(__dirname, "../src"));
for (const size of [16, 32, 180, 192, 512]) {
  sh.exec(`convert favicon-16.png -scale ${size} favicon-${size}.png`);
}
