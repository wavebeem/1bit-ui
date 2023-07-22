#!/usr/bin/env node
"use strict";

const sh = require("shelljs");
const path = require("path");

const { version } = require("../package.json");

sh.config.fatal = true;

const year = new Date().getFullYear();

const header = `\
/**
 * @license
 * 1bit-ui v${version}
 * Copyright ${year} Sage Fennel
 * https://1bit-ui.wavebeem.com
 */

`;

const srcCSS = sh.cat(path.join(__dirname, "../src/1bit-ui.css")).stdout;
const distCSS = header + srcCSS;
const distDir = path.join(__dirname, "../dist");
const distFile = path.join(distDir, "1bit-ui.css");
sh.rm("-rf", distDir);
sh.mkdir("-p", distDir);
sh.ShellString(distCSS).to(distFile);
