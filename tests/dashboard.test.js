/**
 * @jest-environment jsdom
 */

const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./views/dashboard.html");

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

const dashboard = require("../assets/js/dashboard.js");

test("Check if userGreeting properly applies the username", () => {
  const greeting = document.querySelector(".user-name");
  dashboard.createGreeting("bob");
  expect(greeting.innerText).toBe(`Welcome back, bob!`);
});

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});
