import React, { Component } from 'react';

import './App.css';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import { queryAPI } from '../../utils/utilFunctions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      results: [],
      message: 'No results yet',
      loading: false
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
    this.setState({ message: false, loading: true, results: [] })
    queryAPI(base_url, params, this.handleSuccess, this.handleFailure)
    this.setState({ searchTerm: '' })
  }

  handleSuccess = (results) => {
    results = results.data.items !== undefined ? results.data.items : [];
    const message = results.length === 0 ?  'No results found - please search again' : false;
    this.setState({ results, message, loading: false });
  }

  handleFailure = (error) => {
    this.setState({ message : error.response.data.error.message, loading: false });
  }

  render() {
    const { searchTerm, results, message, loading } = this.state;

    return (
      <div className="component-app">
        <Search
          placeholderText="Please search by author or title"
          buttonText="search"
          searchTerm={ searchTerm }
          handleChange={ this.handleInputChange }
          handleSubmit={ this.handleFormSubmit }
        />
        <BookList books={ results }/>
        {message &&
          <Message messageText={ message }/>
        }
        {loading &&
          <Loader />
        }
      </div>
    );
  }
}

export default App;
