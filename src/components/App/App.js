import React from 'react';
import './App.css';
import BookContainer from '../BookContainer/BookContainer';
import { testData } from '../../assets/TestData';

function App() {
  return (
    <div className="App" data-test="component-app">
      <BookContainer books={testData.items}/>
    </div>
  );
}

export default App;
