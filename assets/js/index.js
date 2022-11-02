/* --------------------- */
/*  ---  MOCK DATA ---- */
/* ----------------------- */

const taskType = {
  wikidata_qid: {
    description: "Wikidata item ID",
    input: ["text"],
    inputDescription: ["item ID"],
    multiple: false,
    pattern: ["^Qd+$"],
  },
  for_wikis: {
    description:
      "A string or array of strings describing the wiki(s) this tool can be used on.  Use hostnames such as <code>zh.wiktionary.org</code>.  Use asterisks as wildcards.  For example, <code>*.wikisource.org</code> means 'this tool works on all Wikisource wikis.'  <code>*</code> means 'this works on all wikis, including Wikimedia wikis.'",
    input: ["text"],
    multiple: true,
    pattern: [
      "^(*|(.*)?.?(mediawiki|wiktionary|wiki(pedia|quote|books|source|news|versity|data|voyage|media)).org)$",
    ],
  },
  icon: {
    description:
      "A link to a Wikimedia Commons file description page for an icon that depicts the tool.",
    input: ["url"],
    multiple: false,
    pattern: ["^https://commons.wikimedia.org/wiki/File:.+..+$"],
  },
  available_ui_languages: {
    description:
      "The language(s) the tool's interface has been translated into.  Use <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639-1 language codes</a> like <code>zh</code> and <code>scn</code>.",
    input: ["text"],
    multiple: true,
    pattern: ["^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  tool_type: {
    description:
      "The manner in which the tool is used.  Select one of the available options.",
    input: ["select"],
    multiple: false,
    pattern: [null],
    options: [
      "web app",
      "desktop app",
      "bot",
      "gadget",
      "user script",
      "command line tool",
      "coding framework",
      "lua module",
      "template",
      "other",
    ],
  },
  repository: {
    description: "A link to the repository where the tool code is hosted.",
    input: ["url"],
    multiple: false,
    pattern: [null],
  },
  api_url: {
    description: "A link to the tool's API, if available.",
    input: ["url"],
    multiple: false,
    pattern: [null],
  },
  developer_docs_url: {
    description:
      "A link to the tool's developer documentation, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639-1 language code</a> that indicates the documentation's language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  user_docs_url: {
    description:
      "A link to the tool's user documentation, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639-1 language code</a> that indicates the documentation's language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  feedback_url: {
    description:
      "A link to a location where the tool's user can leave feedback, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639-1 language code</a> that indicates the expected language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  privacy_policy_url: {
    description:
      "A link to the tool's privacy policy, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639-1 language code</a> that indicates the policy's language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  translate_url: {
    description: "A link to the tool's translation interface.",
    input: ["url"],
    multiple: false,
    pattern: [null],
  },
  bugtracker_url: {
    description:
      "A link to the tool's bug tracker on GitHub, Bitbucket, Phabricator, etc.",
    input: ["url"],
    multiple: false,
    pattern: [null],
  },
};

const wikidata_todo = {
  title: "Wikidata Todo",
  name: "mm_wikidata_todo",
  toolhub: "https://toolhub.wikimedia.org/tools/mm_wikidata_todo",
  description: "Shows you little things you can do on Wikidata.",
  url: "http://tools.wmflabs.org/wikidata-todo",
  repository: "https://bitbucket.org/magnusmanske/wikidata-todo",
  missing: [
    "wikidata_qid",
    "for_wikis",
    "icon",
    "api_url",
    "user_docs_url",
    "feedback_url",
    "privacy_policy_url",
    "translate_url",
  ],
};

const a_totally_fake_tool = {
  title: "A totally fake tool",
  name: "totally_fake",
  description: "I just made this one up to test some things.",
  toolhub: "https://toolhub.wikimedia.org/tools/mm_wikidata_todo",
  url: "http://www.google.com",
  missing: ["tool_type", "available_ui_languages", "for_wikis"],
};

const pywikibot = {
  title: "Pywikibot",
  name: "pywikibot",
  description:
    "Python library and collection of scripts that automate work on MediaWiki sites",
  toolhub: "https://toolhub.wikimedia.org/tools/pywikibot",
  url: "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
  repository: "https://gerrit.wikimedia.org/g/pywikibot/core",
  missing: ["wikidata_qid", "api_url", "feedback_url", "privacy_policy_url"],
};

const availableTools = [pywikibot, wikidata_todo, a_totally_fake_tool];

/* -----------------------------------------  */
/* --------- CREATE ELEMENTS --------------- */
/* ---------------------------------------  */

// A set of general functions used to create various page elements

/* This function takes an array that contains the possible options and a string 
which will be set as the select element's "name" value, and returns a <select> element */

function buildSelectMenu(options, nameValue) {
  const newSelect = document.createElement("select");
  newSelect.setAttribute("name", nameValue);
  options.forEach((entry) => {
    let optionElement = document.createElement("option");
    optionElement.value = [entry];
    optionElement.innerText = [entry];
    newSelect.appendChild(optionElement);
  });
  return newSelect;
}

/* A function which accepts an innerText string, a callback function, an optional array 
for listing class names, and an optional value */

function makeButton(text, callBack, classArr, val) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.innerText = text;
  button.addEventListener("click", callBack);
  if (classArr) classArr.forEach((item) => button.classList.add(item));
  if (val) button.value = val;
  return button;
}

