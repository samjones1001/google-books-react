import React from 'react';

const Search = ({ placeholderText, buttonText }) => {
  return (
    <div data-test="component-search">
      <input type="text" data-test="search-input" placeholder={ placeholderText }/>
      <button type="button" data-test="search-button">{ buttonText }</button>
    </div>
  )
}

export default Search;
