import React from 'react';

const Book = (props) => {
  const { title, authors, imageLinks, publisher, infoLink } = props.volumeInfo
  const imageUrl = imageLinks
    ? imageLinks.thumbnail : require('../../assets/book-placeholder.png');
  const publisherString = publisher ? publisher : 'No publisher found';
  const authorString = authors ? authors.join(', ') : 'No author found';

  return (
    <div data-test="component-book">
      <h3 data-test="book-title">{ title }</h3>
      <img
        src={ imageUrl }
        alt="book cover"
        data-test="book-image"
      />
      <p data-test="book-author">{ authorString }</p>
      <p data-test="book-publisher">{ publisherString }</p>
      <a href={ infoLink } data-test="book-info-link">More Info</a>
    </div>
  );
}

export default Book;
