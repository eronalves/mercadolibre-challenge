import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    isAuthenticated() {
      return this.props.authenticated && !this.props.tokenExpired;
    }

    renderRedirect() {
      return <Redirect to="/login"/>;
    }

    renderComposedComponent() {
      return <ComposedComponent {...this.props} />;
    }

    render() {
      return this.isAuthenticated() ? this.renderComposedComponent() : this.renderRedirect();
    }
  }

  function mapStateToProps(state) {
    return {  };
  }

  return connect(mapStateToProps)(Authentication);
}