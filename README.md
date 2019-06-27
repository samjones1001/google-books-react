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
- I found at one point that there were a number of places in my code where both tests and production code were quite tightly bound to the structure of the data being returned from the API - had the structure of the API response been altered for some reason this would have required my code to be updated in multiple places. I've tried to get past this by centralising my reliance on structure as much as possible into some functions in the testUtils and utilFunctions files. There is still some coupling here, but in the event of a change being required it should only need to happen here.
- The same problem is present to some extent in my Book component - I've tried to minimise this, but am aware that some dependency does still remain.
- The asynchronous tests around connecting to the API proved somewhat challenging to implement. Once I understood the pattern required by moxios I was able to get the tests running, but in some cases - particularly my test for ensuring that the Loader component disappeared on completion of a request - I found that when testing against elements being rendered to the DOM my expectations were still running prior to the required change being completed. I was able to get around this by testing the internal state of my components, which was updating in time, but this felt more like a work around than a solution.
- I wanted to ensure that I was obscuring my API keys and not pushing them to Github. I was able to follow the advice in [this this stackoverflow post](https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app), but this seems like an imperfect solution. Aside from building a backend for the project, which seems out of scope for the task, I'm not sure how to improve upon this.

### Resources Used

- [Google Books API Documentation](https://developers.google.com/books/docs/overview)
- [Enzyme Documentation](https://airbnb.io/enzyme/docs/api/selector.html)
- [Moxios Documentation](https://github.com/axios/moxios)
- [Moxios Github Issue on Mocking Error Responses](https://github.com/axios/moxios/issues/6)
- [React Spinners Documentation](https://github.com/davidhu2000/react-spinners)
- [Advice on Obscuring Credentials in React](https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app)

### Further Development

- Requests to the API can accept a query string which allows for pagination of results. I'd like to make use of this so that users can click through to additional results rather than being restricted to only the first 20.
- The asynchronous tests in App.test.js contain a lot of repeated code for setting up a mock request. I'd like to abstract this out into a separate function in order to reduce repetition, but have yet to find a way to make this work.
- The App component feels a little busy - in particular the `handleFormSubmit` function. I'd like to find a way to refactor it further.

## Feedback

Based on the feedback I received on the first version of this application, I have made the following changes;

- Fixed the consistency of line ending semicolons.
- Removed the need for maintaining `searchTerm` state in the App component and for passing a `handleChange` prop into the Search component by making Search responsible for maintaining its own state.
- Fixed the `message` state of the App component as a string rather than allowing it to switch between a string and a boolean. Determining whether or not the Message component should be rendered now relies on the fact that an empty string evaluates as falsy.
- Altered some tests for the App component to assert that child components are being rendered under certain conditions, rather than asserting only on the internal state of the App component.
- Added propTypes and associated tests to all relevant components.
- Added tests to assert that components are passing props correctly to their children. For some of these tests, where a component passes down a piece of its own state or a prop which it has received from its parent I'm happy with the approach I have taken. For others, such as the tests for the `placeholderText` and `buttonText` props received by the Search component which are set in the parent component's render function, I've had to assert against the particular values which are currently being passed in. I worry that this makes my tests brittle, as a change in the particular message being passed would break my tests, although the functionality would still be as expected - I'd like to find a better solution for this.

As part of the feedback process, I was also asked to answer the following questions:

- I saw that there weren't any propTypes for any of the components. How do you think your code could benefit from having them?
  * Defining propTypes to a react component provides an extra layer of security against breaking changes being introduced into the application. If I take my Book component as an example, it a prop which is expected in a very specific format; an object with a number of key value pairs. One of these values should be an array, one an object, and the others strings.

  * If a component is passed a prop holding a datatype it does not expect, at best the component will render incorrectly impacting on the user's experience, at worst it will fail to render at all, potentially crashing the app in the process. Adding propTypes acts as a form of documentation for the component - the propTypes object clearly defines the 'interface' of the component for other developers or for myself in the future. In the event that some mistake is still made in passing the props that a component needs, a warning will also be displayed in the console making it very simple to debug the issue.     

- How would your application need to change if you wanted to save books to a bookshelf and manage it? What if you wanted to save your book search history?

  * I feel like there are several approaches that could be taken to meet this requirement, depending on how long the saved data needed to be persisted for:
    * If data was only required to be persisted for the current session, this could be a relatively simple addition. For saving the search history I would update the App component's `handleSuccess` function to not only add the results of the API call to it's `results` state but also to push it to a separate `searchHistory` piece of state. I see this as an array of objects with the structure `{ searchTerm: resultsObejct }`. With this in place, I would also update the App component's `handleFormSubmit` function so that, prior to making a call to the API a check would be made against the `searchHistory` array for an object with a key matching the passed search term. If one was found that object would be returned and passed into the BookList component, if not the request would be initiated as usual. A SearchHistory component could also be introduced to display a list of previous search terms which a user could click on to see the results.

    * For saving books, I would add another piece of state to App called `bookshelf`, this time an array of objects each representing an individual book. I would pass a function - `saveBook` as a prop down through BookList into the Book component, and update the component with another button which would call this function on click. The function would push the data for the current book into the `bookshelf` state.

    * The bookshelf could then be viewed and managed by reusing my BookList and Book components to display the contents of the `bookshelf` state. The second button on the Book component could be repurposed as a delete button by passing down a different `deleteBook` function as a prop. I would likely also create a Nav component to allow users to switch between the main search screen and their bookshelf.

    * At this point, the App component would likely be becoming bloated and holding a lot of state. This might be a trigger to introduce redux into the application.

  * If, as I suspect, data needed to be persisted over multiple browser sessions, My first instinct was that I would need to build a backend for the application. However, after some research I think I prefer the approach detailed in [this article](https://www.robinwieruch.de/local-storage-react/).
      * If following the first method of building a backend, the implementation would be similar to the previous approach in terms of the components required, but rather than pushing data to arrays held internally in the application, I would make calls to endpoints on my backend system in order to store the information in a database.

      * This approach would also require some sort of user authentication to be added to the application, so would probably need SignIn and Login components to be created. In addition, relying solely on the backend would remove the ability to re-render past search results without making an http request. For this reason, I would consider also retaining the simple client side caching I described above.

      * The second option, and my preferred one, would be to make use of local storage.

      * Again, this approach would be very similar to the first in terms of the components required, but has the advantage over the others of being able to persist data over a page refresh without having to build a backend. Instead of communicating with a database, I would make use of the `localStorage.setItem`, `.getItem`, and `.removeItem` functions.

      * While I prefer this approach due to it being far more lightweight than creating a full backend, it does come with it's own disadvantages - the security settings on a user's browser could prevent the save features from working correctly, and all data would need to be converted to string format in order to be saved and then converted back again to be used by the application.

- Is the handleChange and searchTerm state needed? Is there a way to make this work without these?
  * This question prompted me to look again at my App and Search components and I realised that holding the 'searchTerm' in App felt incorrect - it felt like it ought to be a piece of state internal to the Search component.

  * After promoting Search to a class component and making it responsible for maintaining the `searchTerm` state, I was also able to remove the need to pass down a `handleChange` prop from App - the business of controlling the value of the input through change events could now be internal to the Search component itself.

  * In order for the App component to still make requests to the API using the provided search term, I added a `handleSubmit` function to the Search component which, in turn called App's `handleFormSubmit` function, passing it the `searchTerm` state.

- App.test.js lines 72 and 87: How come for the first test, you’re testing that the Loader component exists vs. in the second test, you’re testing that the loading state is false? I believe you’re ultimately testing for the same thing. Which of the two (component & state) ways of testing this, do you think, is better and why?
  * This problem had bothered me when building the first version of the application - I had several asynchronous tests which I felt ought to assert on the existence of a rendered component, but found that my expectations were seemingly running too early. While my test wrapper's internal state had updated, the re-render which should have been triggered by this change had yet to happen.

  * This question prompted me to revisit these tests and I realised that my problem was that I was failing to call the `wrapper.update()` function. Once I added this, the tests functioned as I had originally wanted them to.

  * I prefer this approach because I feel that it gives a clearer indication that my components truly work as intended. If a child component is expected to render conditionally based on some piece of state belonging to it's parent, then simply testing that the state has updated does not properly test the parent component's behaviour. It would be entirely possible that the parent component's state had updated, but that it failed to render the child component.
