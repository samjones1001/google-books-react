## Google Book Search

### Live Version [Here](http://google-books-react.surge.sh/)

A small [React](https://reactjs.org/) application for searching the [Google Books API](https://developers.google.com/books/)

## Instructions

To run this application locally:
- clone this repository
- install all dependencies using `npm install`
- run the tests with `npm test`
- run the application with `npm start`

## Brief

Create an application that allows you to use the Google Books API to search for books.

This application should allow you to:
- Type in a query and display a list of books matching that query.
- Each item in the list should include the book's author, title, and publishing company, as well as a picture of the book.
- From each list item, you should also be able to navigate to more information about the book, but this information does not necessarily need to appear on a page within your application. In other words, this could link out to an external site with more information about that particular book.

## Approach

Having chosen to use React for this project, I used `create-react-app` to minimise initial setup, and used [Travis](https://travis-ci.org/) and [Surge](https://surge.sh/) for CI and deployment.

My sense was that the most difficult part of the challenge was likely to be dealing with asynchronicity in my tests for calling the API. With this in mind, and in the interest of trying to do the simplest thing first, I started by setting up some mock data then test driving a number of components with the aim of rendering this data to the screen.

Having achieved this goal I moved on to implementing actual calls to the API. I wanted to continue to write my features test first, and also knew that I didn't want my tests to rely on making actual calls to an external service, so before continuing I had to do some research into options for mocking out these requests in my tests. I chose to make use of [moxios](https://github.com/axios/moxios) in order to do this. The biggest blocker I hit with this part of the process was around testing for an error response from the API - I was ultimately able to make use of one of the answers in [this thread](https://github.com/axios/moxios/issues/6) in order to progress.

As part of my TDD process I had been making small refactors as I built out the application, but I still found a number of areas for improvement once I had completed the main functionality - namely a couple of instances of repeated code and the opportunity to extract a small Message component from my App component. After refactoring, my last action was to introduce a couple of user experience improvements - a Loader component and some basic styling.

### Challenges

- There were a number of edge cases I found that I needed to test for and guard against:
  * Data being returned from the API without all of the fields I was expecting
  * Unsuccessful calls to the API
  * Queries to the API which returned no results
- I found at one point that there were a number of places in my code base where my tests were quite tightly bound to the structure of the data being returned from the API - had the structure of the API response been altered for some reason this would have required my code to be updated in multiple places. I've tried to get past this by centralising my reliance on structure as much as possible to a single function in the testUtils file. There is still some coupling here, but in the event of a change being required it should only need to happen here.
- The same problem is present to some extent in my Book component - I've tried to minimise this, but am aware that some dependency does still remain.
- The asynchronous tests around connecting to the API proved somewhat challenging to implement. Once I understood the pattern required by moxios I was able to get the tests running, but in some cases - particularly my test for ensuring that the Loader component disappeared on completion of a request - I found that when testing against elements being rendered to the DOM my expectations were still running prior to the required change being completed. I was able to get around this by testing the internal state of my components, which was updating in time, but this felt more like a work around than a solution.

### Resources Used

- [Google Books API Documentation](https://developers.google.com/books/docs/overview)
- [Moxios Documentation](https://github.com/axios/moxios)
- [Moxios Github Issue on Mocking Error Responses](https://github.com/axios/moxios/issues/6)

### Further Development

- Requests to the API can accept a query string which allows for pagination of results. I'd like to make use of this so that users can click through to additional results rather than being restricted to only the first 20.
- The asynchronous tests in App.test.js contain a lot of repeated code for setting up a mock request. I'd like to abstract this out into a separate function in order to reduce repetition, but have yet to find a way to make this work.
- The App component feels a little busy - in particular the `handleFormSubmit` function. I'd like to find a way to refactor it further.
