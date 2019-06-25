import React, { Component } from 'react';

import './App.css';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import {
  queryAPI,
  retrieveResultsFromResponse,
  retrieveErrorFromResponse
} from '../../utils/utilFunctions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      message: 'No results yet',
      loading: false
    };
  };

  handleFormSubmit = (e, searchTerm) => {
    const base_url = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: searchTerm,
      key: process.env.REACT_APP_GOOGLE_KEY,
      maxResults: 20,
      fields: 'items(volumeInfo(authors, title, publisher, infoLink, imageLinks/thumbnail))'
    };

    e.preventDefault();
    this.setState({ message: '', loading: true, results: [] });
    queryAPI(base_url, params, this.handleSuccess, this.handleFailure);
  };

  handleSuccess = (response) => {
    const results = retrieveResultsFromResponse(response);
    const message = results.length === 0
      ? 'No results found - please search again'
      : '';
    this.setState({ results, message, loading: false, searchTerm: '' });
  };

  handleFailure = (error) => {
    this.setState({
      message : retrieveErrorFromResponse(error),
      loading: false,
      searchTerm: ''
    });
  };

  render() {
    const { results, message, loading } = this.state;
    return (
      <div className="component-app">
        <h1 className="app-title">Book Search</h1>
        <Search
          placeholderText="Please search by author or title"
          buttonText="search"
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
  };
};

export default App;
