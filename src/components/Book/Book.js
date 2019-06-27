import React from 'react';
import PropTypes from 'prop-types';

import './Book.css';

const Book = (props) => {
  const { title, authors, imageLinks, publisher, infoLink } = props.volumeInfo;
  const imageUrl = imageLinks
    ? imageLinks.thumbnail : require('../../assets/book-placeholder.png');
  const publisherString = publisher ? publisher : 'No publisher found';
  const authorString = authors ? authors.join(', ') : 'No author found';

  return (
    <div className="component-book container">
      <div className="cell">
        <img
          src={ imageUrl }
          alt="book cover"
          className="book-image"
        />
      </div>
      <div className="cell">
        <h3 className="book-title">{ title }</h3>
        <p className="book-author">{ authorString }</p>
        <p className="book-publisher">{ publisherString }</p>
        <a href={ infoLink } className="book-info-link btn">More Info</a>
      </div>
    </div>
  );
};

Book.propTypes = {
  volumeInfo: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.array,
    imageLinks: PropTypes.object,
    publisher: PropTypes.string,
    infoLink: PropTypes.string
  })
};

export default Book;
