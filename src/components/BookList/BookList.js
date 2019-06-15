import React from 'react';
import Book from '../Book/Book';

const BookList = (props) => {
  const { books } = props;

  return (
    <div data-test="component-book-list">
      { books.map((book, index) => (
        <Book { ...book } key={index}/>
      ))}
    </div>
  )
}

export default BookList;
