import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import SearchInput from '../components/SearchInput';

import './NavBarSearch.css';

class NavBarSearch extends Component {


  onSearchAutoComplete(term) {
    this.props.searchAutocomplete(term);
  }

  onSearchByTerm(term) {
    this.props.searchRedirect(term);
  }

  onCleanTerm() {
    this.props.cleanTerm();
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-light navbar-search">
        <div className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">        
          <a className="logo" href="#"><img src="assets/Logo_ML.png" /></a>
          <SearchInput onSearchAutoComplete={this.onSearchAutoComplete.bind(this)}
                       onSearchByTerm={this.onSearchByTerm.bind(this)}
                       onCleanTerm={this.onCleanTerm.bind(this)}
                       itemsAutoComplete={this.props.itemsAutoComplete} 
                       term={this.props.term}/>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ search: { itemsAutoComplete, term } }) {
  return { itemsAutoComplete, term };
}

export default connect(mapStateToProps, actions)(NavBarSearch);