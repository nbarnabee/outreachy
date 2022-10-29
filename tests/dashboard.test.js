/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./views/dashboard.html");

const dashboard = require("./dashboard_copy.js");

/* ------------------------------------------  */

/* createGreeting takes a string and should set the innerText of the 
h1 element with class ".user-name" to "Welcome back, <string>"
*/

test("Check if createGreeting properly applies the username", () => {
  const greeting = document.querySelector(".user-name");
  dashboard.createGreeting("bob");
  expect(greeting.innerText).toBe(`Welcome back, bob!`);
});

/* ------------------------------------------  */

/* calcOneToTen takes the values of keys 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 
from globalStats.missingByCount and adds a key to the missingByCount object 
containing the sum of those values.  The relevant values are 1, 0, 7, 6, 10, 
23, 32, 68, 91 and 108, so after calling the function, I would expect 
globalStats.missingByCount to have a key "oneToTen" with a value of 346  */

test("Check if calcOnetoTen is producing a new key in the globalStats.missingByCount object", () => {
  dashboard.calcOneToTen();
  expect(dashboard.globalStats.missingByCount).toHaveProperty("oneToTen");
});

test("Check if calcOneToTen is producing the correct number", () => {
  dashboard.calcOneToTen();
  expect(dashboard.globalStats.missingByCount.oneToTen).toBe(346);
});

/* ------------------------------------------  */

/* fillTable */

/* ------------------------------------------  */

/* makeElementWithLink receives two arguments: an object that contains information about a particular modification to toolhub (the user, the date, the tool modified, and the modification), and a string that can have a value of "tool" or "user," which indicates which of the object's keys should be accessed.

It returns an <a> element that contains the name of the particular user or tool 
in the innerText field, and an "href" attribute that contains an associated link 

I'll be testing these with the following code snippet: */

const testUser = {
  user: "DannyBoyyy77",
  link: "https://en.wikipedia.org/wiki/User:DannyBoyyy77",
  toolName: "xtools-ec",
  toolTitle: "XTools Edit Counter",
  fieldEdited: "icon",
  dateModified: 1666514747862,
};

test("Check if the result of makeElementWithLink for a tool contains the proper href value", () => {
  const link = dashboard.makeElementWithLink(testUser, "tool");
  expect(link.href).toBe("https://toolhub.wikimedia.org/tools/xtools-ec");
});

test("Check if the result of makeElementWithLink for a tool contains the proper innerText value", () => {
  const link = dashboard.makeElementWithLink(testUser, "tool");
  expect(link.innerText).toBe("XTools Edit Counter");
});

test("Check if the result of makeElementWithLink for a user contains the proper href value", () => {
  const link = dashboard.makeElementWithLink(testUser, "user");
  expect(link.href).toBe("https://en.wikipedia.org/wiki/User:DannyBoyyy77");
});

test("Check if the result of makeElementWithLink for a user contains the proper innerText value", () => {
  const link = dashboard.makeElementWithLink(testUser, "user");
  expect(link.innerText).toBe("DannyBoyyy77");
});

/* ------------------------------------------  */

/* fillStatsCards  takes three arguments:  an object containing the global Toolhub stats, an object containing information about the current user, and an object 
containing information about global users  */
