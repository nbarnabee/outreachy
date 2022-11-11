# Outreachy Application Task for Wikimedia: Setup Frontend Web App for Toolhub Records Management

![Toolhunt home page](/docs/images/home.jpg)

Live at: https://nbarnabee.github.io/outreachy/  
Project description at: https://phabricator.wikimedia.org/T318921

- [The Task](#the-task)
- [The Tools](#the-tools)
- [The Process](#the-process)
- [Homepage](#the-home-page)  
    - [Workflow](#user-workflow)
- [The Dashboard](#the-dashboard)
- [The Leaderboard](#the-leaderboard)
- [Testing](#testing) 
   - [Installation](#installation)
- [What I Learned](#what-i-learned)
- [Room for Improvement](#room-for-improvement)

## The Task

This task required me to set up a front-end infrastructure for a web application intended to present users with a streamlined and gamified way to edit information associated with Toolhub tools, inspired by [Citation Hunt](https://citationhunt.toolforge.org/en?id=89280fcc).

The specifications were as follows:

1. The project should have support for Unit Testing.
2. The project should contain three mock pages: a home page, a leaderboard, and a record dashboard.
3. The pages should be build with hardcoded strings; they should not make requests to the API for data.
4. The pages should have a navigation bar with links to the other pages.
5. The Dashboard should show the following metrics:
   - Total number of tools in the records
   - Number of tools with missing information
   - Percentage of tools with missing information
   - Number of tools edited using this tool

## The Tools

### Tech used: Vanilla JavaScript, CSS, HTML, Chart.js, Jest, jsdom, webpack

I felt that utilizing a front-end framework would be overkill for such a relatively simple site. Therefore, I chose to build the site using vanilla JS, CSS and HTML, with some assistance from the Chart.js library for rendering a pie chart.

In order to run tests, I installed Jest and the jsdom testing environment.

### Alternate options

My inspection of the Toolhub site indicated that it was built using Vue and Vuetify. If I were to work on the full version of this project, I would write it in Vue and use Vuetify, in order to keep to a standard styling and syntax.

## The Process

In addition to fulfilling the requirements listed above, I wanted to design a site that would mesh visually with the existing Toolhub website. When choosing colors, spacing and general style, I mimicked Toolhub as far as possible, and utilized their logo.

![Toolhub homepage](/docs/images/toolhub-home.jpg)

I also wanted to, as much as possible, generate the page content dynamically, mimicking how the forms and tables on a _real_ version of this site would be populated with data taken from API calls. In order to accomplish this, I included a series of mock data objects in my JS files that contained information I would expect to be able to receive from the API.

![Mock dataset](/docs/images/mock_data.jpg)

## The Home Page

The Home Page contains the tool editing interface and is the heart of the app. I felt it important to present as much information to the user as possible, so that it would be clear what the task was and what they were being expected to find. In this way I hoped to minimize user confusion and present a more streamlined experience.  

### User Workflow 

Upon loading the page, the user is presented with a choice: search for a particular tool or accept a random test.  (The initial version of the site defaulted to the random test.)  The "random test" option is very straightforward, while the tool search option allows the user to select a tool, browse a list of missing entries, and select a task.

![Toolhunt home page in action](/docs/images/in_use.gif)

Once a task has been chosen, my priority was to make the search for information as painfree as possible.  I wrote functions to generate relevant links to potential data sources, depending on the nature of the task and the availability of the information (e.g., if the tool in question has a "repository" link available, it will be displayed).

Being mindful of the possibility that users might enter improperly formatted information, I wrote functions to generate different input types depending on the type of information requested. For example, if the task involves searching for a "tool_type", the function generates a `select` element containing the possible options. A request for a `url` generates an input of `type="url"`. Using the patterns available from the Toolhub API documentation, it would be possible to implement client-side form validation; that is the number one item on my "to-do" list.

For the "for_wikis" and "available_ui_languages" tasks, where multiple entries may be given, I included an option to generate additional input elements. Clicking the "submit" or "skip" buttons refreshes the displayed data. In a full version of the tool, the "Information could not be found" checkbox would relay additional information to the server, deprioritizing the displayed task.

Clicking the Submit function triggers a function that carries out client-side validation by testing the input values against the RegExp patterns specified in the <a href="https://toolhub.wikimedia.org/api-docs#put-/api/tools/-name-/annotations/" target="_blank">Toolhub documentation.</a>

## The Dashboard

![Toolhunt Dashboard](/docs/images/dashboard.jpg)

In addition to displaying the required metrics, I decided to display information about a user's recent contributions (envisioning this as a site that users would visit while logged on - otherwise, their contributions would be impossible to track and a leaderboard would be pointless!), as well as information about other users, recent activity, and the overall status of the project.

Additional charts could measure edits made over time, and track the improvement of the figures - which are, at present, pretty dire!

As on the home page, the data displayed here is generated on page load.

## The Leaderboard

![Toolhunt Leaderboard](/docs/images/leaderboard.jpg)

The Leaderboard is fairly straightforward; again, the data displayed in the tables is taken from a mock data set I included in the JavaScript files. While Citation Hunt only lists the top contributors from the past 30 days, I thought it might be interesting to include list of the top contributors overall.

## Testing

In order to test the functions, I decided to use the Jest testing framework. I installed it and the jsdom test environment, but after inserting `module.exports` into my .js files, discovered that I was receiving `module is not defined` errors in the browser.  I did a bit of research, installed webpack and bundled the .js files, which solved the first of my problems.    

Unfortunately, it was still the case that Jest did not want to play nicely with chart.js.  I installed chart.js as a dev dependency and set `const Chart = require("./chartjs")` in `dashboard.js`, only to be faced a new problem:  `ResizeObserver` was undefined.  I am still in the process of trying to solve this problem, but in the interim have settled for creating a dummy copy of `dashboard.js` in which all of the code pertaining to the chart is commented out.   

That done, I wrote a series of representative tests for each of my .js files.

![Tests](/docs/images/tests.jpg)

### Installation

Fork and clone the repo, open the code in your developer environment and enter `npm install`, which will install the relevant dependencies. Then type `npm test` in the console to run the suite of tests.

## What I Learned

As the Leaderboard and the Dashboard were relatively straightforward to design and implement, I spent most of my energy on the Home page. Although I sometimes wondered if I wasn't going to excessive lengths to render the elements according to the task type, working on those functions required me to think deeply about how users might go about completing the tasks and how the site presentation could most effectively help them.

I also feel that I am coming away from this with a body of functions that could easily be refactored to take in data from actual API calls, and certainly the functions are capable of being tested with additional mock data sets such as the ones I've written, to ensure that they are producing the desired results.  

I also learned a great deal about testing, which was a completely new subject.  I had heard about test-driven development but did not fully understand it; having now had the experience of writing incremental tests for my functions, I have a new appreciation for the concept.  I ended up refactoring several of my functions, breaking them down into smaller functions that could be more easily tested.

## Room for Improvement

**Searching & search bar**
- Implement debounce
- Implement a way to clear the current value (as is currently possible while searching on the Toolhub website)

**General improvements**
-  Add additional charts and metrics to the Dashboard page, specifically charts that track the values which are most often missing, and the values that are most often added using the tool. 
- Refactor my CSS
- Solve the ResizeObserver problem
- Write additional tests
- Implement language support and explore ways in which the app could be better internationalized



