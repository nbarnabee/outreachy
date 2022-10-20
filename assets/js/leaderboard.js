const leaderboard = [
  {
    name: "DannyBoyyy77",
    link: "https://en.wikipedia.org/wiki/User:DannyBoyyy77",
    month_edits: 23,
    total_edits: 56,
  },
  {
    name: "Tabby578",
    link: "https://en.wikipedia.org/wiki/User:Tabby578",
    month_edits: 19,
    total_edits: 19,
  },
  {
    name: "Ellenello",
    link: "https://en.wikipedia.org/wiki/User:Ellenello",
    month_edits: 11,
    total_edits: 39,
  },
  {
    name: "Poppa shark",
    link: "https://en.wikipedia.org/wiki/User:Poppa%20shark",
    month_edits: 9,
    total_edits: 12,
  },
  {
    name: "Javier Alejandro Herrera Carvajal",
    link: "https://en.wikipedia.org/wiki/User:Javier%20Alejandro%20Herrera%20Carvajal",
    month_edits: 7,
    total_edits: 21,
  },
];

leaderboard.sort((a, b) => b["points"] - a["points"]);
console.log(leaderboard);
