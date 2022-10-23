// The following data was produced in my Juypter notebook.

const missingFieldStats = {
  totalTools: 2702,
  toolsMissingInfo: 2701,
  howMuchIsMissing: {
    // number of fields missing : number of tools for which this is true
    0: 1,
    1: 1,
    3: 7,
    4: 6,
    5: 10,
    6: 23,
    7: 32,
    8: 68,
    9: 91,
    10: 108,
    11: 759,
    12: 450,
    13: 1146,
  },
  whatIsMissing: {
    tool_type: 1671,
    repository: 1893,
    user_docs_url: 1958,
    available_ui_languages: 2363,
    bugtracker_url: 2419,
    developer_docs_url: 2587,
    for_wikis: 2636,
    api_url: 2647,
    feedback_url: 2653,
    icon: 2669,
    wikidata_qid: 2679,
    translate_url: 2681,
    privacy_policy_url: 2692,
  },
};

// I'm thinking pie charts for those.

// Mock data sets now

const globalContributions = {
  thisMonth: 73,
  allTime: 226,
};

const mockUser = {
  user: "NicoleLBee",
  contributions: {
    thisMonth: 4,
    total: 7,
  },
  latestActivity: [
    {
      toolName: "pywikibot",
      toolTitle: "Pywikibot",
      fieldEdited: "available_ui_languages",
      dateModified: 1666514747862,
    },
    {
      toolName: "mm_wikidata_todo",
      toolTitle: "Wikidata Todo",
      fieldEdited: "for_wikis",
      dateModified: 1652227200000,
    },
    {
      toolName: "mm_find_duplicate_items",
      toolTitle: "Find duplicate items",
      fieldEdited: "repository",
      dateModified: 1651449600000,
    },
    {
      toolName: "pywikibot",
      toolTitle: "Pywikibot",
      fieldEdited: "icon",
      dateModified: 1651447200000,
    },
  ],
};

// base URL for Toolhub https://toolhub.wikimedia.org/tools/
// base URL for users: https://en.wikipedia.org/wiki/User:

const globalActivity = [
  {
    user: "DannyBoyyy77",
    link: "https://en.wikipedia.org/wiki/User:DannyBoyyy77",
    toolName: "xtools-ec",
    toolTitle: "XTools Edit Counter",
    fieldEdited: "icon",
    dateModified: 1666514747862,
  },
  {
    user: "Ellenello",
    link: "https://en.wikipedia.org/wiki/User:Ellenello",
    toolName: "metawiki-jon-harald-søby-diffedit",
    toolTitle: "diffedit",
    fieldEdited: "repository",
    dateModified: 1666505047862,
  },
  {
    user: "DannyBoyyy77",
    link: "https://en.wikipedia.org/wiki/User:DannyBoyyy77",
    toolName: "xtools-ec",
    toolTitle: "XTools Edit Counter",
    fieldEdited: "privacy_policy_url",
    dateModified: 1666500047862,
  },
  {
    user: "Javier Alejandro Herrera Carvajal",
    link: "https://en.wikipedia.org/wiki/User:Javier%20Alejandro%20Herrera%20Carvajal",
    toolName: "toolforge-croptool",
    toolTitle: "CropTool",
    fieldEdited: "available_ui_languages",
    dateModified: 1666410745862,
  },
  {
    user: "Tabby578",
    link: "https://en.wikipedia.org/wiki/User:Tabby578",
    toolName: "pywikibot",
    toolTitle: "Pywikibot",
    fieldEdited: "tool_type",
    dateModified: 1666304737862,
  },
];

/* ------  Functions to populate page -------- */

function createElements() {
  document.querySelector(
    ".user-name"
  ).innerText = `Welcome back, ${mockUser.user}!`;
}

createElements();
