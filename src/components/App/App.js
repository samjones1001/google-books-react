import React from 'react';
import './App.css';
import BookList from '../BookList/BookList';
import { testData } from '../../assets/TestData';

function App() {
  return (
    <div className="App" data-test="component-app">
      <BookList books={testData.items}/>
    </div>
  );
}

export default App;
