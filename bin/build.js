"use strict";

const fs = require("fs");
const path = require("path");

const { version } = require("../package.json");

const year = new Date().getFullYear();

const header = `\
/**
 * @license
 * 1bit-ui v${version}
 * Copyright ${year} Brian Mock
 */
`;

const srcFile = path.join(__dirname, "../src/1bit-ui.css");
const srcCSS = fs.readFileSync(srcFile, "utf-8");
const distCSS = header + srcCSS;
const distDir = path.join(__dirname, "../dist");
const distFile = path.join(distDir, "1bit-ui.css");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
fs.writeFileSync(distFile, distCSS, "utf-8");
