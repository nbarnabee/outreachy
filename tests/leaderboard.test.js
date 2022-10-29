/**
 * @jest-environment jsdom
 */

// This creates the DOM environment in which the tests will run.
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./views/leaderboard.html");

const {
  populateTable,
  createUserEntry,
  createUserLink,
  createScoreEntry,
} = require("./leaderboard_copy.js");

/* The populateTable function accepts a string argument that 
is an id value for a table, then takes values from an array
 of objects and populates the referenced table. 

To do so, it calls a sequence of smaller functions.  
 For testing purposes I'll feed it data from an array that only contains a single object, and see if the 
 values contained in the data cells match those of the object. */

const testLeaderboard = [
  {
    user: "DannyBoyyy77",
    link: "https://en.wikipedia.org/wiki/User:DannyBoyyy77",
    latest: 23,
    allTime: 56,
  },
];

test("Check if createScoreEntry is returning a <td> element", () => {
  const wrapper = document.createElement("tr");
  const score = createScoreEntry(2);
  wrapper.appendChild(score);
  expect(wrapper.innerHTML).toBe("<td></td>");
});

// I don't understand why wrapper.innerHTML isn't returning the value "2" as well.
// When I do this in the browser console, the return value of wrapper.innerHTML is "<td>2</td>"

test("Check if the <td> element returned by createScoreEntry contains the correct value", () => {
  const score = createScoreEntry(2);
  expect(score.innerText).toBe(2);
});

/* createUserLink should accept a string and return an <a>
object with the string as a value for "href" */

test("Check if createUserLink is inserting the passed link into the 'href' attribute", () => {
  const link = createUserLink("https://www.google.com/");
  expect(link.href).toBe("https://www.google.com/");
});

/* createUserEntry should accept an object and return a <td> 
element that contains a <span> element containing the user name, wrapped in an <a> element that is the result of a call to the createUserLink function 

I'll test it with the contents of the leaderboard array defined above.*/

test("Check if createUserEntry has the correct structure", () => {
  const testUser = testLeaderboard[0];
  const userLink = testUser.link;
  const entry = createUserEntry(testLeaderboard[0]);
  expect(entry.innerHTML).toBe(
    `<a href=\"${userLink}\" target=\"_blank\"><span></span></a>`
  );
});

test("Check if createUserEntry contains the correct user name", () => {
  const testUser = testLeaderboard[0];
  const userName = testUser.user;
  const entry = createUserEntry(testLeaderboard[0]);
  // Now I have to dig down deep to get to the span.
  let spanNode = entry.childNodes[0].childNodes[0];
  expect(spanNode.innerText).toBe(userName);
});

/* Finally I reach the function that calls all of the rest, populateTable.  
It takes an array of objects and a string value that refers to the id of the 
table that is to be populated, currently either "latest or "allTime", and for each object in the "leaderboard" array, generates a table containing two <td> objects, which are the results of calls to createUserEntry and createScoreEntry, and appends the row to the DOM element with the id = to the "tableID" argument.

As I have already determined that the functions are correctly returning 
<td> elements, I'll check whether the new row has been successfully appended.

For the purposes of this test, I'll be using an array with a single object, so I would expect one row.

*/

test("Has populateTable appended a row to the targeted <tbody> element?", () => {
  // First I create and insert a new table element to target
  const newTable = document.createElement("table");
  const targetTable = document.createElement("tbody");
  targetTable.setAttribute("id", "target");
  newTable.appendChild(targetTable);
  document.querySelector(".spacer").appendChild(newTable);
  // And then call the function
  populateTable(testLeaderboard, "target");
  expect(targetTable.childNodes[0].tagName).toBe("TR");
});

/* I'm pretty confident that this is working properly.
I was hoping to check the contents of the cells, but the results 
continue to be inconsistent, and I am not familiar enough with Jest 
to figure out exactly what I'm doing wrong. 

For instance, I can't seem to target the <td> children of the <tr> I targeted above - 
at least not using Jest.  I can manage it in the console. */
