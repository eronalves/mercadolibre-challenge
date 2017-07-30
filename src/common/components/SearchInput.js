import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'react-autocomplete';

import './SearchInput.css';

class SearchInput extends Component {

  styles = {
    item: {
      padding: '2px 6px',
      cursor: 'pointer'
    },

    highlightedItem: {
      color: 'white',
      background: 'hsl(200, 50%, 50%)',
      padding: '2px 6px',
      cursor: 'pointer'
    }
  }

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.term) {
      this.setState({ term: nextProps.term || '' });
      this.props.onCleanTerm();
    }
  }

  onSearch(term) {
    this.setState({ ...this.state, term });

    if (term) {
      this.props.onSearchByTerm(term);
    }
  }
  onSearchByTerm() {
    this.onSearch(this.state.term);
  }

  onClickAutoComplete(term) {
    this.onSearch(term);
  }

  onChangeInput(term) {
    this.setState({ ...this.state, term });
    this.props.onSearchAutoComplete(term);
  }

  getOptions = () => {
    return this.props.itemsAutoComplete ? this.props.itemsAutoComplete : [];
  }

  matchStateToTerm(state, value) {
    return (
      state.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  renderAutoCompleteItem(item, isHighlighted) {
    return (
      <div
        style={isHighlighted ? this.styles.highlightedItem : this.styles.item}
        key={item.id}>
        {item.title}
      </div>
    );
  }

  render() {
    return (
      <div className="input-group">
        <div className="form-control search-autocomplete">
          <Autocomplete
            value={this.state.term}
            inputProps={{ id: 'states-autocomplete' }}
            items={this.getOptions()}
            getItemValue={(item) => item.title}
            shouldItemRender={this.matchStateToTerm}
            onChange={(event, term) => this.onChangeInput(term)}
            onSelect={value => this.onClickAutoComplete(value)}
            renderItem={(item, isHighlighted) => this.renderAutoCompleteItem(item, isHighlighted)} />
        </div>
        <span className="input-group-btn">
          <button role="button" className="btn btn-secondary btn-search-input"
            onClick={() => this.onSearchByTerm()}
            type="button">
            <img src="assets/ic_Search.png" />
          </button>
        </span>
      </div>
    )
  }

}

SearchInput.propTypes = {
  onSearchAutoComplete: PropTypes.func.isRequired,
  onSearchByTerm: PropTypes.func.isRequired,
  itemsAutoComplete: PropTypes.array
};

export default SearchInput;