import React from 'react';

const Book = (props) => {
  const { title, imageLink, author, publisher, infoLink } = props

  return (
    <div data-test="component-book" { ...props }>
      <h3 data-test="book-title">{ title }</h3>
      <img src={ imageLink } data-test="book-image" />
      <p data-test="book-author">{ author }</p>
      <p data-test="book-publisher">{ publisher }</p>
      <a href={ infoLink } data-test="book-info-link">More Info</a>
    </div>
  )
}

export default Book;
