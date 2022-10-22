/*  ---  MOCK DATA ---- */

const anno_keys = {
  wikidata_qid: "Wikidata item ID",
  for_wikis:
    "A string or array of strings describing the wiki(s) this tool can be used on.  Use hostnames such as <code>zh.wiktionary.org</code>.  Use asterisks as wildcards.  For example, <code>*.wikisource.org</code> means 'this tool works on all Wikisource wikis.'  <code>*</code> means 'this works on all wikis, including Wikimedia wikis.'",
  icon: "A link to a Wikimedia Commons file description page for an icon that depicts the tool.",
  available_ui_languages:
    "The language(s) the tool's interface has been translated into.  Use <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language codes</a> like <code>zh</code> and <code>scn</code>.",
  tool_type:
    "The manner in which the tool is used.  Select one from the available options.",
  repository: "A link to the repository where the tool code is hosted.",
  api_url: "A link to the tool's API, if available.",
  developer_docs_url:
    "A link to the tool's developer documentation, if available.",
  tool_docs_url: "A link to the tool's tool documentation, if available.",
  feedback_url:
    "A link to a location where the tool's tool can leave feedback.",
  privacy_policy_url: "A link to the tool's privacy policy, if available.",
  translate_url: "A link to the tool's translation interface.",
  bugtracker_url:
    "A link to the tool's bug tracker on GitHub, Bitbucket, Phabricator, etc.",
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
    "tool_docs_url",
    "feedback_url",
    "privacy_policy_url",
    "translate_url",
  ],
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

const availableTools = [pywikibot, mm_wikidata_todo];

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
  prepToolLinks(tool);
  prepTask(tool, task);
}

/* Function for populating the div with id "task-info"
It's producing three things:  
1. A statement of the task.
2. An input element (or elements) appropriate to the task type.
3. A description of the requested value.
*/

function prepTask(tool, task) {
  let callToAction = document.createElement("h3");
  callToAction.innerText = `${tool.title} is missing its ${task}.  Can you find it?`;
  document.getElementById("task-form").appendChild(callToAction);
  let taskDescription = document.createElement("p");
  if (task === "for_wikis" || task === "available_ui_languages") {
    taskDescription.innerHTML = `${task}: ${anno_keys[task]}`;
  } else taskDescription.innerText = `${task}: ${anno_keys[task]}`;
  document.getElementById("task-form").appendChild(taskDescription);
}

/* Functions for populating the div with id "tool-info"
They're producing a list of relevant links taken from the data for the selected tool.
*/

function prepToolLinks(tool) {
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
