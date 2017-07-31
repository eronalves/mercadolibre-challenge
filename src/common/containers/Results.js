import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import ResultItem from '../components/ResultItem';

import './Results.css';

class Results extends Component {

  renderList() {
    return this.props.items.map((item) => {
      return <ResultItem
        key={item.id}
        item={item}
        actions={this.props.actions} />;
    })
  }

  render() {
    if (!this.props.items) {
      return (<p>Loading</p>);
    }
    return (
      <div className="results">
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps({search}) {
  return {items: search.items };
}

export default connect(mapStateToProps, actions)(Results);