const path = require("path");

module.exports = {
  entry: {
    Main: "./assets/js/index.js",
    Dashboard: "./assets/js/dashboard.js",
    Leaderboard: "./assets/js/leaderboard.js",
  },
  output: {
    path: __dirname + "build",
    filename: "[name].js",
  },
};
