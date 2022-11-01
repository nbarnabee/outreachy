/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const {
  taskType,
  wikidata_todo,
  a_totally_fake_tool,
  pywikibot,
  availableTools,
  buildSelectMenu,
  makeButton,
  showSearch,
  fakeSubmit,
  searchHandler,
  buildSuggestionsMenu,
  showSuggestions,
  makeListElement,
  useSuggestion,
  findTool,
  buildSearchResults,
  getSearchTask,
  clearElements,
  getTask,
  populateTaskDiv,
  makeTaskHeading,
  buildInputs,
  makeTaskDescription,
  buildButtonContainer,
  populateToolLinks,
  makeLink,
} = require("./index_copy.js");
