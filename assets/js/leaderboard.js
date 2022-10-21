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

// ids: latest and all-time

function populateTable(tableID) {
  sortedLeaderboard = leaderboard.sort((a, b) => b[tableID] - a[tableID]);
  const tableBody = document.getElementById(tableID);
  for (let entry of sortedLeaderboard) {
    let row = document.createElement("tr");
    let user = document.createElement("td");
    let score = document.createElement("td");
    user.innerText = entry.user;
    score.innerText = entry[tableID];
    row.appendChild(user);
    row.appendChild(score);
    tableBody.appendChild(row);
  }
}

populateTable("latest");
populateTable("allTime");
