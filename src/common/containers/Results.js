import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Results extends Component {
  render() {
    return (
      <div className="results">

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(Results);