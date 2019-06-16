import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      results: [],
      error: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: this.state.searchTerm,
        key: process.env.REACT_APP_GOOGLE_KEY,
        maxResults: 20,
        fields: 'items(volumeInfo(authors, title, publisher, infoLink, imageLinks/thumbnail))'
      }
    })
    .then((response) => {
      this.setState({ results: response.data.items })
    })
    .catch((error) => {
      this.setState({ error: error.response.data.error.message })
    });

    this.setState({ searchTerm: '' })
  }

  render() {
    const { searchTerm, results, error } = this.state;

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
        {error.length > 0 &&
          <h2>
            { error }
          </h2>
        }
      </div>
    );
  }
}

export default App;
