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
      "The language(s) the tool's interface has been translated into.  Use <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language codes</a> like <code>zh</code> and <code>scn</code>.",
    input: ["text"],
    multiple: "true",
    pattern: ["^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  tool_type: {
    description:
      "The manner in which the tool is used.  Select one from the available options.",
    input: ["select"],
    multiple: false,
    pattern: [null],
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
      "A link to the tool's developer documentation, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language code</a> that indicates the documentation's language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  user_docs_url: {
    description:
      "A link to the tool's user documentation, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language code</a> that indicates the documentation's language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  feedback_url: {
    description:
      "A link to a location where the tool's user can leave feedback, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language code</a> that indicates the expected language.  (If no value is given, this value will default to <code>en</code>.)",
    input: ["url", "text"],
    multiple: false,
    pattern: [null, "^(x-.*|[A-Za-z]{2,3}(-.*)?)$"],
  },
  privacy_policy_url: {
    description:
      "A link to the tool's privacy policy, and an <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language code</a> that indicates the policy's language.  (If no value is given, this value will default to <code>en</code>.)",
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
  toolhub: "https://toolhub.wikimedia.org/tools/mm_wikidata_todo",
  description: "I just made this one up to test some things.",
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

// const availableTools = [pywikibot, mm_wikidata_todo, totally_fake];

const availableTools = [totally_fake];

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
  populateToolLinks(tool);
  populateTaskDiv(tool, task);
}

/* Functions for populating the div with id "task-info"
Three functions which produce three things, and a head function that calls them in turn:  
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
  taskForm.appendChild(createTaskDescription(tool, task));
}

function createTaskStatement(tool, task) {
  let taskStatement = document.createElement("h3");
  taskStatement.innerText = `${tool.title} is missing its ${task}.  Can you find it?`;
  return taskStatement;
}

function createInput(task) {
  const inputs = [];
  if (task === "tool_type") {
    // For "tool_type" users must select from a pre-defined set of answers.
    // This gets a little complicated so I'll make it its own function.
    inputs.push(buildSelectMenu());
  } else {
    taskType[task].input.forEach((entry) => {
      const newInput = document.createElement("input");
      newInput.type = [entry];
      newInput.required = true;
      newInput.setAttribute("name", task);
      newInput.placeholder = task;
      inputs.push(newInput);
    });
  }
  return inputs;
}

function buildSelectMenu() {
  const tool_types = [
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
  ];
  const newSelect = document.createElement("select");
  newSelect.setAttribute("name", "tool_type");
  tool_types.forEach((type) => {
    let option = document.createElement("option");
    option.value = [type];
    option.innerText = [type];
    newSelect.appendChild(option);
  });
  return newSelect;
}

function createTaskDescription(tool, task) {
  let taskDescription = document.createElement("p");
  if (taskType[task].description.includes("</")) {
    taskDescription.innerHTML = `${task}: ${taskType[task].description}`;
  } else taskDescription.innerText = `${task}: ${taskType[task].description}`;
  taskDescription.style.maxWidth = "66ch";
  return taskDescription;
}

/* Functions for populating the div with id "tool-info"
They're producing a list of relevant links taken from the data for the selected tool.
*/

function populateToolLinks(tool) {
  const toolNameReferences = Array.from(
    document.querySelectorAll(".tool-name")
  );
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

// Function to reset the content of the divs "tool-info" and "task-info"

function clearElements() {
  document.getElementById("task-form").innerHTML = "";
  const disposableLinks = Array.from(document.querySelectorAll(".disposable"));
  disposableLinks.forEach((link) => link.remove());
  document.getElementById("repository-link").hidden = true;
}

getTask(null);
