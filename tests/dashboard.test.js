/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./views/dashboard.html");

const dashboard = require("./dashboard_copy.js");

/* createGreeting takes a string and should set the innerText of the 
h1 element with class ".user-name" to "Welcome back, <string>"
*/

test("Check if createGreeting properly applies the username", () => {
  const greeting = document.querySelector(".user-name");
  dashboard.createGreeting("bob");
  expect(greeting.innerText).toBe(`Welcome back, bob!`);
});

/* calcOneToTen takes the values of keys 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 
from globalStats.missingByCount and adds a key to the missingByCount object 
containing the sum of those values.  The relevant values are 1, 0, 7, 6, 10, 
23, 32, 68, 91 and 108, so after calling the function, I would expect 
globalStats.missingByCount to have a key "oneToTen" with a value of 346  */

test("Check if calcOneToTen is producing the correct number", () => {
  dashboard.calcOneToTen();
  expect(dashboard.globalStats.missingByCount.oneToTen).toBe(346);
});

/* fillTable */

/* makeElementWithLink receives two arguments: an object that contains information 
about either a tool or a user, and a string that can have a value of "tool" 
or "user"
It returns an <a> element that contains the name of the particular user or tool 
in the innerText field, and an "href" attribute that contains an associated link */

/* fillStatsCards */
