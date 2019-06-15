import React from 'react';
import Book from '../Book/Book';

const BookContainer = (props) => {
  const { books } = props;

  return (
    <div data-test="component-book-container">
      { books.map((book, index) => (
        <Book { ...book } key={index}/>
      ))}
    </div>
  )
}

export default BookContainer;
