import React, { Component } from 'react';
import './App.css';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';

import { testData } from '../../assets/TestData';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ searchTerm: '' })
  }

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="App" data-test="component-app">
        <Search
          placeholderText="Please search by author or title"
          buttonText="search"
          searchTerm={ searchTerm }
          handleChange={ this.handleInputChange }
          handleSubmit={ this.handleFormSubmit }
        />
        <BookList books={testData.items}/>
      </div>
    );
  }
}

export default App;
