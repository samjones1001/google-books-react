import React, { Component } from 'react';

import './App.css';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';
import { queryAPI } from '../../utils/utilFunctions';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      results: [],
      message: 'No results yet'
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleFormSubmit = (e) => {
    const base_url = 'https://www.googleapis.com/books/v1/volumes'
    const params = {
      q: this.state.searchTerm,
      key: process.env.REACT_APP_GOOGLE_KEY,
      maxResults: 20,
      fields: 'items(volumeInfo(authors, title, publisher, infoLink, imageLinks/thumbnail))'
    }

    e.preventDefault();
    this.setState({ message: false })
    queryAPI(base_url, params, this.setResults, this.setMessage)
    this.setState({ searchTerm: '' })
  }

  setResults = (results) => {
    this.setState({ results: results.data.items });
  }

  setMessage = (message) => {
    this.setState({ message : message.response.data.error.message });
  }

  render() {
    const { searchTerm, results, message } = this.state;

    return (
      <div className="App" data-test="component-app">
        <Search
          placeholderText="Please search by author or title"
          buttonText="search"
          searchTerm={ searchTerm }
          handleChange={ this.handleInputChange }
          handleSubmit={ this.handleFormSubmit }
        />
        <BookList books={ results }/>
        {message &&
          <h2 data-test="app-message">{ message }</h2>
        }
      </div>
    );
  }
}

export default App;
