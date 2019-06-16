import React from 'react';
import Book from '../Book/Book';

const BookList = ({ books }) => {
  return (
    <div data-test="component-book-list">
      { books.map((book, index) => (
        <Book { ...book } key={index}/>
      ))}
    </div>
  )
}

export default BookList;