/* ------------------------------ */
/* ------ BUTTON-RELATED FUNCTIONS ---- */
/* -------------------------------- */

/* ---------- SEARCH & SURPRISE ME -------------- */

document
  .getElementById("show-search-bar")
  .addEventListener("click", showSearch);

document.getElementById("surprise-button").addEventListener("click", () => {
  document.querySelector(".task-wrapper").hidden = false;
  document.querySelector(".start-button-container").style.display = "none";
  getTask();
});

function showSearch() {
  document.querySelector(".search-bar-container").style.display = "flex";
  document.querySelector(".start-button-container").style.display = "none";
  const backButton = makeButton("< Back", () => location.reload(), [
    "remove-on-get-task",
  ]);
  document.getElementById("start-search-wrapper").appendChild(backButton);
}

/* ----------- SUBMIT (opens and closes modal) ------- */
/* ---- Closing the modal triggers a page refresh.  --- */

function fakeSubmit() {
  document.body.classList.add("modal-open");
}

document.querySelector(".close-modal").addEventListener("click", function () {
  location.reload();
});

/* ----------- GET NEW TASK ---------------- */
// Reloads the page

document.getElementById("get-new-task").addEventListener("click", function () {
  location.reload();
});

/* ------------------------------ */
/* ------ SEARCH BAR FUNCTIONS ---- */
/* -------------------------------- */

/* -------- AUTO-SUGGESTIONS -------------- */

const searchBar = document.getElementById("search-bar");
const suggestions = document.getElementById("suggestions-list");

/* This function will be called after every keyup event in the search bar.
TO DO:  add debounce */

function searchHandler(e) {
  /* If the user has pressed "enter," run the search function */
  if (e.keyCode === 13) {
    findTool();
    return;
  }
  /* If the "no results found" span was visible, I need it to vanish as soon as
  the user begins another query */
  document.querySelector(".no-results").hidden = true;
  const inputVal = e.currentTarget.value;
  let menu = [];
  if (inputVal.length > 0) {
    menu = buildSuggestionsMenu(inputVal);
  }
  showSuggestions(menu, inputVal);
}

function buildSuggestionsMenu(str) {
  let menu = [];
  const val = str.toLowerCase();
  for (let i = 0; i < availableTools.length; i++) {
    if (availableTools[i].title.toLowerCase().indexOf(val) > -1) {
      menu.push(availableTools[i]);
    }
  }
  return menu;
}

/* When the "menu" array contains content, this will add the array elements
 to the <ul> and add a new class that will set the list to display.  */

function showSuggestions(menu) {
  suggestions.innerHTML = "";
  if (menu.length > 0) {
    menu.forEach((item) => {
      let listItem = makeListElement("li", item.title, {
        "data-value": item.title,
      });
      let itemDesc = makeListElement("span", item.description, {
        "data-value": item.title,
      });
      suggestions.appendChild(listItem);
      listItem.appendChild(itemDesc);
    });
    suggestions.classList.add("has-suggestions");
  } else {
    menu = [];
    suggestions.innerHTML = "";
    suggestions.classList.remove("has-suggestions");
  }
}

