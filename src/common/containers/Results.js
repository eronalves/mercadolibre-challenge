import React, { Component } from 'react';
import { connect } from 'react-redux';

import Breadcrumb from '../components/Breadcrumb';

import * as actions from '../actions';

class Results extends Component {

  breadcrumbs() {
    return ['Eletrônica, Audio y video', 'IPod', 'Reprodutores', 'Ipod touch', '32gb'];
  }

  render() {
    return (
      <div className="results">
        <Breadcrumb crumbs={this.breadcrumbs()}/>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(Results);