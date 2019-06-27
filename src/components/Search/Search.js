import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e) => {
    this.props.handleSubmit(e, this.state.searchTerm);
    this.setState({ searchTerm: '' });
  };

  render() {
    const { placeholderText, buttonText } = this.props;
    const { searchTerm } = this.state;

    return (
      <form className="component-search" onSubmit={ this.handleSubmit }>
        <input
          type="text"
          className="search-input"
          value={ searchTerm }
          placeholder={ placeholderText }
          onChange={ this.handleChange }
        />
        <button type="submit" className="search-button btn">{ buttonText }</button>
      </form>
    );
  }
}

Search.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Search;
