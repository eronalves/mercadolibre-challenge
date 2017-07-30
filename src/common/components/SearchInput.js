import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import VirtualizedSelect from 'react-virtualized-select'

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
    const options = [
      { label: "One", value: 1 },
      { label: "Two", value: 2 },
      { label: "Three", value: 3, disabled: true }
      // And so on...
    ]

    return (
      <div className="input-group">
        <VirtualizedSelect
          className="form-control"
          options={options}
          placeholder="Nunca dejes de buscar"
          onChange={(selectValue) => this.onSearch(selectValue, true)}
          value={this.state.selectValue}
        />
        <span className="input-group-btn">
          <button role="button" className="btn btn-secondary btn-search-input"
            onClick={event => this.onClickSearch()}
            type="button">
            <img src="assets/ic_Search.png" />
          </button>
        </span>
      </div>
    )
  }

}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchInput;