import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import './Breadcrumbs.css';

class Breadcrumbs extends Component {

  onClick(crumb) {
    this.props.searchRedirect(crumb);
  }

  renderCrumbs(crumbs) {
    return crumbs.map((crumb, index) => {
      const style = `breadcrumb-item ${index === (crumbs.length - 1) ? 'active' : ''}`;
      return (
        <a role="button" onClick={() => this.onClick(crumb)} className={style} key={crumb}>{crumb}</a>
      );
    });
  }

  render() {
    if (this.props.crumbs) {
      return (
        <nav className="breadcrumbs">
          {this.renderCrumbs(this.props.crumbs)}
        </nav>
      );
    }
  }
}

function mapStateToProps({ search }) {
  const crumbs = search.categories ? search.categories : [];
  return { crumbs: crumbs };
}

export default connect(mapStateToProps, actions)(Breadcrumbs);