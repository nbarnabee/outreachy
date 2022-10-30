/*  ---  MOCK DATA ---- */

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

const mm_wikidata_todo = {
  title: "Wikidata Todo",
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

const totally_fake = {
  title: "A totally fake tool",
  description: "I just made this one up to test some things.",
  toolhub: "https://toolhub.wikimedia.org/tools/mm_wikidata_todo",
  url: "http://www.google.com",
  missing: ["tool_type", "available_ui_languages", "for_wikis"],
};

const pywikibot = {
  title: "Pywikibot",
  description:
    "Python library and collection of scripts that automate work on MediaWiki sites",
  toolhub: "https://toolhub.wikimedia.org/tools/pywikibot",
  url: "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
  repository: "https://gerrit.wikimedia.org/g/pywikibot/core",
  missing: ["wikidata_qid", "api_url", "feedback_url", "privacy_policy_url"],
};

const availableTools = [pywikibot, mm_wikidata_todo, totally_fake];

/* I'm declaring taskNum and oldNum globally so that I can access their values 
when "skipping" a task. This ensures that the same task won't come up twice in a row. */

let taskNum, oldNum;

// Function that resets the page and selects a new task when the user clicks "skip"

document.getElementById("get-new-task").addEventListener("click", function () {
  clearElements();
  getTask(oldNum);
});

/* Function that picks a tool from the mock data set 
and selects one of the elements from its "missing" array */

function getTask(num) {
  oldNum = num;
  let toolNum = Math.floor(Math.random() * availableTools.length);
  let tool = availableTools[toolNum];
  taskNum = Math.floor(Math.random() * tool.missing.length);
  while (taskNum === oldNum) {
    taskNum = Math.floor(Math.random() * tool.missing.length);
  }
  let task = tool.missing[taskNum];
  oldNum = taskNum;
  populateToolLinks(tool, task);
  populateTaskDiv(tool, task);
}

/* Functions for populating the div with id "task-info"

We have a main function, which calls a set of functions that produce the following elements: 
1. A statement of the task.
2. An input element (or elements) appropriate to the task type.
3. A description of the requested value.
4. (Where appropriate) a button to add additional fields.
5. A submit button.
*/

function populateTaskDiv(tool, task) {
  let taskForm = document.getElementById("task-form");
  taskForm.appendChild(createTaskStatement(tool, task));
  const taskInputs = createInput(task);
  // array expected
  taskInputs.forEach((entry) => taskForm.appendChild(entry));
  taskForm.appendChild(createTaskDescription(task));
  taskForm.appendChild(makeButtons(task));
}

function createTaskStatement(tool, task) {
  let taskStatement = document.createElement("h3");
  taskStatement.innerText = `${tool.title} is missing its ${task}.`;
  return taskStatement;
}

function createInput(task) {
  const inputs = [];
  if (taskType[task].options) {
    /* For the task "tool_type" users must select from a pre-defined set of options.
    However, it might be possible to define a set of possible options for additional task types. 
    Therefore, at Damilare's suggestion, I've expanded its functionality
    Now, any tool which has a defined "options" key will trigger it. */
    inputs.push(buildSelectMenu(task));
  } else {
    taskType[task].input.forEach((entry, i) => {
      const newInput = document.createElement("input");
      newInput.type = [entry];
      newInput.required = true;
      newInput.setAttribute("name", task);
      /* In the event that an ISO 639 language code is required, I want that to be
       clearly indicated.  The value should default to "en" in all cases other than
      "available_ui_languages" */
      if (i === 1) newInput.value = "en";
      else if (task === "available_ui_languages")
        newInput.placeholder = "ISO 639-1 language code";
      else newInput.placeholder = task;
      inputs.push(newInput);
    });
  }
  return inputs;
}

/* a note about available_ui_languages generally - if, as stated in the API docs, the default value should be "en," then surely that should be auto-generated on tool creation? */

function buildSelectMenu(task) {
  const newSelect = document.createElement("select");
  newSelect.setAttribute("name", task);
  taskType[task].options.forEach((entry) => {
    let option = document.createElement("option");
    option.value = [entry];
    option.innerText = [entry];
    newSelect.appendChild(option);
  });
  return newSelect;
}

function createTaskDescription(task) {
  let taskDescription = document.createElement("p");
  if (taskType[task].description.includes("</")) {
    taskDescription.innerHTML = `${task}: ${taskType[task].description}`;
  } else taskDescription.innerText = `${task}: ${taskType[task].description}`;
  taskDescription.style.maxWidth = "66ch";
  return taskDescription;
}

function makeButtons(task) {
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("row");
  buttonContainer.classList.add("row-gap");
  // "for_wikis" and "available_ui_languages" can take multiple inputs
  if (taskType[task].multiple === true) {
    buttonContainer.appendChild(makeAddButton(task));
  }
  let submitButton = document.createElement("button");
  submitButton.setAttribute("type", "button");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", fakeSubmit);
  buttonContainer.appendChild(submitButton);
  return buttonContainer;
}

/* This function produces a button that, when clicked, 
  will append a new input element to the existing inputs */

function makeAddButton(task) {
  let addButton = document.createElement("button");
  addButton.setAttribute("type", "button");
  addButton.innerText = "Add another value";
  addButton.addEventListener("click", function () {
    const newInput = createInput(task)[0];
    let inputs = Array.from(document.getElementsByName([task]));
    inputs[inputs.length - 1].insertAdjacentElement("afterend", newInput);
  });
  return addButton;
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

// Function to reset the content of the divs "tool-info" and "task-info" when the "skip button is pressed"

function clearElements() {
  document.getElementById("task-form").innerHTML = "";
  const disposableLinks = Array.from(document.querySelectorAll(".disposable"));
  disposableLinks.forEach((link) => link.remove());
  document.getElementById("repository-link").hidden = true;
  document.getElementById("wikidata-link").hidden = true;
  document.getElementById("wikimedia-link").hidden = true;
  document.getElementById("info-missing").checked = false;
}

/* Upon clicking the submit button, the modal pops open.  Closing the modal triggers
a tool reset.  */

function fakeSubmit() {
  document.body.classList.add("modal-open");
}

document.querySelector(".close-modal").addEventListener("click", function () {
  document.body.classList.remove("modal-open");
  clearElements();
  getTask(oldNum);
});

getTask(null);
