import React from 'react';

const Search = (props) => {
  return (
    <div data-test="component-search">
      <input type="text" data-test="search-input" />
      <button type="button" data-test="search-button">Search</button>
    </div>
  )
}

export default Search;
