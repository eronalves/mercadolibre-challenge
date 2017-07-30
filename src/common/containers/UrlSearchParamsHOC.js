import 'url-search-params-polyfill';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../actions';

export default function(ComposedComponent) {
  class UrlSearchParamsHOC extends Component {

    componentWillMount() {
      if (this.props.termRedirect) {
        this.props.cleanSearchRedirect();
      }
    }

    renderRedirect() {
      
      const route = `/items?search=${this.props.termRedirect}`;
      console.log('render direct', route);
      return <Redirect to={route}/>;
    }

    renderComposedComponent() {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      this.props.searchByTerm(params.get('search'));

      return <ComposedComponent { ...this.props } />;
    }

    render() {
      return this.props.termRedirect ? this.renderRedirect() : this.renderComposedComponent();
    }
  }

  function mapStateToProps(state) {
    return { 
      termRedirect: state.search.termRedirect
    } ;
  }

  return connect(mapStateToProps, actions)(UrlSearchParamsHOC);
}