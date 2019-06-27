import React from 'react';
import Book from '../Book/Book';
import PropTypes from 'prop-types';

const BookList = ({ books }) => {
  return (
    <div className="component-book-list">
      { books.map((book, index) => (
        <Book { ...book } key={index}/>
      ))}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.object
  )
};

export default BookList;
