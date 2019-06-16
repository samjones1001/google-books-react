import React, { Component } from 'react';
import './App.css';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';

import { testData } from '../../assets/TestData';

class App extends Component {
  render() {
    return (
      <div className="App" data-test="component-app">
        <Search
          placeholderText="Please search by author or title"
          buttonText="search"
        />
        <BookList books={testData.items}/>
      </div>
    );
  }
}

export default App;
