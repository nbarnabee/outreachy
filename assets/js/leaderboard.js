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

/* For each object within a given array of objects, this function creates a <tr> element that contains two <td> elements:  
one containing the user name and a link to the user's profile, and the other containing the user's score 

It then appends the <tr> elements to the <tbody> element indicated by the tableID */

function populateTable(array, tableID) {
  sortedArray = array.sort((a, b) => b[tableID] - a[tableID]);
  const tableBody = document.getElementById(tableID);
  for (let entry of sortedArray) {
    let row = document.createElement("tr");
    tableBody.appendChild(row);
    row.appendChild(createUserEntry(entry));
    row.appendChild(createScoreEntry(entry[tableID]));
  }
}

/* This function accepts a user object and returns a <td> 
element that contains a <span> with the innerText value = to the user name, wrapped in an <a> element that contains a link to the user profile */

function createUserEntry(entry) {
  let userEntry = document.createElement("td");
  let userLink = createUserLink(entry.link);
  userEntry.appendChild(userLink);
  let user = document.createElement("span");
  user.innerText = entry.user;
  userLink.appendChild(user);
  return userEntry;
}

/* This function accepts a string and returns an <a> element with an "href" attribute value = to the given string, and a "target" attribute value = to "_blank" */

function createUserLink(link) {
  let userLink = document.createElement("a");
  userLink.setAttribute("href", link);
  userLink.setAttribute("target", "_blank");
  return userLink;
}

/* This function accepts a number and return a <td> element containing that number */

function createScoreEntry(num) {
  let score = document.createElement("td");
  score.innerText = num;
  return score;
}

populateTable(leaderboard, "latest");
populateTable(leaderboard, "allTime");
