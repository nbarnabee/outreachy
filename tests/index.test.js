/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const {
  taskType,
  mm_wikidata_todo,
  totally_fake,
  pywikibot,
  availableTools,
  populateTaskDiv,
  createTaskStatement,
  createInput,
  buildSelectMenu,
  createTaskDescription,
  makeButtons,
  makeAddButton,
  populateToolLinks,
  makeLink,
  clearElements,
  fakeSubmit,
} = require("./index_copy.js");
