import React from 'react';
import Book from '../Book/Book';

const BookContainer = (props) => {
  const { books } = props;

  return (
    <div data-test="component-book-container">
      { books.map((book, index) => (
        <div data-test="book-div" key={index}>
          <Book { ...book }/>
        </div>
      ))}
    </div>
  )
}

export default BookContainer;
