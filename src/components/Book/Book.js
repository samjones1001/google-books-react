import React from 'react';

const Book = (props) => {
  const { title, authors, imagelink, publisher, infolink } = props
  const imageUrl = imagelink
    ? imagelink : require('../../assets/book-placeholder.png');
  const publisherString = publisher ? publisher : 'No publisher found';
  const authorString = authors ? authors.join(', ') : 'No author found';

  return (
    <div data-test="component-book" { ...props }>
      <h3 data-test="book-title">{ title }</h3>
      <img
        src={ imageUrl }
        alt="book cover"
        data-test="book-image"
      />
      <p data-test="book-author">{ authorString }</p>
      <p data-test="book-publisher">{ publisherString }</p>
      <a href={ infolink } data-test="book-info-link">More Info</a>
    </div>
  );
}

export default Book;
