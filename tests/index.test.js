/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
const { createTestScheduler } = require("jest");
const { TestEnvironment } = require("jest-environment-jsdom");
const { hasUncaughtExceptionCaptureCallback } = require("process");
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
  searchHandler,
  buildSuggestionsMenu,
  showSuggestions,
  makeListElement,
  useSuggestion,
  findTool,
  buildSearchResult,
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

/* buildSelectMenu takes an array of option values and a string, and returns a select element */

test("Check if buildSelectMenu is returning a <select> element", () => {
  const menu = buildSelectMenu(["a"], "letters");
  expect(menu.tagName).toBe("SELECT");
});

test("Check if the returned <select> element has a name of 'letters'", () => {
  const menu = buildSelectMenu(["a"], "letters");
  expect(menu.name).toBe("letters");
});

test("Check if buildSelect Menu contains a single <option> element with the value 'a'", () => {
  const menu = buildSelectMenu(["a"], "letters");
  expect(menu.innerHTML).toBe(`<option value=\"a\"></option>`);
});

/* makeButton accepts a string, a callback function, an optional array and an optional value, and returns a button */

test("Check if makeButton returns a button", () => {
  const button = makeButton("hello", () => location.reload());
  expect(button.tagName).toBe("BUTTON");
});

test("Check if the innerText of the button is equal to the string value passed", () => {
  const button = makeButton("hello", () => location.reload());
  expect(button.innerText).toBe("hello");
});

/*  showSearch causes the search bar container to be displayed, hides the start 
buttons, and creates a "back" button */

test("Check that showSearch reveals the search bar container", () => {
  showSearch();
  expect(document.querySelector(".search-bar-container").style.display).toBe(
    "flex"
  );
});

test("Check that showSearch hides the start button container", () => {
  showSearch();
  expect(document.querySelector(".start-button-container").style.display).toBe(
    "none"
  );
});

// test("Check if showSearch creates a button"

/* searchHandler hides the "no results found" message and calls two other functions: 
buildSuggestionsMenu and showSuggestions */

/* buildSuggestionsMenu takes a string and pushes objects from the availableTools array that contain the string to an array, then returns that array 

I'm going to run the series of tests for buildSuggestionsMenu and showSuggestions with the same input:

const menu = buildSuggestionsMenu("pywikibot");

As the availableTools array contains only one tool with the name "pywikibot", I would expect the returned array to contain a single object. */

test("Check that buildSuggestionsMenu returns an array", () => {
  const menu = buildSuggestionsMenu("pywikibot");
  expect(Array.isArray(menu)).toBe(true);
});

test("Check that the returned array contains a single value", () => {
  const menu = buildSuggestionsMenu("pywikibot");
  expect(menu.length).toBe(1);
});

test("Check that the value in the returned array is an object", () => {
  const menu = buildSuggestionsMenu("pywikibot");
  expect(typeof menu[0]).toBe("object");
});

test("Check that the given object is the pywikibot object", () => {
  const menu = buildSuggestionsMenu("pywikibot");
  expect(menu[0].description).toBe(
    "Python library and collection of scripts that automate work on MediaWiki sites"
  );
});

/* showSuggestions accepts the array returned by buildSuggestionsMenu, creates list items for each object in the array, 
appends them to the suggestions <ul>, and gives the <ul> a new class

The list item will have a data value equal to the 'title' value of the passed object */

test("Check if showSuggestions has added a class to the suggestions list", () => {
  const suggestions = document.getElementById("suggestions-list");
  const menu = buildSuggestionsMenu("pywikibot");
  showSuggestions(menu);
  expect(suggestions.className).toBe("has-suggestions");
});

test("Check if showSuggestions has appended an <li> element to the suggestions <ol>", () => {
  const suggestions = document.getElementById("suggestions-list");
  const menu = buildSuggestionsMenu("pywikibot");
  showSuggestions(menu);
  expect(suggestions.childNodes[0].tagName).toBe("LI");
});

test("Check if the child <li> has a dataset value equal to the title value of the passed object", () => {
  const suggestions = document.getElementById("suggestions-list");
  const menu = buildSuggestionsMenu("pywikibot");
  showSuggestions(menu);
  expect(suggestions.childNodes[0].dataset.value).toBe(menu[0].title);
});

/* makeListElement accepts two strings (one indicating the tagName and the other the innerText value) 
and an object containing key:value pairs that will be set as attributes, and returns an element */

/* useSuggestion sets the value of the searchBar to be equal to the value of the "data-value" attribute of the event target 
(the list element generated by makeListElement)  */
