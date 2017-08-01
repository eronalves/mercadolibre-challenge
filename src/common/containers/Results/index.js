import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';

import * as actions from '../../actions';

import ResultItem from '../../components/ResultItem';

import './Results.css';

class Results extends Component {

  renderList() {
    if (!this.props.items) {
      return (<div> </div>);
    }

    return this.props.items.map((item) => {
      return <ResultItem
        key={item.id}
        item={item}
        actions={this.props.actions} />;
    })
  }

  render() {
    return (
      <Loader show={!this.props.items ? true : false} message={'Carregando...'}>
        <div className="results">
          {this.renderList()}
        </div>
      </Loader>
    );
  }
}

function mapStateToProps({search}) {
  return {items: search.items };
}

export default connect(mapStateToProps, actions)(Results);