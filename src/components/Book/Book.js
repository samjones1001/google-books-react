import React from 'react';

const Book = (props) => {
  const { title, authors, publisher, infoLink } = props
  const imageLink = props.imageLink !== undefined
    ? props.imageLink
    : '../../assets/book-placeholder.png'
    
  return (
    <div data-test="component-book" { ...props }>
      <h3 data-test="book-title">{ title }</h3>
      <img src={ imageLink } data-test="book-image" />
      <p data-test="book-author">{ authors[0] }</p>
      <p data-test="book-publisher">{ publisher }</p>
      <a href={ infoLink } data-test="book-info-link">More Info</a>
    </div>
  )
}

export default Book;
