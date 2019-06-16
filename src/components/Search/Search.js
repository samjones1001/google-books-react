import React from 'react';

const Search = ({ placeholderText, buttonText, searchTerm, handleChange, handleSubmit }) => {
  return (
    <form data-test="component-search" onSubmit={ handleSubmit }>
      <input
        type="text"
        data-test="search-input"
        value={ searchTerm }
        placeholder={ placeholderText }
        onChange={ handleChange }
      />
      <button type="submit" data-test="search-button">{ buttonText }</button>
    </form>
  )
}

export default Search;
