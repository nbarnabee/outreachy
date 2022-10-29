const leaderboard = [
  {
    user: "DannyBoyyy77",
    link: "https://en.wikipedia.org/wiki/User:DannyBoyyy77",
    latest: 23,
    allTime: 56,
  },
  {
    user: "Tabby578",
    link: "https://en.wikipedia.org/wiki/User:Tabby578",
    latest: 19,
    allTime: 19,
  },
  {
    user: "Ellenello",
    link: "https://en.wikipedia.org/wiki/User:Ellenello",
    latest: 11,
    allTime: 39,
  },
  {
    user: "Poppa shark",
    link: "https://en.wikipedia.org/wiki/User:Poppa%20shark",
    latest: 9,
    allTime: 12,
  },
  {
    user: "Javier Alejandro Herrera Carvajal",
    link: "https://en.wikipedia.org/wiki/User:Javier%20Alejandro%20Herrera%20Carvajal",
    latest: 7,
    allTime: 21,
  },
];

/* For each object within an array of objects, this function returns a <tr> element that contains two <td> elements:  one containing the user name and a link to the user's profile, and the other containing the user's score */

function populateTable(tableID) {
  sortedLeaderboard = leaderboard.sort((a, b) => b[tableID] - a[tableID]);
  const tableBody = document.getElementById(tableID);
  for (let entry of sortedLeaderboard) {
    let row = document.createElement("tr");
    tableBody.appendChild(row);
    row.appendChild(createUserEntry(entry));
    row.appendChild(createScoreEntry(entry, tableID));
  }
}

/* This function accepts a user object and returns a <td> 
element that contains the user name and a profile link */

function createUserEntry(entry) {
  let userEntry = document.createElement("td");
  let userLink = createUserLink(entry);
  userEntry.appendChild(userLink);
  let user = document.createElement("span");
  user.innerText = entry.user;
  userLink.appendChild(user);
  return userEntry;
}

/* This function accepts a user object and creates a link to a user's profile that is passed back to createUserEntry() */

function createUserLink(entry) {
  let userLink = document.createElement("a");
  userLink.setAttribute("href", entry.link);
  userLink.setAttribute("target", "_blank");
  return userLink;
}

/* This function accepts a user object and a string 
referencing the table that's being populated, and 
creates a <td> element containing the user's 
score that is passed back to createUserEntry() */

function createScoreEntry(entry, tableID) {
  let score = document.createElement("td");
  score.innerText = entry[tableID];
  return score;
}

populateTable("latest");
populateTable("allTime");