function makeListElement(tagName, innerText, attributeObj) {
  let newItem = document.createElement(tagName);
  newItem.innerText = innerText;
  for (let entry in attributeObj) {
    newItem.setAttribute(entry, attributeObj[entry]);
  }
  return newItem;
}

/* On click, the value of the search bar will be set to the value of the list item */

function useSuggestion(e) {
  searchBar.value = e.target.dataset.value;
  searchBar.focus();
  suggestions.innerHTML = "";
  suggestions.classList.remove("has-suggestions");
}

searchBar.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);

/* ---------- SEARCHING ------------ */

document
  .getElementById("search-bar-button")
  .addEventListener("click", findTool);

function findTool() {
  suggestions.classList.remove("has-suggestions");
  let searchValue = searchBar.value;
  for (let item of availableTools) {
    if (item.title === searchValue) {
      // If the value matches one of the available tools, build the task selector
      // I also want to clear any other tasks that might be displayed
      clearElements();
      buildSearchResult(item);
      searchBar.value = "";
      return;
    }
  }
  document.querySelector(".no-results").hidden = false;
  searchBar.value = "";
}

function buildSearchResult(item) {
  const resultWrapper = document.querySelector(".search-result-wrapper");
  const resultDiv = document.getElementById("search-result");
  // remove any existing "get task" buttons
  if (document.querySelector(".remove-on-search")) {
    document.querySelector(".remove-on-search").remove();
  }
  resultDiv.innerHTML = "";
  const titleTask = document.createElement("p");
  if (item.missing.length === 0)
    titleTask.innerText = `${item.title} isn't missing any values.  How wonderful!  You'll have to find another tool to work on.`;
  else {
    titleTask.innerText = `${item.title} is missing the following values.  Which one would you like to find?`;
    titleTask.appendChild(buildSelectMenu(item.missing, "task"));
    const searchResultButton = makeButton(
      "Get Task",
      getSearchTask,
      ["remove-on-search"],
      item.name
    );
    resultWrapper.appendChild(searchResultButton);
  }
  resultDiv.appendChild(titleTask);
}

function getSearchTask(e) {
  /* It is possible that there could be multiple select menus on the page, but 
  the particular select menu that I am looking for here will always be the first.  */
  const selectMenus = Array.from(document.getElementsByTagName("select"));
  const task = selectMenus[0].value;
  let toolObj;
  availableTools.forEach((tool) => {
    if (tool.name === e.target.value) {
      toolObj = tool;
      return;
    }
  });
  clearElements();
  if (document.querySelector(".remove-on-get-task")) {
    // removes the "back" button, if it exists
    document.querySelector(".remove-on-get-task").remove();
  }
  populateTaskDiv(toolObj, task);
  populateToolLinks(toolObj, task);
}

/* Function to reset the content of the divs "tool-info" and "task-info" if the user 
does another search or selects another task from the options given  */

function clearElements() {
  document.getElementById("task-form").innerHTML = "";
  document.querySelector(".task-wrapper").hidden = true;
  const disposableItems = Array.from(document.querySelectorAll(".disposable"));
  disposableItems.forEach((item) => item.remove());
  document.getElementById("repository-link").hidden = true;
  document.getElementById("wikidata-link").hidden = true;
  document.getElementById("wikimedia-link").hidden = true;
  document.getElementById("info-missing").checked = false;
}

/* ----------------------------------------------- */
/* ------- POPULATING THE TOOL/TASK SECTIONS ---- */
/* ---------------------------------------------- */

/* Function that picks a tool from the mock data set 
and selects one of the elements from its "missing" array */

function getTask() {
  let toolNum = Math.floor(Math.random() * availableTools.length);
  let tool = availableTools[toolNum];
  let taskNum = Math.floor(Math.random() * tool.missing.length);
  let task = tool.missing[taskNum];
  populateToolLinks(tool, task);
  populateTaskDiv(tool, task);
}

/* Functions for populating the div with id "task-info"

This takes an object (the tool) and a string (the task)

We have a main function, which calls a set of functions that produce the following elements: 
1. A statement of the task.
2. An input element (or elements) appropriate to the task type.
3. A description of the requested value.
4. (Where appropriate) a button to add additional fields.
5. A submit button.
*/

