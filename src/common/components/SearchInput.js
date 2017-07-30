import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchInput.css';

class SearchInput extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onSearch(term, debounce) {
    this.setState({ ...this.state, term });

    if (term) {
      this.props.onSearch(term, debounce);
    }
  }

  onClickSearch() {
    this.onSearch(this.state.term, false);
  }

  render() {
    return (
      <div className="input-group">
        <input type="text"
          className="form-control"
          placeholder="Nunca dejes de buscar"
          value={this.state.term}
          onChange={event => this.onSearch(event.target.value, true)} />
        <span className="input-group-btn">
          <button role="button" className="btn btn-secondary btn-search-input" 
                  onClick={event => this.onClickSearch()} 
                  type="button">
            <img src="assets/ic_Search.png" />
          </button>
        </span>
      </div>
    );
  }

}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchInput;