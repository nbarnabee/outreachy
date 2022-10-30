/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const index = require("./index_copy.js");