function populateTaskDiv(tool, task) {
  document.querySelector(".task-wrapper").hidden = false;
  let taskForm = document.getElementById("task-form");
  taskForm.appendChild(makeTaskHeading(tool, task));
  const taskInputs = buildInputs(task);
  // array expected
  taskInputs.forEach((entry) => taskForm.appendChild(entry));
  taskForm.appendChild(makeTaskDescription(task));
  taskForm.appendChild(buildButtonContainer(task));
}

function makeTaskHeading(tool, task) {
  let taskHeading = document.createElement("h3");
  taskHeading.innerText = `${tool.title} is missing its ${task}.`;
  return taskHeading;
}

function buildInputs(task) {
  const inputs = [];
  if (taskType[task].options) {
    /* For the task "tool_type" users must select from a pre-defined set of options.
    However, it might be possible to define a set of possible options for additional task types. 
    Any tool which has a defined "options" key will trigger it. */
    inputs.push(buildSelectMenu(taskType[task].options, task));
  } else {
    taskType[task].input.forEach((entry, i) => {
      const newInput = document.createElement("input");
      newInput.type = [entry];
      newInput.setAttribute("name", task);
      /* In the event that an ISO 639 language code is required, I want that to be
       clearly indicated.  The value should default to "en" in all cases other than
      "available_ui_languages" */
      if (i === 1)
        newInput.placeholder = "ISO 639-1 language code (defaults to 'en')";
      else if (task === "available_ui_languages")
        newInput.placeholder = "ISO 639-1 language code";
      else newInput.placeholder = task;
      inputs.push(newInput);
    });
  }
  return inputs;
}

function makeTaskDescription(task) {
  const taskDescription = document.createElement("p");
  taskDescription.innerHTML = `<b>${task}</b>: ${taskType[task].description}`;
  taskDescription.style.maxWidth = "66ch";
  return taskDescription;
}

function buildButtonContainer(task) {
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("row");
  buttonContainer.classList.add("row-gap");
  // "for_wikis" and "available_ui_languages" can take multiple inputs
  if (taskType[task].multiple === true) {
    const addInput = function () {
      const newInput = buildInputs(task)[0];
      let inputs = Array.from(document.getElementsByName([task]));
      inputs[inputs.length - 1].insertAdjacentElement("afterend", newInput);
    };
    const addButton = makeButton("Add another value", addInput);
    buttonContainer.appendChild(addButton);
  }
  let submitButton = makeButton("Submit", fakeSubmit);
  buttonContainer.appendChild(submitButton);
  return buttonContainer;
}

/* Functions for populating the div with id "tool-info" with a list of relevant 
links taken from the data for the selected tool.

All tools must have both a URL and a Toolhub link, so those will always be included.
If the tool has a repository, the function will generate a link.
If the task is wikidata_qid the function will reveal the link to Wikidata.
If the task is icon the function will reveal the link to Wikimedia Commons.

*/

function populateToolLinks(tool, task) {
  const toolNameReferences = Array.from(
    document.querySelectorAll(".tool-name")
  );
  // This fills in the blank spans in the hardcoded "li" elements
  toolNameReferences.forEach((reference) => (reference.innerText = tool.title));
  const toolhubLink = makeLink(tool, "toolhub");
  document.getElementById("toolhub-link").appendChild(toolhubLink);
  const urlLink = makeLink(tool, "url");
  document.getElementById("url-link").appendChild(urlLink);
  if (tool.repository) {
    const repositoryLink = makeLink(tool, "repository");
    document.getElementById("repository-link").appendChild(repositoryLink);
    document.getElementById("repository-link").hidden = false;
  }
  if (task === "wikidata_qid")
    document.getElementById("wikidata-link").hidden = false;
  if (task === "icon") document.getElementById("wikimedia-link").hidden = false;
}

function makeLink(tool, linkType) {
  let toolLink = document.createElement("a");
  toolLink.setAttribute("href", tool[linkType]);
  toolLink.setAttribute("target", "_blank");
  // The "disposable" class allows me to remove the links without touching the rest of the element
  toolLink.classList.add("disposable");
  toolLink.style.color = "var(--blue)";
  toolLink.style.textDecoration = "underline";
  toolLink.innerText = tool[linkType];
  return toolLink;
}
