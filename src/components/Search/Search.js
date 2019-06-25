import React from 'react';
import './Search.css';

const Search = ({ placeholderText, buttonText, searchTerm, handleChange, handleSubmit }) => {
  return (
    <form className="component-search" onSubmit={ handleSubmit }>
      <input
        type="text"
        className="search-input"
        value={ searchTerm }
        placeholder={ placeholderText }
        onChange={ handleChange }
      />
      <button type="submit" className="search-button btn">{ buttonText }</button>
    </form>
  );
};

export default Search;
