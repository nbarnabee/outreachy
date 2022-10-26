// The following data was produced in my Juypter notebook.

const globalStats = {
  totalTools: 2702,
  toolsMissingInfo: 2701,
  missingByCount: {
    // number of fields missing : number of tools for which this is true
    0: 1,
    1: 1,
    2: 0,
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
  missingByType: {
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

// So few tools are missing between 1 and 10 values that there's no point in representing them individually on the chart.

function calcOneToTen() {
  let oneToTen = 0;
  for (let i = 1; i <= 10; i++) {
    oneToTen += globalStats.missingByCount[i];
  }
  globalStats.missingByCount.oneToTen = oneToTen;
}

calcOneToTen();

// Mock data sets now

const userActivity = {
  user: "NicoleLBee",
  contributions: {
    recent: 1,
    total: 4,
  },
  latestActivity: [
    {
      toolName: "pywikibot",
      toolTitle: "Pywikibot",
      fieldEdited: "available_ui_languages",
      dateModified: 1666214747862,
    },
    {
      toolName: "mm_wikidata_todo",
      toolTitle: "Wikidata Todo",
      fieldEdited: "for_wikis",
      dateModified: 1658227200000,
    },
    {
      toolName: "mm_find_duplicate_items",
      toolTitle: "Find duplicate items",
      fieldEdited: "repository",
      dateModified: 1655449600000,
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

const globalActivity = {
  contributions: {
    recent: 73,
    total: 226,
  },
  latestActivity: [
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
  ],
};

/* ------  Functions to populate page -------- */

function createGreeting() {
  document.querySelector(
    ".user-name"
  ).innerText = `Welcome back, ${userActivity.user}!`;
}

/* This function takes an array of values and a table id (either "user-contributions"or "global-contributions"), and populates the given table. It is similar to the 
populateTable() function I wrote in the leaderboard.js file, and the two could probably be combined.
 */

function fillTable(contributionsArray, tableID) {
  const activity = contributionsArray.latestActivity;
  sortedContributions = activity.sort(
    (a, b) => b.dateModified - a.dateModified
  );
  const tableBody = document.getElementById(tableID);
  for (let entry of sortedContributions) {
    let row = document.createElement("tr");
    tableBody.appendChild(row);
    // Create and insert the date field
    let date = document.createElement("td");
    let dateObj = new Date(entry.dateModified);
    date.innerText = dateObj.toLocaleDateString();
    row.appendChild(date);
    // If this is the "global activity" table, we have to fill the "user" column
    // Otherwise it can be skipped.
    if (tableID === "global-contributions") {
      let user = document.createElement("td");
      // Check to see that the user does have a profile link
      if (entry.user.link) user.appendChild(makeElementWithLink(entry, "user"));
      else user.innerText = entry.user;
      row.appendChild(user);
    }
    let contribution = document.createElement("td");
    contribution.innerText = `Added ${entry.fieldEdited} to `;
    let toolLink = makeElementWithLink(entry, "tool");
    contribution.appendChild(toolLink);
    row.appendChild(contribution);
  }
}

// For generating the links to insert in the table
// Currently, the value of "type" would be either "tool" or "user"
function makeElementWithLink(entry, type) {
  let link = document.createElement("a");
  if (type === "tool") {
    link.setAttribute(
      "href",
      `https://toolhub.wikimedia.org/tools/${entry.toolName}`
    );
    link.innerText = entry.toolTitle;
  } else {
    link.setAttribute("href", entry.link);
    link.innerText = entry.user;
  }
  link.setAttribute("target", "_blank");
  return link;
}

/* ----  Filling in the "At A Glance," "Contribution Stats," and
"How Much Are We Missing?" cards --- */

function fillStatsCards(global, user, globalUsers) {
  document.getElementById("tool-num-total").innerText = global.totalTools;
  document.getElementById("tool-missing-data-total").innerText =
    global.toolsMissingInfo;
  missingPercent = (
    (global.toolsMissingInfo / global.totalTools) *
    100
  ).toFixed(2);
  document.getElementById(
    "tool-missing-data-percent"
  ).innerText = `${missingPercent}%`;
  document.getElementById("user-contributions-recent").innerText =
    user.contributions.recent;
  document.getElementById("user-contributions-total").innerText =
    user.contributions.total;
  document.getElementById("global-contributions-recent").innerText =
    globalUsers.contributions.recent;
  document.getElementById("global-contributions-total").innerText =
    globalUsers.contributions.total;
  document.getElementById("one-to-ten").innerText = (
    (347 / global.totalTools) *
    100
  ).toFixed(2);
  document.getElementById("eleven").innerText = (
    (global.missingByCount[11] / global.totalTools) *
    100
  ).toFixed(2);
  document.getElementById("twelve").innerText = (
    (global.missingByCount[12] / global.totalTools) *
    100
  ).toFixed(2);
  document.getElementById("thirteen").innerText = (
    (global.missingByCount[13] / global.totalTools) *
    100
  ).toFixed(2);
}

/* ------- Defining the charts --------- */

// Displaying the # of missing values

const chart1 = document.getElementById("missing-values-count");
const missingValues = new Chart(chart1, {
  type: "pie",
  data: {
    labels: ["1-10", "11", "12", "13"],
    datasets: [
      {
        label: "# of missing values",
        data: [
          globalStats.missingByCount.oneToTen,
          globalStats.missingByCount[11],
          globalStats.missingByCount[12],
          globalStats.missingByCount[13],
        ],
        backgroundColor: ["#7698ff", "#ff7062", "#5ee7be", "#ffff6e"],
        borderColor: ["#567fe9", "#fd524a", "#3ccba3", "#ffe852"],
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "# of Tools That Are Missing Values",
        align: "center",
      },
    },
  },
});

createGreeting();
fillTable(userActivity, "user-contributions");
fillTable(globalActivity, "global-contributions");
fillStatsCards(globalStats, userActivity, globalActivity);
