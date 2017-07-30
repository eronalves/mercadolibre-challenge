import React, { Component } from 'react';

import Breadcrumb from '../components/Breadcrumb';

class Results extends Component {

  breadcrumbs() {
    return ['Eletrônica, Audio y video', 'IPod', 'Reprodutores', 'Ipod touch', '32gb'];
  }

  render() {
    console.log(this.props);
    return (
      <div className="results">
        <Breadcrumb crumbs={this.breadcrumbs()}/>

      </div>
    );
  }
}

export default Results;