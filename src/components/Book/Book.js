import React from 'react';

const Book = (props) => {
  const { title, authors, infoLink } = props
  const imageLink = props.imageLink !== undefined
    ? props.imageLink
    : require('../../assets/book-placeholder.png');

  const publisher = props.publisher !== undefined
    ? props.publisher
    : 'No publiher found';

  const buildAuthorString = () => {
    return authors !== undefined
      ? authors.join(', ')
      : 'No author found';
  }

  return (
    <div data-test="component-book" { ...props }>
      <h3 data-test="book-title">{ title }</h3>
      <img src={ imageLink } data-test="book-image" />
      <p data-test="book-author">{ buildAuthorString() }</p>
      <p data-test="book-publisher">{ publisher }</p>
      <a href={ infoLink } data-test="book-info-link">More Info</a>
    </div>
  );
}

export default Book;
